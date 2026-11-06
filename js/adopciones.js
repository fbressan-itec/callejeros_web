// =========================================================================
// MÓDULO DE ADOPCIONES — CALLEJEROS RÍO CUARTO
// Lógica de filtrado, ficha de detalle con sistema de badges, 
// validación de sesión obligatoria, publicación con badge Casos Urgentes y feedback modal.
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const petsGrid = document.getElementById('pets-grid');
  if (!petsGrid) return; // Si la página actual no tiene la grilla de mascotas, salir pacíficamente.

  let currentFilterSpecie = 'all';
  let activeFilterSearch = '';
  let activeFilterAges = [];
  let activeFilterSociable = 'all';
  let activeFilterCastrado = 'all'; // 'all', 'castrado', 'no_castrado'
  let activeFilterSex = 'all';
  let activeFilterOnlyFavs = false;
  let activeFilterOnlyUrgent = false;

  // Obtener todas las mascotas (muestras + publicadas por usuarios en localStorage)
  function getAllPets() {
    const customPets = JSON.parse(localStorage.getItem('callejeros_custom_pets') || '[]');
    return [...customPets, ...samplePets];
  }

  function renderPets() {
    const favorites = JSON.parse(localStorage.getItem('callejeros_favorites') || '[]');
    const allPets = getAllPets();

    const filtered = allPets.filter(pet => {
      // 1. Especie
      if (currentFilterSpecie !== 'all' && pet.specie !== currentFilterSpecie) return false;

      // 2. Búsqueda por texto
      if (activeFilterSearch && !pet.name.toLowerCase().includes(activeFilterSearch.toLowerCase())) {
        return false;
      }

      // 3. Rango de edad numérico (Fiel a Figma: "De 0 a 3 Años", "De 3 a 7 Años", "Más de 7 Años")
      if (activeFilterAges.length > 0) {
        const years = pet.ageYears !== undefined ? pet.ageYears : (parseInt(pet.age) || (pet.age.includes('Meses') ? 0.5 : 2));
        const matchesAge = activeFilterAges.some(range => {
          if (range === '0-3') return years <= 3;
          if (range === '3-7') return years > 3 && years <= 7;
          if (range === '7+') return years > 7;
          return true;
        });
        if (!matchesAge) return false;
      }

      // 4. Sociabilidad
      if (activeFilterSociable === 'sociable' && !pet.sociable) return false;
      if (activeFilterSociable === 'salvaje' && pet.sociable) return false;

      // 5. Castración (Dividida en Castrados y No Castrados)
      if (activeFilterCastrado === 'castrado' && !pet.castrado) return false;
      if (activeFilterCastrado === 'no_castrado' && pet.castrado) return false;

      // 6. Sexo (Macho / Hembra)
      if (activeFilterSex !== 'all' && pet.sex && pet.sex !== activeFilterSex) return false;

      // 7. Casos Urgentes (Filtro Especial)
      if (activeFilterOnlyUrgent && !pet.urgent) return false;

      // 8. Solo Favoritos
      if (activeFilterOnlyFavs && !favorites.includes(pet.id)) return false;

      return true;
    });

    if (filtered.length === 0) {
      petsGrid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-500 dark:text-slate-400">
          <span class="text-4xl block mb-2">🔍</span>
          <p class="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-200">No encontramos animalitos con esos filtros.</p>
          <p class="text-xs sm:text-sm mt-1">Probá limpiando los filtros para ver todos los rescatados disponibles.</p>
          <button type="button" id="btn-quick-reset" class="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 transition-colors">
            Limpiar Filtros
          </button>
        </div>
      `;
      document.getElementById('btn-quick-reset')?.addEventListener('click', resetAllFilters);
      return;
    }

    petsGrid.innerHTML = filtered.map(pet => {
      const isFav = favorites.includes(pet.id);
      const id = escapeHtml(pet.id);
      const name = escapeHtml(pet.name);
      const age = escapeHtml(pet.age);
      return `
        <article class="pet-card group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-soft dark:shadow-soft-dark hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer" data-id="${id}">

          <!-- Foto y Badges Superiores -->
          <div class="relative w-full h-44 sm:h-52 overflow-hidden bg-slate-100 dark:bg-slate-900">
            <img src="${escapeHtml(pet.image)}" alt="Foto de ${name}, ${age}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            
            <!-- Badges Superiores Izquierdos (Sociabilidad y Caso Urgente) -->
            <div class="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
              <span class="px-2 py-0.5 rounded-md text-[11px] font-bold text-white shadow-md ${
                pet.sociable ? 'bg-emerald-600' : 'bg-red-500'
              }">
                ${pet.sociable ? 'Sociable' : 'Salvaje'}
              </span>
              ${pet.urgent ? `
                <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold text-white bg-rose-600 shadow-md flex items-center gap-1 animate-pulse">
                  🚨 Caso Urgente
                </span>
              ` : ''}
            </div>

            <!-- Botón Me Gusta / Favoritos -->
            <div class="absolute top-2.5 right-2.5 z-10">
              <button type="button" class="btn-toggle-fav w-11 h-11 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white hover:text-red-500 flex items-center justify-center shadow-md active:scale-125 transition-transform" data-id="${id}" aria-label="Guardar a ${name} en favoritos">
                <svg class="w-4 h-4 transition-colors ${
                  isFav ? 'fill-red-500 text-red-500' : 'fill-none text-slate-900 dark:text-white'
                }" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Metadatos de la Mascota -->
          <div class="p-3.5 sm:p-4 flex flex-col justify-between flex-grow bg-white dark:bg-slate-850">
            <div>
              <div class="flex items-center justify-between gap-1">
                <h3 class="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">${name}</h3>
                <span class="text-xs text-slate-400 capitalize">${escapeHtml(pet.sex)}</span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                ${age} • ${pet.castrado ? 'Castrado' : 'No Castrado'}
              </p>
            </div>

            <!-- Botón Adoptar: Lleva a la descripción del animal (Fiel a Figma) -->
            <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button type="button" class="btn-open-detail-view w-full min-h-[44px] py-2.5 px-3 rounded-xl font-display font-bold text-xs text-white bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5" data-id="${id}">
                <span>Adoptar</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

        </article>
      `;
    }).join('');

    // Listener para abrir Ficha Detalle al hacer clic en tarjeta o botón "Adoptar"
    petsGrid.querySelectorAll('.pet-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-toggle-fav')) return;
        const id = card.getAttribute('data-id');
        const allPets = getAllPets();
        const pet = allPets.find(p => p.id === id);
        if (pet) openPetDetailModal(pet);
      });
    });

    // Listeners de favoritos
    petsGrid.querySelectorAll('.btn-toggle-fav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        let favs = JSON.parse(localStorage.getItem('callejeros_favorites') || '[]');
        if (favs.includes(id)) {
          favs = favs.filter(f => f !== id);
        } else {
          favs.push(id);
        }
        localStorage.setItem('callejeros_favorites', JSON.stringify(favs));
        renderPets();
      });
    });
  }

  // Filtros rápidos por botones de especie
  document.querySelectorAll('.filter-specie-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilterSpecie = btn.getAttribute('data-filter');
      document.querySelectorAll('.filter-specie-btn').forEach(b => {
        b.classList.remove('bg-orange-500', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      });
      btn.classList.add('bg-orange-500', 'text-white', 'shadow-md');
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      renderPets();
    });
  });

  // Modal de Filtros Avanzados (boceto_filtro-mascotas_mobile)
  const modalFiltros = document.getElementById('modal-filtros');
  const btnOpenFilters = document.getElementById('btn-open-filters');
  const btnCloseFilters = document.getElementById('btn-close-filters');
  const btnApplyFilters = document.getElementById('btn-apply-filters');
  const btnResetFilters = document.getElementById('btn-reset-filters');
  const filterSearchInput = document.getElementById('filter-search-input');
  const filterOnlyFavs = document.getElementById('filter-only-favs');
  const filterOnlyUrgent = document.getElementById('filter-only-urgent');

  btnOpenFilters?.addEventListener('click', () => {
    modalFiltros?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  });

  function closeFiltersModal() {
    modalFiltros?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  btnCloseFilters?.addEventListener('click', closeFiltersModal);

  btnApplyFilters?.addEventListener('click', () => {
    activeFilterSearch = filterSearchInput?.value.trim() || '';
    activeFilterAges = Array.from(document.querySelectorAll('input[name="filter-age-num"]:checked')).map(cb => cb.value);
    activeFilterSociable = document.querySelector('input[name="filter-sociable"]:checked')?.value || 'all';
    activeFilterCastrado = document.querySelector('input[name="filter-castrado"]:checked')?.value || 'all';
    activeFilterSex = document.querySelector('input[name="filter-sex"]:checked')?.value || 'all';
    activeFilterOnlyFavs = filterOnlyFavs?.checked || false;
    activeFilterOnlyUrgent = filterOnlyUrgent?.checked || false;

    closeFiltersModal();
    renderPets();
  });

  function resetAllFilters() {
    if (filterSearchInput) filterSearchInput.value = '';
    document.querySelectorAll('input[name="filter-age-num"]').forEach(cb => cb.checked = false);
    const radioSociable = document.querySelector('input[name="filter-sociable"][value="all"]');
    if (radioSociable) radioSociable.checked = true;
    const radioCastrado = document.querySelector('input[name="filter-castrado"][value="all"]');
    if (radioCastrado) radioCastrado.checked = true;
    const radioSex = document.querySelector('input[name="filter-sex"][value="all"]');
    if (radioSex) radioSex.checked = true;
    if (filterOnlyFavs) filterOnlyFavs.checked = false;
    if (filterOnlyUrgent) filterOnlyUrgent.checked = false;

    activeFilterSearch = '';
    activeFilterAges = [];
    activeFilterSociable = 'all';
    activeFilterCastrado = 'all';
    activeFilterSex = 'all';
    activeFilterOnlyFavs = false;
    activeFilterOnlyUrgent = false;

    renderPets();
  }

  btnResetFilters?.addEventListener('click', resetAllFilters);

  // =========================================================================
  // VISTA DESCRIPCIÓN Y DETALLE DE MASCOTA (Fiel a Figma "Detalle de mascota")
  // =========================================================================
  const modalDetalle = document.getElementById('modal-detalle-mascota');
  const btnCloseDetalle = document.getElementById('btn-close-detalle');
  const detalleName = document.getElementById('detalle-pet-name');
  const detalleImg = document.getElementById('detalle-pet-img');
  const detalleDesc = document.getElementById('detalle-pet-desc');
  const detalleOverlayBadgeContainer = document.getElementById('detalle-overlay-badge-container');
  const detalleBadgesGrid = document.getElementById('detalle-badges-grid');
  const detalleSaludContent = document.getElementById('detalle-salud-content');
  const detalleNotasContent = document.getElementById('detalle-notas-content');
  const btnDetalleFav = document.getElementById('btn-detalle-fav');
  const detalleFavIcon = document.getElementById('detalle-fav-icon');
  const btnDetalleAdoptar = document.getElementById('btn-detalle-adoptar');
  const btnDetalleApadrinar = document.getElementById('btn-detalle-apadrinar');
  let currentSelectedPet = null;

  function openPetDetailModal(pet) {
    currentSelectedPet = pet;
    const favorites = JSON.parse(localStorage.getItem('callejeros_favorites') || '[]');
    const isFav = favorites.includes(pet.id);

    if (detalleName) detalleName.textContent = pet.name;
    if (detalleImg) detalleImg.src = pet.image;
    if (detalleDesc) detalleDesc.textContent = pet.description;

    // Menciones a padrinos (diagrama de flujo)
    const padrinosEl = document.getElementById('detalle-padrinos');
    if (padrinosEl) {
      const count = getPadrinosCount(pet);
      padrinosEl.textContent = count > 0
        ? `${pet.name} tiene ${count} padrino${count === 1 ? '' : 's'} que cubren su alimento y cuidados.`
        : `${pet.name} todavía no tiene padrinos. ¡Podés ser el primero!`;
    }

    // Actualizar icono de favorito
    if (detalleFavIcon) {
      if (isFav) {
        detalleFavIcon.classList.add('fill-red-500', 'text-red-500');
        detalleFavIcon.classList.remove('fill-none', 'text-slate-700', 'dark:text-slate-300');
      } else {
        detalleFavIcon.classList.remove('fill-red-500', 'text-red-500');
        detalleFavIcon.classList.add('fill-none', 'text-slate-700', 'dark:text-slate-300');
      }
    }

    // Badges en superposición sobre la foto
    if (detalleOverlayBadgeContainer) {
      detalleOverlayBadgeContainer.innerHTML = `
        <span class="px-2.5 py-1 rounded-md text-xs font-bold text-white shadow-md ${
          pet.sociable ? 'bg-emerald-600' : 'bg-red-500'
        }">
          ${pet.sociable ? '• Sociable' : '• Salvaje'}
        </span>
        ${pet.urgent ? `
          <span class="px-2.5 py-1 rounded-md text-xs font-extrabold text-white bg-rose-600 shadow-md flex items-center gap-1 animate-pulse">
            🚨 Caso Urgente
          </span>
        ` : ''}
      `;
    }

    // =======================================================================
    // SISTEMA DE BADGES (Fiel a Figma "Sistema de Badges")
    // =======================================================================
    if (detalleBadgesGrid) {
      detalleBadgesGrid.innerHTML = `
        <!-- Badge 1: Sociabilidad -->
        <div class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full ${pet.sociable ? 'bg-emerald-500' : 'bg-red-500'}"></span>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Sociabilidad</span>
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">${pet.sociable ? 'Sociable' : 'Salvaje / Tímido'}</span>
          </div>
        </div>

        <!-- Badge 2: Castración -->
        <div class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center gap-2">
          <span class="text-base">${pet.castrado ? '✂️' : '⏳'}</span>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Castración</span>
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">${pet.castrado ? 'Castrado' : 'No Castrado'}</span>
          </div>
        </div>

        <!-- Badge 3: Casos Urgentes -->
        <div class="p-2.5 rounded-xl border ${
          pet.urgent ? 'border-rose-300 dark:border-rose-900 bg-rose-50/70 dark:bg-rose-950/30' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850'
        } flex items-center gap-2">
          <span class="text-base">${pet.urgent ? '🚨' : '🟢'}</span>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Prioridad</span>
            <span class="text-xs font-bold ${pet.urgent ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'}">
              ${pet.urgent ? 'Caso Urgente' : 'Estándar'}
            </span>
          </div>
        </div>

        <!-- Badge 4: Sexo -->
        <div class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center gap-2">
          <span class="text-base">${pet.sex === 'macho' ? '♂' : '♀'}</span>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Sexo</span>
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200 capitalize">${escapeHtml(pet.sex || 'Macho')}</span>
          </div>
        </div>

        <!-- Badge 5: Edad -->
        <div class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center gap-2">
          <span class="text-base">🎂</span>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Edad</span>
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">${escapeHtml(pet.age)}</span>
          </div>
        </div>

        <!-- Badge 6: Especie -->
        <div class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center gap-2">
          <span class="text-base">${pet.specie === 'perro' ? '🐶' : '🐱'}</span>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Especie</span>
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200 capitalize">${pet.specie === 'perro' ? 'Perro' : 'Gato'}</span>
          </div>
        </div>
      `;
    }

    // Ficha Médica / Estado de Salud
    if (detalleSaludContent) {
      const salud = pet.salud || {
        estado: 'Sano y bajo control veterinario',
        vacunas: 'Plan de vacunación iniciado',
        parasitos: 'Desparasitado',
        pulgas: 'Pipeta al día',
        otros: 'Sin complicaciones detectadas'
      };

      detalleSaludContent.innerHTML = `
        <div class="flex justify-between py-1">
          <span class="text-slate-500">Estado Clínico:</span>
          <span class="font-bold text-slate-900 dark:text-white">${escapeHtml(salud.estado)}</span>
        </div>
        <div class="flex justify-between py-1">
          <span class="text-slate-500">Vacunación:</span>
          <span class="font-bold text-slate-900 dark:text-white">${escapeHtml(salud.vacunas)}</span>
        </div>
        <div class="flex justify-between py-1">
          <span class="text-slate-500">Desparasitación:</span>
          <span class="font-bold text-slate-900 dark:text-white">${escapeHtml(salud.parasitos)}</span>
        </div>
        <div class="flex justify-between py-1">
          <span class="text-slate-500">Pulgas / Garrapatas:</span>
          <span class="font-bold text-slate-900 dark:text-white">${escapeHtml(salud.pulgas)}</span>
        </div>
        <div class="flex justify-between py-1">
          <span class="text-slate-500">Observaciones:</span>
          <span class="font-bold text-slate-900 dark:text-white">${escapeHtml(salud.otros)}</span>
        </div>
      `;
    }

    // Notas Especiales
    if (detalleNotasContent) {
      detalleNotasContent.textContent = pet.notas || 'Animalito muy dócil que requiere cariño, seguimiento de vacunas y compromiso de tenencia responsable.';
    }

    modalDetalle?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closePetDetailModal() {
    modalDetalle?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  btnCloseDetalle?.addEventListener('click', closePetDetailModal);

  // Alternar favorito desde la ficha de detalle
  btnDetalleFav?.addEventListener('click', () => {
    if (!currentSelectedPet) return;
    let favs = JSON.parse(localStorage.getItem('callejeros_favorites') || '[]');
    if (favs.includes(currentSelectedPet.id)) {
      favs = favs.filter(id => id !== currentSelectedPet.id);
      detalleFavIcon?.classList.remove('fill-red-500', 'text-red-500');
      detalleFavIcon?.classList.add('fill-none', 'text-slate-700', 'dark:text-slate-300');
    } else {
      favs.push(currentSelectedPet.id);
      detalleFavIcon?.classList.add('fill-red-500', 'text-red-500');
      detalleFavIcon?.classList.remove('fill-none', 'text-slate-700', 'dark:text-slate-300');
    }
    localStorage.setItem('callejeros_favorites', JSON.stringify(favs));
    renderPets();
  });

  // =========================================================================
  // BOTÓN "¡ADOPTAME!" DENTRO DE LA FICHA: VALIDACIÓN DE SESIÓN OBLIGATORIA
  // =========================================================================
  const modalAuthRequired = document.getElementById('modal-auth-required');
  const btnCloseAuthRequired = document.getElementById('btn-close-auth-required');

  // Mismo popup para adoptar y para publicar: cambia el texto y a dónde volver después del login
  function openAuthRequiredModal({ text, redirect }) {
    const textEl = document.getElementById('auth-required-text');
    if (textEl) textEl.textContent = text;
    const target = encodeURIComponent(redirect || 'adopciones.html');
    document.getElementById('auth-required-login')?.setAttribute('href', `login.html?redirect=${target}`);
    document.getElementById('auth-required-register')?.setAttribute('href', `registro.html?redirect=${target}`);
    modalAuthRequired?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('callejeros_user') || 'null');
  }

  function closeAuthRequiredModal() {
    modalAuthRequired?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  btnCloseAuthRequired?.addEventListener('click', closeAuthRequiredModal);

  btnDetalleAdoptar?.addEventListener('click', () => {
    if (!currentSelectedPet) return;

    // Validación de sesión activa
    if (!getCurrentUser()) {
      // SI NO ESTÁ LOGUEADO: Mostrar popup obligatorio con opción de login/registro
      openAuthRequiredModal({
        text: `Para postularte a la adopción responsable de ${currentSelectedPet.name} es obligatorio ingresar con tu cuenta. Así podremos ponernos en contacto para coordinar la entrevista y el seguimiento.`,
        redirect: 'adopciones.html'
      });
    } else {
      // SI ESTÁ LOGUEADO: Cerrar detalle y abrir cuestionario oficial de adopción
      closePetDetailModal();
      openAdopcionModal(currentSelectedPet);
    }
  });

  btnDetalleApadrinar?.addEventListener('click', () => {
    closePetDetailModal();
    // Directo al flujo de apadrinamiento con esta mascota ya elegida
    window.location.href = 'apadrinar.html#' + encodeURIComponent(currentSelectedPet?.id || '');
  });

  // =========================================================================
  // MODAL CUESTIONARIO Y ÉXITO
  // =========================================================================
  const modalAdopcion = document.getElementById('modal-adopcion');
  const modalAdopcionTitle = document.getElementById('modal-adopcion-pet-title');
  const btnCloseAdopcion = document.getElementById('btn-close-adopcion');
  const formAdopcion = document.getElementById('form-adopcion-responsable');
  const modalExito = document.getElementById('modal-exito-envio');

  function openAdopcionModal(pet) {
    const petName = typeof pet === 'string' ? pet : (pet?.name || 'Mascota');
    if (modalAdopcionTitle) modalAdopcionTitle.textContent = `Adoptar a ${petName}`;

    // Pre-completar datos si el usuario está logueado
    const currentUser = JSON.parse(localStorage.getItem('callejeros_user') || 'null');
    if (currentUser) {
      const nameInput = document.getElementById('adopt-name');
      const emailInput = document.getElementById('adopt-email');
      if (nameInput && !nameInput.value) nameInput.value = currentUser.name || '';
      if (emailInput && !emailInput.value) emailInput.value = currentUser.email || '';
    }

    modalAdopcion?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeAdopcionModal() {
    modalAdopcion?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  btnCloseAdopcion?.addEventListener('click', closeAdopcionModal);

  function openSuccessModal(title, text) {
    document.getElementById('modal-exito-titulo').textContent = title;
    document.getElementById('modal-exito-texto').textContent = text;
    modalExito?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  // Envío del cuestionario: se guarda la solicitud y un voluntario "responde" a los segundos.
  // Regla de la demo: si la vivienda no es segura (casa abierta, sin patio) se desaprueba,
  // así en la presentación se pueden mostrar los dos resultados del diagrama de flujo.
  formAdopcion?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pet = currentSelectedPet;
    const housing = document.getElementById('adopt-housing').value;
    const solicitud = {
      id: 'sol-' + Date.now(),
      petId: pet?.id || '',
      petName: pet?.name || 'la mascota',
      petImage: pet?.image || '',
      specie: pet?.specie || 'perro',
      applicant: document.getElementById('adopt-name').value.trim(),
      housing,
      createdAt: Date.now(),
      status: 'pendiente'
    };
    const solicitudes = getStoredList('callejeros_solicitudes');
    solicitudes.unshift(solicitud);
    saveStoredList('callejeros_solicitudes', solicitudes);

    scheduleDemoEvent({
      type: 'solicitud',
      solicitudId: solicitud.id,
      result: housing === 'casa_sin_patio' ? 'desaprobada' : 'aprobada'
    });
    pushNotification({
      title: `Recibimos tu solicitud para adoptar a ${solicitud.petName}`,
      text: 'Un voluntario está revisando tu cuestionario. Te avisamos acá cuando haya respuesta.',
      tag: 'Adopción',
      link: `solicitud.html#${solicitud.id}`
    });

    closeAdopcionModal();
    formAdopcion.reset();
    openSuccessModal('¡Datos enviados correctamente!', `Te avisaremos en tus notificaciones si la solicitud para adoptar a ${solicitud.petName} es aceptada.`);
  });

  document.getElementById('btn-modal-ir-inicio')?.addEventListener('click', () => {
    modalExito?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    window.location.href = 'index.html';
  });

  // =========================================================================
  // MODAL PUBLICAR MASCOTA (Con Badge Seleccionable "Casos Urgentes")
  // =========================================================================
  const modalPublicarPet = document.getElementById('modal-publicar-mascota');
  const btnOpenPublishPet = document.getElementById('btn-open-publish-pet');
  const btnClosePublishPet = document.getElementById('btn-close-publish-pet');
  const formPublicarPet = document.getElementById('form-publicar-mascota');
  const pubPhotoFile = document.getElementById('pub-photo-file');
  const pubDropzoneEmpty = document.getElementById('pub-dropzone-empty');
  const pubDropzonePreview = document.getElementById('pub-dropzone-preview');
  const pubPreviewImg = document.getElementById('pub-preview-img');
  const pubPhotoData = document.getElementById('pub-photo-data');

  // Publicar exige cuenta (diagrama de flujo: usuario no registrado → login)
  function openPublishPetModal() {
    if (!getCurrentUser()) {
      openAuthRequiredModal({
        text: 'Para publicar una mascota en adopción es obligatorio ingresar con tu cuenta. Así el equipo puede contactarte para revisar la publicación.',
        redirect: 'adopciones.html#publicar'
      });
      return;
    }
    modalPublicarPet?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  btnOpenPublishPet?.addEventListener('click', openPublishPetModal);

  // Acceso directo desde el menú hamburguesa ("Publicar" → adopciones.html#publicar)
  function openPublishFromHash() {
    if (window.location.hash !== '#publicar') return;
    history.replaceState(null, '', window.location.pathname + window.location.search);
    openPublishPetModal();
  }
  window.addEventListener('hashchange', openPublishFromHash);
  openPublishFromHash();

  function closePublishPetModal() {
    modalPublicarPet?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  btnClosePublishPet?.addEventListener('click', closePublishPetModal);

  // Subida y preview de foto para publicar mascota
  pubPhotoFile?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      pubPreviewImg.src = event.target.result;
      pubPhotoData.value = event.target.result;
      pubDropzoneEmpty.classList.add('hidden');
      pubDropzonePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  });

  formPublicarPet?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('pub-name').value.trim();
    const specie = document.getElementById('pub-specie').value;
    const sex = document.getElementById('pub-sex').value;
    const age = document.getElementById('pub-age').value.trim();
    const isCastrado = document.querySelector('input[name="pub-castrado"]:checked')?.value === 'true';
    const isSociable = document.querySelector('input[name="pub-sociable"]:checked')?.value === 'true';
    // Badge seleccionable "Casos Urgentes"
    const isUrgent = document.getElementById('pub-pet-urgent')?.checked || false;
    const desc = document.getElementById('pub-desc').value.trim();
    const image = pubPhotoData.value || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80';

    const newPet = {
      id: 'custom-' + Date.now(),
      name,
      specie,
      sex,
      age,
      ageYears: parseInt(age) || 1,
      castrado: isCastrado,
      sociable: isSociable,
      urgent: isUrgent,
      image,
      description: desc,
      salud: {
        estado: 'Bajo evaluación y cuidado voluntario',
        vacunas: 'En plan de vacunación',
        parasitos: 'Desparasitado',
        pulgas: 'Pipeta aplicada',
        otros: isUrgent ? 'Requiere tránsito urgente' : 'Salud estable'
      },
      notas: isUrgent
        ? '🚨 CASO URGENTE: Publicado con prioridad comunitaria para tránsito o adopción inmediata.'
        : 'Publicado por la comunidad de Callejeros R4 para adopción responsable.'
    };

    // El teléfono queda para los voluntarios; no se muestra en el catálogo
    newPet.contact = document.getElementById('pub-contact').value.trim();

    // No se publica directo: queda pendiente y un voluntario la aprueba a los segundos (demo)
    scheduleDemoEvent({ type: 'publicacion', pet: newPet });
    pushNotification({
      title: `Tu publicación de ${name} está en revisión`,
      text: 'Un voluntario la va a revisar antes de que aparezca en el catálogo. Te avisamos acá.',
      tag: 'Publicación'
    });

    closePublishPetModal();
    formPublicarPet.reset();
    pubPhotoData.value = '';
    pubDropzonePreview.classList.add('hidden');
    pubDropzoneEmpty.classList.remove('hidden');

    openSuccessModal('¡Publicación enviada!', `Un voluntario va a revisar la publicación de ${name}. Cuando la apruebe, aparece en el catálogo y te avisamos en tus notificaciones.`);
  });

  // Cuando un evento demo se resuelve (ej. publicación aprobada), actualizar el catálogo
  window.addEventListener('callejeros:datos', renderPets);

  renderPets();
});
