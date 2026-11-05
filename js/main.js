// =========================================================================
// MAIN SHELL — CALLEJEROS RÍO CUARTO
// Lógica compartida para Navbar, Menú Lateral, Notificaciones, Temas y FAB.
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------------------------------------------------
  // 1. GESTIÓN DE TEMA CLARO / OSCURO (Tailwind dark class + LocalStorage)
  // -----------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  function initTheme() {
    const savedTheme = localStorage.getItem('callejeros_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      htmlRoot.classList.add('dark');
    } else {
      htmlRoot.classList.remove('dark');
    }
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = htmlRoot.classList.toggle('dark');
    localStorage.setItem('callejeros_theme', isDark ? 'dark' : 'light');
  });

  initTheme();

  // -----------------------------------------------------------------------
  // 2. GESTIÓN DE NOTIFICACIONES (Badge, Slider y Persistencia)
  // -----------------------------------------------------------------------
  let notifications = JSON.parse(localStorage.getItem('callejeros_notifications') || 'null');
  if (!notifications) {
    notifications = [...initialNotifications];
    localStorage.setItem('callejeros_notifications', JSON.stringify(notifications));
  }

  const notifBtn = document.getElementById('btn-notifications');
  const notifBadge = document.getElementById('notif-badge-count');
  const notifPanel = document.getElementById('notifications-slider-panel');
  const notifSliderContainer = document.getElementById('notif-slider-container');
  const fullNotifsList = document.getElementById('full-notifications-list');

  function renderNotifications() {
    const unreadCount = notifications.filter(n => n.unread).length;

    // Actualizar badge en campanita
    if (notifBadge) {
      if (unreadCount > 0) {
        notifBadge.textContent = unreadCount;
        notifBadge.classList.remove('hidden');
      } else {
        notifBadge.classList.add('hidden');
      }
    }

    // Renderizar slider de las últimas 5 notificaciones
    if (notifSliderContainer) {
      const last5 = notifications.slice(0, 5);
      notifSliderContainer.innerHTML = last5.map(n => `
        <div class="flex-shrink-0 w-64 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
          n.unread 
            ? 'bg-orange-50/90 dark:bg-orange-950/30 border-orange-300 dark:border-orange-800/60 shadow-sm' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/60 opacity-80'
        }" data-id="${n.id}">
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              n.unread ? 'bg-orange-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }">${n.tag}</span>
            <span class="text-[11px] text-slate-600 dark:text-slate-300 font-medium">${n.time}</span>
          </div>
          <h4 class="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">${n.title}</h4>
          <p class="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 leading-relaxed">${n.text}</p>
        </div>
      `).join('');

      // Marcar individual como leída al hacer click
      notifSliderContainer.querySelectorAll('[data-id]').forEach(card => {
        card.addEventListener('click', () => {
          const id = parseInt(card.getAttribute('data-id'));
          const notif = notifications.find(item => item.id === id);
          if (notif) notif.unread = false;
          saveNotifications();
          renderNotifications();
        });
      });
    }

    // Renderizar lista completa si estamos en notificaciones.html
    if (fullNotifsList) {
      fullNotifsList.innerHTML = notifications.map(n => `
        <div class="p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          n.unread
            ? 'bg-orange-50/70 dark:bg-orange-950/20 border-orange-300 dark:border-orange-800'
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
        }">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                n.unread ? 'bg-orange-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }">${n.tag}</span>
              <span class="text-xs text-slate-600 dark:text-slate-300 font-medium">${n.time}</span>
              ${n.unread ? '<span class="w-2 h-2 rounded-full bg-orange-500"></span>' : ''}
            </div>
            <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white">${n.title}</h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${n.text}</p>
          </div>
          ${n.unread ? `
            <button type="button" class="btn-mark-single-read px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 active:scale-95 whitespace-nowrap" data-id="${n.id}">
              Marcar leída
            </button>
          ` : ''}
        </div>
      `).join('');

      fullNotifsList.querySelectorAll('.btn-mark-single-read').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'));
          const notif = notifications.find(n => n.id === id);
          if (notif) notif.unread = false;
          saveNotifications();
          renderNotifications();
        });
      });
    }
  }

  function saveNotifications() {
    localStorage.setItem('callejeros_notifications', JSON.stringify(notifications));
  }

  function closeNotifPanel() {
    if (!notifPanel) return;
    notifPanel.classList.add('hidden');
    notifBtn?.setAttribute('aria-expanded', 'false');
  }

  function openNotifPanel() {
    if (!notifPanel) return;
    // Cierre automático: cerrar menú hamburguesa si está abierto
    if (isMenuOpen) {
      toggleMenu(false);
    }
    notifPanel.classList.remove('hidden');
    notifBtn?.setAttribute('aria-expanded', 'true');
  }

  function toggleNotifPanel(e) {
    if (e) e.stopPropagation();
    if (!notifPanel) return;
    const isHidden = notifPanel.classList.contains('hidden');
    if (isHidden) {
      openNotifPanel();
    } else {
      closeNotifPanel();
    }
  }

  notifBtn?.addEventListener('click', toggleNotifPanel);

  // Marcar todas como leídas
  document.getElementById('btn-mark-all-read')?.addEventListener('click', () => {
    notifications.forEach(n => n.unread = false);
    saveNotifications();
    renderNotifications();
  });
  document.getElementById('btn-mark-all-read-full')?.addEventListener('click', () => {
    notifications.forEach(n => n.unread = false);
    saveNotifications();
    renderNotifications();
  });

  // Flechas del slider
  document.getElementById('notif-slider-next')?.addEventListener('click', () => {
    notifSliderContainer?.scrollBy({ left: 240, behavior: 'smooth' });
  });
  document.getElementById('notif-slider-prev')?.addEventListener('click', () => {
    notifSliderContainer?.scrollBy({ left: -240, behavior: 'smooth' });
  });

  renderNotifications();

  // -----------------------------------------------------------------------
  // 3. MENÚ HAMBURGUESA Y ESTADO DE SESIÓN (Logueado vs No Registrado)
  // -----------------------------------------------------------------------
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBackdrop = document.getElementById('menu-backdrop');
  const iconBars = document.getElementById('menu-icon-bars');
  const iconClose = document.getElementById('menu-icon-close');
  const userStatusContainer = document.getElementById('user-status-container');
  const authStateLabel = document.getElementById('auth-state-label');
  const btnToggleAuth = document.getElementById('btn-toggle-auth-state');

  let isMenuOpen = false;

  function toggleMenu(show) {
    isMenuOpen = typeof show === 'boolean' ? show : !isMenuOpen;
    if (isMenuOpen) {
      // Cierre automático: cerrar panel de notificaciones si está abierto
      closeNotifPanel();
      mobileMenu?.classList.remove('translate-x-full');
      menuBackdrop?.classList.remove('hidden');
      setTimeout(() => menuBackdrop?.classList.remove('opacity-0'), 10);
      iconBars?.classList.add('hidden');
      iconClose?.classList.remove('hidden');
      menuBtn?.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden');
    } else {
      mobileMenu?.classList.add('translate-x-full');
      menuBackdrop?.classList.add('opacity-0');
      setTimeout(() => menuBackdrop?.classList.add('hidden'), 300);
      iconBars?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
      menuBtn?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
    }
  }

  menuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
  menuBackdrop?.addEventListener('click', () => toggleMenu(false));

  // Cierre automático al presionar Escape o al hacer clic fuera de los sliders
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNotifPanel();
      toggleMenu(false);
    }
  });

  document.addEventListener('click', (e) => {
    // Si se hizo clic fuera del slider de notificaciones y no es el botón que lo abre
    if (notifPanel && !notifPanel.classList.contains('hidden')) {
      if (!notifPanel.contains(e.target) && !notifBtn?.contains(e.target)) {
        closeNotifPanel();
      }
    }
    // Si se hizo clic fuera del menú móvil y no es el botón del menú
    if (isMenuOpen && mobileMenu) {
      if (!mobileMenu.contains(e.target) && !menuBtn?.contains(e.target)) {
        toggleMenu(false);
      }
    }
  });

  function renderUserStatusInMenu() {
    if (!userStatusContainer) return;
    const currentUser = JSON.parse(localStorage.getItem('callejeros_user') || 'null');

    if (currentUser) {
      // Usuario Logueado (UserRegis según Figma)
      userStatusContainer.innerHTML = `
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block">Cuenta activa</span>
            <p class="font-display font-bold text-lg text-slate-900 dark:text-white">¡Hola, ${currentUser.name}!</p>
            <span class="text-xs text-orange-600 dark:text-orange-400 font-medium">Voluntario Callejeros</span>
          </div>
          <div class="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
            ${currentUser.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <button type="button" id="btn-logout" class="mt-3 w-full py-2 px-3 rounded-lg text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
          Cerrar Sesión
        </button>
      `;
      if (authStateLabel) authStateLabel.textContent = `Logueado (${currentUser.name})`;

      document.getElementById('btn-logout')?.addEventListener('click', () => {
        localStorage.removeItem('callejeros_user');
        renderUserStatusInMenu();
      });
    } else {
      // Usuario No Logueado (NoRegis según Figma): Invitación explícita a registrarse
      userStatusContainer.innerHTML = `
        <div class="flex items-center justify-between mb-3">
          <div>
            <span class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block">Bienvenido a Callejeros</span>
            <p class="font-display font-bold text-base text-slate-800 dark:text-slate-100">No Registrado...</p>
          </div>
          <div class="w-11 h-11 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center font-bold text-lg">
            👤
          </div>
        </div>

        <!-- Tarjeta destacada de invitación -->
        <div class="p-3.5 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-750 border border-orange-200/70 dark:border-slate-700 shadow-sm space-y-2">
          <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            ¡Conectate con la comunidad! Registrate para adoptar, publicar casos de rescate o reportar alertas comunitarias.
          </p>
          <div class="flex items-center gap-2 pt-1">
            <a href="registro.html" class="flex-1 py-2 px-3 rounded-xl font-bold text-xs text-center text-white bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-sm transition-all">
              Registrarme
            </a>
            <a href="login.html" class="flex-1 py-2 px-3 rounded-xl font-bold text-xs text-center text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 active:scale-95 transition-all">
              Iniciar Sesión
            </a>
          </div>
        </div>
      `;
      if (authStateLabel) authStateLabel.textContent = 'No Registrado';
    }
  }

  btnToggleAuth?.addEventListener('click', () => {
    const currentUser = JSON.parse(localStorage.getItem('callejeros_user') || 'null');
    if (currentUser) {
      localStorage.removeItem('callejeros_user');
    } else {
      localStorage.setItem('callejeros_user', JSON.stringify({ name: 'Tomás', email: 'tomas@callejeros.org' }));
    }
    renderUserStatusInMenu();
  });

  renderUserStatusInMenu();

  // -----------------------------------------------------------------------
  // 4. FAB: ALTA TRANSPARENCIA CUANDO ESTÁ INACTIVO
  // -----------------------------------------------------------------------
  const fabBtn = document.getElementById('fab-alerta');
  let fabIdleTimer = null;

  function resetFab() {
    if (!fabBtn) return;
    fabBtn.classList.remove('opacity-25');
    fabBtn.classList.add('opacity-85');
    clearTimeout(fabIdleTimer);

    fabIdleTimer = setTimeout(() => {
      fabBtn.classList.remove('opacity-85');
      fabBtn.classList.add('opacity-25');
    }, 2500);
  }

  window.addEventListener('scroll', resetFab, { passive: true });
  window.addEventListener('touchstart', resetFab, { passive: true });
  resetFab();

});
