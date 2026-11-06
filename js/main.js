// =========================================================================
// MAIN SHELL — CALLEJEROS RÍO CUARTO
// Lógica compartida para Navbar, Menú Lateral, Notificaciones, Temas y FAB.
// =========================================================================

// Escapa texto antes de insertarlo con innerHTML, para que los datos cargados
// por usuarios (nombres, descripciones, alertas) no se interpreten como HTML.
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Arma la lista de comentarios (burbujas con inicial, nombre, hora y texto).
// La usan la ficha de alertas y la noticia en grande, con comentarios simulados.
function renderCommentItems(comments, emptyText) {
  if (!comments || comments.length === 0) {
    return `<p class="text-sm text-slate-500 dark:text-slate-400 py-2">${escapeHtml(emptyText)}</p>`;
  }
  return comments.map(c => `
    <li class="flex gap-3">
      <div class="w-9 h-9 flex-shrink-0 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 flex items-center justify-center font-bold text-sm" aria-hidden="true">
        ${escapeHtml(String(c.author).charAt(0).toUpperCase())}
      </div>
      <div class="flex-1 min-w-0 rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-2.5">
        <div class="flex items-baseline justify-between gap-2">
          <span class="font-bold text-sm text-slate-900 dark:text-white truncate">${escapeHtml(c.author)}</span>
          <span class="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">${escapeHtml(c.time)}</span>
        </div>
        <p class="text-sm text-slate-700 dark:text-slate-200 mt-0.5 leading-relaxed">${escapeHtml(c.text)}</p>
      </div>
    </li>
  `).join('');
}

// =========================================================================
// NOTIFICACIONES Y EVENTOS SIMULADOS (versión demo, sin backend)
// Cualquier página puede agregar una notificación o programar un "evento demo"
// (por ejemplo, la respuesta a una solicitud de adopción) que se resuelve solo
// unos segundos después, como si respondiera un voluntario.
// =========================================================================
const DEMO_RESPONSE_DELAY_MS = 8000;

function getNotifications() {
  let list = JSON.parse(localStorage.getItem('callejeros_notifications') || 'null');
  if (!list) {
    list = [...initialNotifications];
    localStorage.setItem('callejeros_notifications', JSON.stringify(list));
  }
  return list;
}

function saveNotificationList(list) {
  localStorage.setItem('callejeros_notifications', JSON.stringify(list));
  window.dispatchEvent(new CustomEvent('callejeros:notificaciones'));
}

// { title, text, tag, link? } → se agrega arriba, sin leer
function pushNotification(notif) {
  const list = getNotifications();
  list.unshift({ id: Date.now() + Math.floor(Math.random() * 1000), time: 'Recién', unread: true, ...notif });
  saveNotificationList(list);
}

function getStoredList(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveStoredList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

// Padrinos de una mascota: los de ejemplo (data.js) + los apadrinamientos hechos en este dispositivo
function getPadrinosCount(pet) {
  const mine = getStoredList('callejeros_apadrinamientos').filter(a => a.petId === pet.id).length;
  return (pet.padrinos || 0) + mine;
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('callejeros_user') || 'null');
}

// Favoritos (catálogo y ficha de mascota)
function getFavorites() {
  return JSON.parse(localStorage.getItem('callejeros_favorites') || '[]');
}

function toggleFavorite(petId) {
  let favs = getFavorites();
  const isFav = favs.includes(petId);
  favs = isFav ? favs.filter(id => id !== petId) : [...favs, petId];
  localStorage.setItem('callejeros_favorites', JSON.stringify(favs));
  return !isFav;
}

