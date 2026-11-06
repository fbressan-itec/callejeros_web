// =========================================================================
// MÓDULO DE AUTENTICACIÓN — CALLEJEROS RÍO CUARTO
// Gestión de login, registro multi-paso, validación por teléfono/código OTP (Figma) y persistencia local.
// =========================================================================

// Devuelve la página a la que volver después del login/registro.
// Solo acepta páginas propias del sitio (ej. "adopciones.html"), nunca URLs externas ni "javascript:".
function getSafeRedirect() {
  const redirect = new URLSearchParams(window.location.search).get('redirect') || '';
  return /^[a-z0-9-]+\.html(#[a-z0-9-]*)?$/i.test(redirect) ? redirect : 'index.html';
}

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
    window.location.href = getSafeRedirect();
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
  let codeExpired = false;

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

    const redirectUrl = getSafeRedirect();

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
    codeExpired = false;
    let remaining = durationSeconds;

    function updateDisplay() {
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      const formatted = `(${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')})`;
      if (countdownTimer) countdownTimer.textContent = `⏱️ ${formatted}`;

      if (remaining <= 0) {
        clearInterval(timerInterval);
        codeExpired = true;
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

    if (codeExpired) {
      alert('El código expiró. Tocá "Send Again" para recibir uno nuevo.');
      return;
    }

    // Solo se acepta el código demo de Figma (8596), que se muestra en pantalla
    if (enteredCode === targetCode) {
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

  // =======================================================================
  // RECUPERAR CONTRASEÑA (recuperar.html, fiel a Figma ruta_loguin_mobile.png)
  // Paso 1: método (email / teléfono) → Paso 2: código → Paso 3: nueva contraseña.
  // Versión demo: no se envían mensajes reales; el código válido es 7098.
  // =======================================================================
  const formRecoverMethod = document.getElementById('form-recover-method');
  if (formRecoverMethod) {
    const RECOVER_CODE = '7098';
    const steps = {
      method: document.getElementById('recover-step-method'),
      code: document.getElementById('recover-step-code'),
      password: document.getElementById('recover-step-password'),
      success: document.getElementById('recover-step-success')
    };
    const contactInput = document.getElementById('recover-contact');
    const contactLabel = document.getElementById('recover-contact-label');
    const recoverOtp = document.querySelectorAll('.recover-otp');
    const recoverTimer = document.getElementById('recover-timer');
    const codeError = document.getElementById('recover-code-error');
    const passError = document.getElementById('recover-pass-error');
    let recoverInterval = null;
    let recoverExpired = false;

    function showRecoverStep(name) {
      Object.entries(steps).forEach(([key, el]) => el?.classList.toggle('hidden', key !== name));
      window.scrollTo(0, 0);
    }

    function showError(el, msg) {
      if (!el) return;
      el.textContent = msg;
      el.classList.toggle('hidden', !msg);
    }

    // El campo de contacto cambia según el método elegido
    document.querySelectorAll('input[name="recover-method"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const isPhone = radio.value === 'phone' && radio.checked;
        contactInput.value = '';
        contactInput.type = isPhone ? 'tel' : 'email';
        contactInput.autocomplete = isPhone ? 'tel' : 'email';
        contactInput.inputMode = isPhone ? 'tel' : 'email';
        contactInput.placeholder = isPhone ? '358 4123456' : 'tu@correo.com';
        contactLabel.textContent = isPhone ? 'Número de teléfono' : 'Correo electrónico';
      });
    });

    function maskContact(value, isPhone) {
      if (isPhone) {
        const digits = value.replace(/\D/g, '');
        return digits.length > 3 ? `•••• •••• ${digits.slice(-3)}` : value;
      }
      const [user, domain] = value.split('@');
      if (!domain) return value;
      return `${user.slice(0, 2)}•••@${domain}`;
    }

    function startRecoverTimer(seconds) {
      clearInterval(recoverInterval);
      recoverExpired = false;
      let remaining = seconds;
      const tick = () => {
        const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
        const ss = String(remaining % 60).padStart(2, '0');
        recoverTimer.textContent = remaining > 0 ? `⏱️ (${mm}:${ss})` : '⏱️ (00:00) Código expirado';
        if (remaining <= 0) {
          recoverExpired = true;
          clearInterval(recoverInterval);
        }
        remaining--;
      };
      tick();
      recoverInterval = setInterval(tick, 1000);
    }

    // Casilleros del código: avanzar, retroceder y pegar el código completo
    recoverOtp.forEach((input, i) => {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '').slice(0, 1);
        if (input.value && i < recoverOtp.length - 1) recoverOtp[i + 1].focus();
        showError(codeError, '');
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && i > 0) recoverOtp[i - 1].focus();
      });
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const digits = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 4);
        recoverOtp.forEach((box, j) => { box.value = digits[j] || ''; });
        recoverOtp[Math.min(digits.length, 4) - 1]?.focus();
      });
    });

    // Paso 1 → Paso 2
    formRecoverMethod.addEventListener('submit', (e) => {
      e.preventDefault();
      const isPhone = document.querySelector('input[name="recover-method"]:checked')?.value === 'phone';
      const value = contactInput.value.trim();
      if (isPhone && value.replace(/\D/g, '').length < 7) {
        contactInput.setCustomValidity('Ingresá un número de teléfono válido.');
        contactInput.reportValidity();
        contactInput.setCustomValidity('');
        return;
      }
      document.getElementById('recover-code-title').textContent = isPhone ? 'Verificá tu teléfono' : 'Verificá tu email';
      document.getElementById('recover-contact-masked').textContent = maskContact(value, isPhone);
      recoverOtp.forEach(box => { box.value = ''; });
      showError(codeError, '');
      showRecoverStep('code');
      startRecoverTimer(150); // 02:30 según Figma
      recoverOtp[0]?.focus();
    });

    document.getElementById('btn-recover-back-1')?.addEventListener('click', () => {
      clearInterval(recoverInterval);
      showRecoverStep('method');
    });

    document.getElementById('btn-recover-resend')?.addEventListener('click', () => {
      recoverOtp.forEach(box => { box.value = ''; });
      showError(codeError, '');
      startRecoverTimer(150);
      recoverOtp[0]?.focus();
    });

    // Paso 2 → Paso 3
    document.getElementById('form-recover-code')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = Array.from(recoverOtp).map(box => box.value).join('');
      if (code.length < 4) return showError(codeError, 'Ingresá los 4 dígitos del código.');
      if (recoverExpired) return showError(codeError, 'El código expiró. Tocá "Reenviar código".');
      if (code !== RECOVER_CODE) return showError(codeError, 'Código incorrecto. Probá con el código de demostración 7098.');
      clearInterval(recoverInterval);
      showRecoverStep('password');
      document.getElementById('recover-pass-1')?.focus();
    });

    document.getElementById('btn-recover-back-2')?.addEventListener('click', () => {
      showRecoverStep('code');
      startRecoverTimer(150);
    });

    // Paso 3 → Éxito
    document.getElementById('form-recover-password')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const p1 = document.getElementById('recover-pass-1').value;
      const p2 = document.getElementById('recover-pass-2').value;
      if (p1.length < 6) return showError(passError, 'La contraseña debe tener al menos 6 caracteres.');
      if (p1 !== p2) return showError(passError, 'Las contraseñas no coinciden.');
      showError(passError, '');
      showRecoverStep('success');
    });
  }

});
