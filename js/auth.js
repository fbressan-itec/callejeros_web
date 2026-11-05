// =========================================================================
// MÓDULO DE AUTENTICACIÓN — CALLEJEROS RÍO CUARTO
// Gestión de login, registro multi-paso, validación por teléfono/código OTP (Figma) y persistencia local.
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');

  // Alternar visibilidad de contraseña
  document.querySelectorAll('.toggle-password-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
      }
    });
  });

  // Manejador de Login
  formLogin?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const name = email.split('@')[0] || 'Tomás';
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    const currentUser = { name: capitalized, email, phoneVerified: true };
    localStorage.setItem('callejeros_user', JSON.stringify(currentUser));
    
    // Redirección inteligente al origen o Home
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect') || 'index.html';
    window.location.href = redirectUrl;
  });

  // =======================================================================
  // FLUJO DE REGISTRO MULTI-PASO CON VALIDACIÓN POR TELÉFONO / CÓDIGO (FIGMA)
  // =======================================================================
  const stepRegister = document.getElementById('step-register');
  const stepPhone = document.getElementById('step-phone');
  const stepVerifyCode = document.getElementById('step-verify-code');
  const stepSuccess = document.getElementById('step-success');

  const btnBackToStep1 = document.getElementById('btn-back-to-step1');
  const btnBackToStep2 = document.getElementById('btn-back-to-step2');
  const formPhone = document.getElementById('form-phone');
  const regPhoneInput = document.getElementById('reg-phone');
  const btnSkipPhone = document.getElementById('btn-skip-phone');
  const displayPhoneMasked = document.getElementById('display-phone-masked');

  const formVerifyCode = document.getElementById('form-verify-code');
  const otpInputs = document.querySelectorAll('.otp-input');
  const countdownTimer = document.getElementById('countdown-timer');
  const btnResendCode = document.getElementById('btn-resend-code');

  let tempUserData = null;
  let timerInterval = null;
  let targetCode = '8596'; // Código de referencia exacto de Figma

  function completeRegistration(verified = true) {
    if (!tempUserData) return;

    const currentUser = {
      name: tempUserData.name,
      email: tempUserData.email,
      phone: tempUserData.phone || '',
      phoneVerified: verified
    };

    localStorage.setItem('callejeros_user', JSON.stringify(currentUser));

    if (stepRegister) stepRegister.classList.add('hidden');
    if (stepPhone) stepPhone.classList.add('hidden');
    if (stepVerifyCode) stepVerifyCode.classList.add('hidden');
    if (stepSuccess) stepSuccess.classList.remove('hidden');

    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect') || 'index.html';

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1800);
  }

  // Paso 1: Envío del formulario de registro básico
  formRegister?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    tempUserData = { name, email, password, phone: '' };

    // Avanzar a Paso 2: Teléfono
    stepRegister?.classList.add('hidden');
    stepPhone?.classList.remove('hidden');
    regPhoneInput?.focus();
  });

  // Volver de Paso 2 a Paso 1
  btnBackToStep1?.addEventListener('click', () => {
    stepPhone?.classList.add('hidden');
    stepRegister?.classList.remove('hidden');
  });

  // Paso 2: Envío de Teléfono
  formPhone?.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = regPhoneInput.value.trim();
    if (!phone) return;

    tempUserData.phone = phone;

    // Enmascarar teléfono para vista de confirmación (Ej: +54 9 358 •••• 567)
    if (displayPhoneMasked) {
      if (phone.length > 6) {
        const start = phone.slice(0, 4);
        const end = phone.slice(-3);
        displayPhoneMasked.textContent = `${start} •••• ${end}`;
      } else {
        displayPhoneMasked.textContent = phone;
      }
    }

    // Avanzar a Paso 3: Código de Verificación OTP
    stepPhone?.classList.add('hidden');
    stepVerifyCode?.classList.remove('hidden');

    // Inicializar inputs OTP y temporizador
    initOtpInputs();
    startCountdownTimer(270); // 04:30 minutos según mockup Figma
  });

  // Botón "Later" (Omitir teléfono y registrar directamente)
  btnSkipPhone?.addEventListener('click', () => {
    completeRegistration(false);
  });

  // Volver de Paso 3 a Paso 2
  btnBackToStep2?.addEventListener('click', () => {
    clearInterval(timerInterval);
    stepVerifyCode?.classList.add('hidden');
    stepPhone?.classList.remove('hidden');
    regPhoneInput?.focus();
  });

  // Control interactivo de los 4 casilleros OTP
  function initOtpInputs() {
    otpInputs.forEach((input, index) => {
      input.value = '';
      
      input.addEventListener('input', (e) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = val ? val[0] : '';
        
        if (val && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
          otpInputs[index - 1].focus();
        }
      });

      // Soporte para pegar código completo (Ej: 8596)
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text').trim().replace(/[^0-9]/g, '');
        if (pasted.length >= 4) {
          otpInputs.forEach((inp, i) => {
            inp.value = pasted[i] || '';
          });
          otpInputs[3]?.focus();
        }
      });
    });

    otpInputs[0]?.focus();
  }

  // Temporizador de cuenta regresiva (04:30 en Figma)
  function startCountdownTimer(durationSeconds) {
    clearInterval(timerInterval);
    let remaining = durationSeconds;

    function updateDisplay() {
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      const formatted = `(${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')})`;
      if (countdownTimer) countdownTimer.textContent = `⏱️ ${formatted}`;

      if (remaining <= 0) {
        clearInterval(timerInterval);
        if (countdownTimer) countdownTimer.textContent = '⏱️ (00:00) Código expirado';
      }
      remaining--;
    }

    updateDisplay();
    timerInterval = setInterval(updateDisplay, 1000);
  }

  // Reenviar código
  btnResendCode?.addEventListener('click', () => {
    startCountdownTimer(270);
    otpInputs.forEach(inp => inp.value = '');
    otpInputs[0]?.focus();
    alert(`Código SMS reenviado a tu teléfono: ${targetCode}`);
  });

  // Paso 3: Validación del código OTP
  formVerifyCode?.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredCode = Array.from(otpInputs).map(i => i.value).join('');

    if (enteredCode.length < 4) {
      alert('Por favor ingresá los 4 dígitos del código de verificación.');
      return;
    }

    // Acepta el código oficial de Figma '8596' o cualquier código válido de 4 dígitos para pruebas fluidas
    if (enteredCode === targetCode || enteredCode.length === 4) {
      clearInterval(timerInterval);
      completeRegistration(true);
    } else {
      alert('Código incorrecto. Ingresá el código demo 8596 indicado en pantalla.');
      otpInputs.forEach(i => i.classList.add('border-red-500'));
      setTimeout(() => {
        otpInputs.forEach(i => i.classList.remove('border-red-500'));
      }, 2000);
    }
  });

});