// Modales compartidos entre adopciones.html y mascota.html (si la página los tiene)
function openAuthRequiredModal({ text, redirect }) {
  const textEl = document.getElementById('auth-required-text');
  if (textEl) textEl.textContent = text;
  const target = encodeURIComponent(redirect || 'adopciones.html');
  document.getElementById('auth-required-login')?.setAttribute('href', `login.html?redirect=${target}`);
  document.getElementById('auth-required-register')?.setAttribute('href', `registro.html?redirect=${target}`);
  document.getElementById('modal-auth-required')?.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function openSuccessModal(title, text) {
  const titleEl = document.getElementById('modal-exito-titulo');
  const textEl = document.getElementById('modal-exito-texto');
  if (titleEl) titleEl.textContent = title;
  if (textEl) textEl.textContent = text;
  document.getElementById('modal-exito-envio')?.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

// Programa un evento que main.js resuelve cuando pasa el tiempo (aunque se cambie de página)
function scheduleDemoEvent(evt) {
  const list = getStoredList('callejeros_pendientes');
  list.push({ ...evt, resolveAt: Date.now() + DEMO_RESPONSE_DELAY_MS });
  saveStoredList('callejeros_pendientes', list);
}

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
  let notifications = getNotifications();

  const notifBtn = document.getElementById('btn-notifications');
  const notifBadge = document.getElementById('notif-badge-count');
  const notifPanel = document.getElementById('notifications-slider-panel');
  const notifSliderContainer = document.getElementById('notif-slider-container');
  const fullNotifsList = document.getElementById('full-notifications-list');

  function renderNotifications() {
    // Releer siempre: otras páginas o eventos demo pueden haber agregado notificaciones
    notifications = getNotifications();
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
        }" data-id="${escapeHtml(n.id)}">
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              n.unread ? 'bg-orange-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }">${escapeHtml(n.tag)}</span>
            <span class="text-[11px] text-slate-600 dark:text-slate-300 font-medium">${escapeHtml(n.time)}</span>
          </div>
          <h4 class="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">${escapeHtml(n.title)}</h4>
          <p class="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 leading-relaxed">${escapeHtml(n.text)}</p>
        </div>
      `).join('');

      // Marcar individual como leída al hacer click (y abrir su detalle si tiene enlace)
      notifSliderContainer.querySelectorAll('[data-id]').forEach(card => {
        card.addEventListener('click', () => {
          const id = parseInt(card.getAttribute('data-id'));
          const notif = notifications.find(item => item.id === id);
          if (notif) notif.unread = false;
          saveNotifications();
          if (notif?.link) {
            window.location.href = notif.link;
            return;
          }
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
              }">${escapeHtml(n.tag)}</span>
              <span class="text-xs text-slate-600 dark:text-slate-300 font-medium">${escapeHtml(n.time)}</span>
              ${n.unread ? '<span class="w-2 h-2 rounded-full bg-orange-500"></span>' : ''}
            </div>
            <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white">${escapeHtml(n.title)}</h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${escapeHtml(n.text)}</p>
            ${n.link ? `
              <a href="${escapeHtml(n.link)}" data-id="${escapeHtml(n.id)}" class="notif-link inline-flex items-center gap-1 min-h-[44px] text-sm font-bold text-orange-600 dark:text-orange-400 hover:underline">
                Ver detalle <span aria-hidden="true">→</span>
              </a>
            ` : ''}
          </div>
          ${n.unread ? `
            <button type="button" class="btn-mark-single-read min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 active:scale-95 whitespace-nowrap" data-id="${escapeHtml(n.id)}">
              Marcar leída
            </button>
          ` : ''}
        </div>
      `).join('');

      // Abrir el detalle también la marca como leída
      fullNotifsList.querySelectorAll('.notif-link').forEach(link => {
        link.addEventListener('click', () => {
          const notif = notifications.find(n => n.id === parseInt(link.getAttribute('data-id')));
          if (notif) notif.unread = false;
          saveNotifications();
        });
      });

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
  window.addEventListener('callejeros:notificaciones', renderNotifications);

  // -----------------------------------------------------------------------
  // 2.b EVENTOS DEMO PENDIENTES (respuesta simulada de voluntarios)
  // -----------------------------------------------------------------------
  function resolveDemoEvent(evt) {
    if (evt.type === 'solicitud') {
      // Resultado de la solicitud de adopción
      const solicitudes = getStoredList('callejeros_solicitudes');
      const sol = solicitudes.find(s => s.id === evt.solicitudId);
      if (!sol) return;
      sol.status = evt.result;
      saveStoredList('callejeros_solicitudes', solicitudes);
      pushNotification(evt.result === 'aprobada'
        ? { title: `¡Tu solicitud para adoptar a ${sol.petName} fue aprobada!`, text: 'Mirá los datos de contacto del hogar de tránsito para coordinar el encuentro.', tag: 'Adopción', link: `solicitud.html#${sol.id}` }
        : { title: `Respuesta a tu solicitud para ${sol.petName}`, text: 'Esta vez no pudimos aprobarla. Te contamos por qué y cómo seguir.', tag: 'Adopción', link: `solicitud.html#${sol.id}` });
    }

    if (evt.type === 'publicacion') {
      // Publicación de adopción aprobada: recién ahora aparece en el catálogo
      const customPets = getStoredList('callejeros_custom_pets');
      customPets.unshift(evt.pet);
      saveStoredList('callejeros_custom_pets', customPets);
      pushNotification({ title: `¡${evt.pet.name} ya está publicado!`, text: 'Un voluntario aprobó tu publicación y ya aparece en el catálogo de adopción.', tag: 'Publicación', link: `mascota.html#${evt.pet.id}` });
    }
  }

  function processDemoEvents() {
    const pending = getStoredList('callejeros_pendientes');
    if (pending.length === 0) return;
    const now = Date.now();
    const due = pending.filter(evt => evt.resolveAt <= now);
    if (due.length === 0) return;
    saveStoredList('callejeros_pendientes', pending.filter(evt => evt.resolveAt > now));
    due.forEach(resolveDemoEvent);
    window.dispatchEvent(new CustomEvent('callejeros:datos'));
  }

  processDemoEvents();
  setInterval(processDemoEvents, 2000);

  // Botones de los modales compartidos (popup de sesión y modal de éxito)
  document.getElementById('btn-close-auth-required')?.addEventListener('click', () => {
    document.getElementById('modal-auth-required')?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  });
  document.getElementById('btn-modal-ir-inicio')?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

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
    // Menú cerrado = fuera de pantalla e inaccesible con teclado/lector de pantalla
    if (mobileMenu) mobileMenu.inert = !isMenuOpen;
    // El botón flotante de alerta tapaba el final del menú: se oculta mientras está abierto
    document.getElementById('fab-alerta')?.classList.toggle('hidden', isMenuOpen);
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

  // Cerrar el menú al elegir un enlace (necesario cuando el enlace apunta a la misma página, ej. #publicar)
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
  if (mobileMenu) mobileMenu.inert = true;

  // Resaltar en el menú la sección actual (noticia.html cuenta como Noticias)
  const currentPage = (window.location.pathname.split('/').pop() || 'index').replace(/\.html$/, '');
  const sectionPage = currentPage === 'noticia' ? 'noticias' : currentPage;
  mobileMenu?.querySelectorAll('a[href]').forEach(link => {
    const [file, hash] = link.getAttribute('href').split('#');
    if (hash) return; // "Publicar" y "Apadrinar" son accesos dentro de otra sección
    if (file.replace(/\.html$/, '') === sectionPage) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('ring-2', 'ring-orange-500', 'font-bold');
    }
  });

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
      // Usuario Logueado (UserRegis según Figma).
      // Debajo del nombre va el rol de la cuenta, igual que la badge de mi-cuenta.html.
      // En el back end: "Staff Callejeros" o "Refugio verificado" solo si el admin asignó
      // ese rol (user.role); las cuentas comunes no muestran nada.
      // Demo: el rol se cambia con "Rol de prueba" en mi-cuenta.html.
      const roleLabel = currentUser.role === 'staff'
        ? '<span class="text-xs text-violet-700 dark:text-violet-300 font-bold">🛡️ Staff Callejeros</span>'
        : currentUser.role === 'refugio'
          ? '<span class="text-xs text-blue-700 dark:text-blue-300 font-bold">✓ Refugio verificado</span>'
          : '';
      userStatusContainer.innerHTML = `
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block">Cuenta activa</span>
            <p class="font-display font-bold text-lg text-slate-900 dark:text-white">¡Hola, ${escapeHtml(currentUser.name)}!</p>
            ${roleLabel}
          </div>
          <div class="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
            ${escapeHtml(String(currentUser.name || '?').charAt(0).toUpperCase())}
          </div>
        </div>
        <div class="mt-3 grid grid-cols-2 gap-2">
          <a href="mi-cuenta.html" class="inline-flex items-center justify-center min-h-[44px] py-2 px-3 rounded-lg text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-sm transition-all">
            ⚙️ Mi cuenta
          </a>
          <button type="button" id="btn-logout" class="min-h-[44px] py-2 px-3 rounded-lg text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
            Cerrar Sesión
          </button>
        </div>
      `;
      if (authStateLabel) authStateLabel.textContent = `Logueado (${currentUser.name})`;

      document.getElementById('btn-logout')?.addEventListener('click', () => {
        localStorage.removeItem('callejeros_user');
        renderUserStatusInMenu();
        window.dispatchEvent(new CustomEvent('callejeros:sesion'));
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
            <a href="registro.html" class="flex-1 inline-flex items-center justify-center min-h-[44px] py-2 px-3 rounded-xl font-bold text-xs text-center text-white bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-sm transition-all">
              Registrarme
            </a>
            <a href="login.html" class="flex-1 inline-flex items-center justify-center min-h-[44px] py-2 px-3 rounded-xl font-bold text-xs text-center text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 active:scale-95 transition-all">
              Iniciar Sesión
            </a>
          </div>
        </div>
      `;
      if (authStateLabel) authStateLabel.textContent = 'No Registrado';
    }
  }

  // "Alternar Modo Test": QUITAR ESTE BOTÓN (y este listener) EN LA FASE DE DESARROLLO.
  // Solo sirve para probar la demo con y sin sesión iniciada.
  btnToggleAuth?.addEventListener('click', () => {
    const currentUser = JSON.parse(localStorage.getItem('callejeros_user') || 'null');
    if (currentUser) {
      localStorage.removeItem('callejeros_user');
    } else {
      localStorage.setItem('callejeros_user', JSON.stringify({ name: 'Tomás', email: 'tomas@callejeros.org' }));
    }
    renderUserStatusInMenu();
    window.dispatchEvent(new CustomEvent('callejeros:sesion'));
  });

  renderUserStatusInMenu();
  // Si otra parte de la página cambia la sesión o el rol (ej. "Rol de prueba" en Mi Cuenta)
  window.addEventListener('callejeros:sesion', renderUserStatusInMenu);

  // -----------------------------------------------------------------------
  // 4. FAB: ALTA TRANSPARENCIA CUANDO ESTÁ INACTIVO
  // -----------------------------------------------------------------------
  const fabBtn = document.getElementById('fab-alerta');
  let fabIdleTimer = null;

  function resetFab() {
    if (!fabBtn) return;
    fabBtn.classList.remove('opacity-25');
    fabBtn.classList.add('opacity-90');
    clearTimeout(fabIdleTimer);

    fabIdleTimer = setTimeout(() => {
      fabBtn.classList.remove('opacity-90');
      fabBtn.classList.add('opacity-25');
    }, 2500);
  }

  // -----------------------------------------------------------------------
  // 5. BOTÓN VOLVER (estilo Figma "<")
  // Vuelve a la pantalla anterior del sitio. Si se entró directo a la página,
  // o se viene de login/registro, usa el href del enlace como destino fijo.
  // -----------------------------------------------------------------------
  document.querySelectorAll('[data-back]').forEach(link => {
    link.addEventListener('click', (e) => {
      let ref = null;
      try { ref = document.referrer ? new URL(document.referrer) : null; } catch { ref = null; }
      const sameSite = ref && ref.origin === window.location.origin;
      const isAuthPath = (path) => /(login|registro)(\.html)?$/.test(path);
      // Después de iniciar sesión no tiene sentido "volver" al formulario de login
      const fromAuth = ref && isAuthPath(ref.pathname) && !isAuthPath(window.location.pathname);
      if (sameSite && !fromAuth && window.history.length > 1) {
        e.preventDefault();
        window.history.back();
      }
    });
  });

  window.addEventListener('scroll', resetFab, { passive: true });
  window.addEventListener('touchstart', resetFab, { passive: true });
  resetFab();

});
