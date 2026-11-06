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
      // Filtro de favoritos sin ninguno guardado: estado vacío propio (no es un error de filtros)
      if (activeFilterOnlyFavs && favorites.length === 0) {
        petsGrid.innerHTML = `
          <div class="col-span-full py-16 text-center text-slate-500 dark:text-slate-400 space-y-3">
            <span class="text-4xl block" aria-hidden="true">🤍</span>
            <p class="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-200">Todavía no tenés favoritos</p>
            <p class="text-xs sm:text-sm max-w-sm mx-auto">Tocá el ❤️ en las mascotas que te gusten para guardarlas y encontrarlas rápido acá.</p>
            <button type="button" id="btn-quick-reset" class="inline-flex items-center justify-center min-h-[44px] px-5 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-sm transition-all">
              Ver mascotas en adopción
            </button>
          </div>
        `;
        document.getElementById('btn-quick-reset')?.addEventListener('click', resetAllFilters);
        return;
      }
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
        window.location.href = 'mascota.html#' + encodeURIComponent(card.getAttribute('data-id'));
      });
    });

    // Listeners de favoritos
    petsGrid.querySelectorAll('.btn-toggle-fav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(btn.getAttribute('data-id'));
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
    if (!activeFilterOnlyFavs) clearFavoritesHash();

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
    clearFavoritesHash();

    renderPets();
  }

  btnResetFilters?.addEventListener('click', resetAllFilters);

  // Acceso directo desde Mi Cuenta ("Favoritos" → adopciones.html#favoritos).
  // El #favoritos queda en la URL para que al volver de una ficha siga el filtro;
  // se borra al limpiar o quitar el filtro.
  function clearFavoritesHash() {
    if (window.location.hash === '#favoritos') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  function applyFavoritesFromHash() {
    if (window.location.hash !== '#favoritos') return;
    activeFilterOnlyFavs = true;
    if (filterOnlyFavs) filterOnlyFavs.checked = true;
    renderPets();
  }
  window.addEventListener('hashchange', applyFavoritesFromHash);
  applyFavoritesFromHash();

  // =========================================================================
  // FICHA DE MASCOTA: ahora es una página propia (mascota.html#id, js/mascota.js),
  // con carrusel de fotos e info desplegable fiel a Figma. Los modales compartidos
  // (sesión requerida y éxito) y los favoritos están en js/main.js.
  // =========================================================================

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
  // Contador de la descripción (máximo 400 caracteres para que la ficha se lea bien)
  const pubDesc = document.getElementById('pub-desc');
  const pubDescCount = document.getElementById('pub-desc-count');
  function updateDescCount() {
    if (!pubDesc || !pubDescCount) return;
    const max = parseInt(pubDesc.getAttribute('maxlength'), 10) || 400;
    const len = pubDesc.value.length;
    pubDescCount.textContent = len + ' / ' + max;
    pubDescCount.classList.toggle('text-orange-600', len >= max - 40);
  }
  pubDesc?.addEventListener('input', updateDescCount);
  formPublicarPet?.addEventListener('reset', () => setTimeout(updateDescCount, 0));

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
