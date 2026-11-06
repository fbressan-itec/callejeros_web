// =========================================================================
// FICHA DE MASCOTA — CALLEJEROS RÍO CUARTO (mascota.html#id)
// Página completa fiel a Figma ("Detalle de mascota" + "Info desplegable"):
// carrusel de fotos con degradado y resumen, sistema de badges, padrinos,
// info desplegable (Descripción / Estado de salud / Notas), ¡Adoptame! con
// validación de sesión y cuestionario de adopción.
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('pet-content');
  const nameEl = document.getElementById('pet-name');
  const favBtn = document.getElementById('btn-pet-fav');
  const favIcon = document.getElementById('pet-fav-icon');
  let pet = null;

  function getAllPets() {
    return [...getStoredList('callejeros_custom_pets'), ...samplePets];
  }

  // ---------------------------------------------------------------------
  // Piezas de la ficha
  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  // INSIGNIAS (badges): solo ícono SVG, de un vistazo. El significado aparece
  // al pasar el mouse (title), al tocar o al llegar con el teclado, en la línea
  // de abajo de la caja (no en un globito flotante, que en el celular se corta
  // en los bordes de la pantalla). Se usan SVG y no emojis porque el mismo
  // ícono cambia de color según el dato (los emojis no se pueden pintar).
  // Las badges se calculan desde los datos de la mascota: nadie las elige a
  // mano (ver comentario en js/data.js para el back end).
  // ---------------------------------------------------------------------
  const TONES = {
    neutral: 'bg-white border-slate-300 text-slate-700 dark:bg-slate-700 dark:border-slate-500 dark:text-slate-100',
    sky: 'bg-sky-100 border-sky-300 text-sky-700 dark:bg-sky-950/60 dark:border-sky-800 dark:text-sky-300',
    pink: 'bg-pink-100 border-pink-300 text-pink-700 dark:bg-pink-950/60 dark:border-pink-800 dark:text-pink-300',
    orange: 'bg-orange-100 border-orange-300 text-orange-700 dark:bg-orange-950/60 dark:border-orange-800 dark:text-orange-300',
    green: 'bg-emerald-100 border-emerald-300 text-emerald-700 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-300',
    amber: 'bg-amber-100 border-amber-300 text-amber-700 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-300',
    gray: 'bg-slate-200 border-slate-300 text-slate-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-400',
    blue: 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-300',
    urgent: 'bg-rose-600 border-rose-700 text-white dark:border-rose-400'
  };

  // Íconos de línea (24x24, trazo 2), dibujados a mano para no depender de librerías
  const ICONS = {
    perro: '<path d="M8 6.5a4 4 0 0 1 8 0V12a4 4 0 0 1-8 0z"/><path d="M8 7 4.5 5.5v6L8 13M16 7l3.5-1.5v6L16 13"/><path d="M11 13.5h2l-1 1.2z"/><path d="M10 10h.01M14 10h.01"/>',
    gato: '<path d="M5 10V4l4 3h6l4-3v6a7 7 0 1 1-14 0z"/><path d="M9.5 12h.01M14.5 12h.01"/><path d="M11 15h2l-1 1z"/>',
    macho: '<circle cx="10" cy="14" r="5"/><path d="M13.5 10.5 19 5M15 5h4v4"/>',
    hembra: '<circle cx="12" cy="9" r="5"/><path d="M12 14v7M9 18h6"/>',
    sociable: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14a4 4 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    salvaje: '<circle cx="12" cy="12" r="9"/><path d="M8.5 15.5h7"/><path d="m7.5 8 3 1.5M16.5 8l-3 1.5"/>',
    ninos: '<circle cx="9" cy="7" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1"/><circle cx="17.5" cy="11" r="2"/><path d="M14.5 20v-.5a3 3 0 0 1 6 0v.5"/>',
    animales: '<ellipse cx="12" cy="16" rx="4" ry="3.5"/><circle cx="6.5" cy="10.5" r="1.7"/><circle cx="10" cy="6.5" r="1.7"/><circle cx="14" cy="6.5" r="1.7"/><circle cx="17.5" cy="10.5" r="1.7"/>',
    castrado: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1 20 20M8.1 15.9 20 4"/>',
    sinCastrar: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1 20 20M8.1 15.9 20 4"/><path d="M3 21 21 3" stroke-width="2.5"/>',
    urgente: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    salud: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/>'
  };

  // Edad: barras de nivel (1 = cachorro, 2 = adulto, 3 = senior)
  function ageIcon(group) {
    const filled = { cachorro: 1, adulto: 2, senior: 3 }[group];
    const bars = [[4, 14, 6], [10, 10, 10], [16, 5, 15]];
    return bars.map(([x, y, h], i) =>
      `<rect x="${x}" y="${y}" width="4" height="${h}" rx="1" ${i < filled ? 'fill="currentColor"' : ''}/>`
    ).join('');
  }

  const COEXIST = { si: 'green', no: 'amber', sin_evaluar: 'gray' };

  function getPetBadges(p) {
    const hembra = p.sex === 'hembra';
    const group = getAgeGroup(getPetYears(p));
    const ninos = p.conNinos || 'sin_evaluar';
    const animales = p.conAnimales || 'sin_evaluar';
    const coexistText = (value, who, si, no) => value === 'si' ? si
      : value === 'no' ? no
      : `Con ${who}: sin evaluar todavía. Consultá con el rescatista.`;
    const ageRanges = { cachorro: 'menos de 1 año', adulto: 'de 1 a 7 años', senior: 'más de 7 años' };

    const badges = [];
    // Urgente y salud: solo si corresponde
    if (p.urgent) badges.push({ tone: 'urgent', icon: ICONS.urgente, text: 'Caso urgente: su tránsito vence pronto o necesita atención prioritaria.' });
    badges.push(
      { tone: 'neutral', icon: p.specie === 'gato' ? ICONS.gato : ICONS.perro, text: p.specie === 'gato' ? 'Gato' : 'Perro' },
      { tone: hembra ? 'pink' : 'sky', icon: hembra ? ICONS.hembra : ICONS.macho, text: hembra ? 'Hembra' : 'Macho' },
      { tone: 'orange', icon: ageIcon(group), text: `${AGE_GROUPS[group]} (${ageRanges[group]}): ${p.age}` },
      p.sociable
        ? { tone: 'green', icon: ICONS.sociable, text: 'Sociable: se lleva bien con las personas.' }
        : { tone: 'amber', icon: ICONS.salvaje, text: 'Salvaje: necesita un acercamiento cuidadoso y paciencia. Consultá con el rescatista.' },
      // Con niños y con animales: mismo ícono, el color dice el dato (verde sí · ámbar no · gris sin evaluar)
      { tone: COEXIST[ninos], icon: ICONS.ninos, text: coexistText(ninos, 'niños', 'Sociable con niños.', 'No es sociable con niños: mejor un hogar sin chicos.') },
      { tone: COEXIST[animales], icon: ICONS.animales, text: coexistText(animales, 'otros animales', 'Sociable con otros animales.', 'No es sociable con otros animales: mejor un hogar donde sea el único.') },
      p.castrado
        ? { tone: 'green', icon: ICONS.castrado, text: hembra ? 'Castrada' : 'Castrado' }
        : { tone: 'amber', icon: ICONS.sinCastrar, text: 'Sin castrar: se entrega con compromiso de castración.' }
    );
    if (p.cuidadoEspecial) badges.push({ tone: 'blue', icon: ICONS.salud, text: `Necesita cuidados de salud: ${p.cuidadoEspecial}` });
    return badges;
  }

  function badgesSection(p) {
    const items = getPetBadges(p).map(b => `
      <li>
        <button type="button" class="pet-badge w-12 h-12 rounded-full border-2 flex items-center justify-center ${TONES[b.tone]} active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800" title="${escapeHtml(b.text)}" aria-label="${escapeHtml(b.text)}" data-text="${escapeHtml(b.text)}">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">${b.icon}</svg>
        </button>
      </li>`).join('');
    // Caja gris sin título (en Figma "Sistema de Badges" era solo una guía)
    return `
      <section class="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700" aria-label="Resumen de ${escapeHtml(p.name)}">
        <ul class="flex flex-wrap justify-center gap-2">${items}</ul>
        <p id="pet-badge-caption" class="mt-2 min-h-[2.5rem] flex items-center justify-center text-center text-xs font-semibold text-slate-600 dark:text-slate-300" aria-live="polite">Tocá una insignia para ver qué significa</p>
      </section>`;
  }

  function setupBadges() {
    const caption = document.getElementById('pet-badge-caption');
    const all = document.querySelectorAll('.pet-badge');
    all.forEach(btn => {
      const show = () => {
        caption.textContent = btn.dataset.text;
        all.forEach(b => b.classList.toggle('ring-2', b === btn));
        all.forEach(b => b.classList.toggle('ring-orange-500', b === btn));
      };
      btn.addEventListener('click', show);
      btn.addEventListener('mouseenter', show);
      btn.addEventListener('focus', show);
    });
  }

  // Fila de convivencia en "Descripción": Sí / No / Sin evaluar con el mismo color que la badge
  function coexistRow(label, value) {
    const pills = {
      si: '<span class="px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">✓ Sí</span>',
      no: '<span class="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">✗ No</span>',
      sin_evaluar: '<span class="px-2 py-0.5 rounded-md text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">? Sin evaluar</span>'
    };
    return `
      <div class="flex justify-between items-center gap-3 py-1 border-b border-slate-100 dark:border-slate-700/60 last:border-0">
        <span class="text-slate-500 dark:text-slate-400">${label}</span>
        ${pills[value] || pills.sin_evaluar}
      </div>`;
  }

  // Desplegable cerrado por defecto (Figma "Info desplegable")
  function accordion(title, icon, inner) {
    return `
      <details class="group scroll-mt-36 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-soft">
        <summary class="flex items-center justify-between gap-3 min-h-[56px] px-4 py-3 cursor-pointer list-none font-display font-bold text-base text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl">
          <span class="flex items-center gap-2"><span aria-hidden="true">${icon}</span>${title}</span>
          <svg class="w-5 h-5 flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </summary>
        <div class="px-4 pb-4 text-sm text-slate-700 dark:text-slate-200 space-y-1">${inner}</div>
      </details>`;
  }

  function row(label, value) {
    return `
      <div class="flex justify-between gap-3 py-1 border-b border-slate-100 dark:border-slate-700/60 last:border-0">
        <span class="text-slate-500 dark:text-slate-400">${label}</span>
        <span class="font-bold text-right text-slate-900 dark:text-white">${escapeHtml(value)}</span>
      </div>`;
  }

  function updateFavIcon() {
    const isFav = getFavorites().includes(pet.id);
    favIcon.classList.toggle('fill-red-500', isFav);
    favIcon.classList.toggle('text-red-500', isFav);
    favIcon.classList.toggle('fill-none', !isFav);
    favBtn.setAttribute('aria-pressed', String(isFav));
    favBtn.setAttribute('aria-label', isFav ? `Quitar a ${pet.name} de favoritos` : `Guardar a ${pet.name} en favoritos`);
  }

  // ---------------------------------------------------------------------
  // Render de la ficha
  // ---------------------------------------------------------------------
  function render() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    pet = getAllPets().find(p => p.id === id) || null;

    if (!pet) {
      nameEl.textContent = 'Mascota';
      favBtn.classList.add('hidden');
      content.innerHTML = `
        <div class="py-16 text-center space-y-3">
          <span class="text-4xl block" aria-hidden="true">🐾</span>
          <h2 class="font-display font-bold text-xl text-slate-900 dark:text-white">No encontramos esta mascota</h2>
          <p class="text-sm text-slate-600 dark:text-slate-300">Puede que ya haya sido adoptada. ¡Hay muchos más esperando!</p>
          <a href="adopciones.html" class="inline-flex items-center justify-center min-h-[44px] px-5 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all">Ver el catálogo</a>
        </div>`;
      return;
    }

    document.title = `${pet.name} — Adoptá un Callejero — Callejeros Río Cuarto`;
    nameEl.textContent = pet.name;
    favBtn.classList.remove('hidden');
    updateFavIcon();

    const photos = (pet.images && pet.images.length ? pet.images : [pet.image]);
    const multi = photos.length > 1;
    const salud = pet.salud || {
      estado: 'Sano y bajo control veterinario', vacunas: 'Plan de vacunación iniciado',
      parasitos: 'Desparasitado', pulgas: 'Pipeta al día', otros: 'Sin complicaciones detectadas'
    };
    const padrinos = getPadrinosCount(pet);
    const sexLabel = pet.sex === 'hembra' ? 'Hembra' : 'Macho';

    content.innerHTML = `
      <!-- CARRUSEL DE FOTOS: se desliza con el dedo; degradado fijo con resumen siempre legible -->
      <section class="relative rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-soft h-[380px] sm:h-[460px]" aria-roledescription="carrusel" aria-label="Fotos de ${escapeHtml(pet.name)}">
        <div id="pet-gallery" class="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth">
          ${photos.map((src, i) => `
            <img src="${escapeHtml(src)}" alt="Foto ${i + 1} de ${photos.length} de ${escapeHtml(pet.name)}" class="w-full h-full flex-shrink-0 snap-center object-cover" ${i > 0 ? 'loading="lazy"' : ''}>
          `).join('')}
        </div>

        ${multi ? `
          <span id="pet-photo-counter" class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-slate-950/70 backdrop-blur-sm pointer-events-none">1 / ${photos.length}</span>
          <button type="button" id="pet-photo-prev" class="hidden sm:flex absolute left-3 top-1/3 min-w-[44px] min-h-[44px] items-center justify-center rounded-full bg-slate-950/60 hover:bg-slate-950/80 text-white backdrop-blur-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" aria-label="Foto anterior">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button type="button" id="pet-photo-next" class="hidden sm:flex absolute right-3 top-1/3 min-w-[44px] min-h-[44px] items-center justify-center rounded-full bg-slate-950/60 hover:bg-slate-950/80 text-white backdrop-blur-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" aria-label="Foto siguiente">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        ` : ''}

        <!-- Degradado fijo (opción A): solo el resumen de la descripción, siempre legible.
             Las etiquetas (sociable, urgente, edad, sexo) están en el Sistema de Badges de abajo. -->
        <div class="absolute inset-x-0 bottom-0 pt-20 p-5 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent pointer-events-none">
          <p id="pet-summary" class="text-sm text-white leading-relaxed line-clamp-2">${escapeHtml(pet.description)}</p>
          <!-- Solo aparece si el resumen no entra en 2 líneas: abre "Descripción" con el texto completo -->
          <button type="button" id="btn-pet-more" class="hidden pointer-events-auto mt-1 min-h-[44px] -mb-3 text-sm font-bold text-orange-300 hover:text-orange-200 underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded">
            Ver más
          </button>
        </div>
      </section>

      ${multi ? `
        <!-- Puntitos del carrusel (botones táctiles de 44px) -->
        <div class="flex justify-center -mt-2" role="group" aria-label="Elegir foto">
          ${photos.map((_, i) => `
            <button type="button" class="pet-dot min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-full" data-index="${i}" aria-label="Ver foto ${i + 1}">
              <span class="block h-2.5 rounded-full transition-all ${i === 0 ? 'w-8 bg-orange-500' : 'w-2.5 bg-slate-300 dark:bg-slate-600'}"></span>
            </button>`).join('')}
        </div>
      ` : ''}

      <!-- INSIGNIAS (Figma: "Sistema de Badges") -->
      ${badgesSection(pet)}

      <!-- Menciones a padrinos (diagrama de flujo) -->
      <div class="flex items-center gap-3 p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/60">
        <span class="text-2xl" aria-hidden="true">💛</span>
        <p class="flex-1 text-sm text-slate-700 dark:text-slate-200">${padrinos > 0
          ? `${escapeHtml(pet.name)} tiene ${padrinos} padrino${padrinos === 1 ? '' : 's'} que cubren su alimento y cuidados.`
          : `${escapeHtml(pet.name)} todavía no tiene padrinos. ¡Podés ser el primero!`}</p>
      </div>

      <!-- INFO DESPLEGABLE (Figma): cerrados, se abren de a uno -->
      <section class="space-y-3" aria-label="Información de ${escapeHtml(pet.name)}">
        ${accordion('Descripción', '📖', `
          <p class="leading-relaxed pb-2">${escapeHtml(pet.description)}</p>
          ${row('Edad', `${pet.age} · ${AGE_GROUPS[getAgeGroup(getPetYears(pet))]}`)}
          ${row('Sexo', sexLabel)}
          ${row('Castración', pet.castrado ? 'Castrado' : 'No castrado')}
          ${row('Sociabilidad', pet.sociable ? 'Sociable' : 'Salvaje')}
          ${coexistRow('Con niños', pet.conNinos)}
          ${coexistRow('Con otros animales', pet.conAnimales)}
        `)}
        ${accordion('Estado de salud', '🩺', `
          ${row('Estado clínico', salud.estado)}
          ${row('Vacunas', salud.vacunas)}
          ${row('Parásitos', salud.parasitos)}
          ${row('Pulgas / garrapatas', salud.pulgas)}
          ${row('Otros', salud.otros)}
          ${pet.cuidadoEspecial ? row('Cuidado especial', pet.cuidadoEspecial) : ''}
        `)}
        ${accordion('Notas', '📝', `
          <p class="leading-relaxed">${escapeHtml(pet.notas || 'Animalito muy dócil que requiere cariño, seguimiento de vacunas y compromiso de tenencia responsable.')}</p>
        `)}
      </section>

      <!-- ACCIONES (Figma: "¡Adoptame!" + "Donaciones y Apadrinamiento") -->
      <div class="space-y-2 pt-1">
        <button type="button" id="btn-pet-adopt" class="w-full min-h-[52px] rounded-2xl font-display font-bold text-base text-white bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-lg shadow-orange-500/30 transition-all">
          ¡Adoptame!
        </button>
        <a href="apadrinar.html#${encodeURIComponent(pet.id)}" class="flex items-center justify-center w-full min-h-[44px] rounded-2xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all">
          Donaciones y Apadrinamiento
        </a>
        <button type="button" id="btn-pet-share" class="flex items-center justify-center gap-2 w-full min-h-[44px] rounded-2xl font-bold text-sm text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          📤 Compartir a ${escapeHtml(pet.name)}
        </button>
      </div>
    `;

    setupGallery(photos.length);
    setupSeeMore();
    setupBadges();
    document.getElementById('btn-pet-adopt').addEventListener('click', onAdopt);
    document.getElementById('btn-pet-share').addEventListener('click', onShare);
  }

  // ---------------------------------------------------------------------
  // Carrusel: deslizar (scroll-snap nativo), puntitos, contador y flechas en desktop
  // ---------------------------------------------------------------------
  function setupGallery(count) {
    if (count < 2) return;
    const gallery = document.getElementById('pet-gallery');
    const counter = document.getElementById('pet-photo-counter');
    const dots = document.querySelectorAll('.pet-dot');
    const goTo = i => gallery.scrollTo({ left: i * gallery.clientWidth, behavior: 'smooth' });
    const current = () => Math.round(gallery.scrollLeft / gallery.clientWidth);

    gallery.addEventListener('scroll', () => {
      const i = current();
      if (counter) counter.textContent = `${i + 1} / ${count}`;
      dots.forEach((dot, d) => {
        const bar = dot.firstElementChild;
        bar.classList.toggle('w-8', d === i);
        bar.classList.toggle('bg-orange-500', d === i);
        bar.classList.toggle('w-2.5', d !== i);
        bar.classList.toggle('bg-slate-300', d !== i);
        bar.classList.toggle('dark:bg-slate-600', d !== i);
        dot.setAttribute('aria-current', d === i ? 'true' : 'false');
      });
    }, { passive: true });

    dots.forEach(dot => dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index, 10))));
    document.getElementById('pet-photo-prev')?.addEventListener('click', () => goTo(Math.max(0, current() - 1)));
    document.getElementById('pet-photo-next')?.addEventListener('click', () => goTo(Math.min(count - 1, current() + 1)));
  }

  // "Ver más": solo si la descripción se corta; abre el desplegable "Descripción" y lleva hasta ahí
  function setupSeeMore() {
    const summary = document.getElementById('pet-summary');
    const more = document.getElementById('btn-pet-more');
    if (!summary || !more) return;
    more.classList.toggle('hidden', summary.scrollHeight <= summary.clientHeight + 1);
    more.addEventListener('click', () => {
      const desc = document.querySelector('#pet-content details');
      if (!desc) return;
      desc.open = true;
      desc.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ---------------------------------------------------------------------
  // Favorito, compartir y ¡Adoptame!
  // ---------------------------------------------------------------------
  favBtn.addEventListener('click', () => {
    if (!pet) return;
    toggleFavorite(pet.id);
    updateFavIcon();
  });

  function onShare() {
    const url = window.location.href;
    const text = `Conocé a ${pet.name}, busca una familia en Río Cuarto 🐾`;
    if (navigator.share) {
      navigator.share({ title: `${pet.name} — Callejeros Río Cuarto`, text, url }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank', 'noopener');
    }
  }

  // Validación de sesión obligatoria antes del cuestionario (ADR-019)
  function onAdopt() {
    if (!getCurrentUser()) {
      openAuthRequiredModal({
        text: `Para postularte a la adopción responsable de ${pet.name} es obligatorio ingresar con tu cuenta. Así podremos ponernos en contacto para coordinar la entrevista y el seguimiento.`,
        redirect: `mascota.html#${pet.id}`
      });
      return;
    }
    openAdopcionModal();
  }

  // ---------------------------------------------------------------------
  // Cuestionario de adopción y respuesta simulada
  // ---------------------------------------------------------------------
  const modalAdopcion = document.getElementById('modal-adopcion');
  const formAdopcion = document.getElementById('form-adopcion-responsable');

  function openAdopcionModal() {
    document.getElementById('modal-adopcion-pet-title').textContent = `Adoptar a ${pet.name}`;
    const user = getCurrentUser();
    const nameInput = document.getElementById('adopt-name');
    const emailInput = document.getElementById('adopt-email');
    if (user && nameInput && !nameInput.value) nameInput.value = user.name || '';
    if (user && emailInput && !emailInput.value) emailInput.value = user.email || '';
    modalAdopcion?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeAdopcionModal() {
    modalAdopcion?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  document.getElementById('btn-close-adopcion')?.addEventListener('click', closeAdopcionModal);

  // Se guarda la solicitud y un voluntario "responde" a los segundos (js/main.js).
  // Regla de la demo: casa abierta sin patio → desaprobada; el resto → aprobada.
  // Solo maquetado: con back end, "Tipo de Vivienda" es un campo libre y la aprobación la decide un moderador / admin.
  formAdopcion?.addEventListener('submit', (e) => {
    e.preventDefault();
    const housing = document.getElementById('adopt-housing').value;
    const solicitud = {
      id: 'sol-' + Date.now(),
      petId: pet.id,
      petName: pet.name,
      petImage: pet.image,
      specie: pet.specie,
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
      title: `Recibimos tu solicitud para adoptar a ${pet.name}`,
      text: 'Un voluntario está revisando tu cuestionario. Te avisamos acá cuando haya respuesta.',
      tag: 'Adopción',
      link: `solicitud.html#${solicitud.id}`
    });

    closeAdopcionModal();
    formAdopcion.reset();
    openSuccessModal('¡Datos enviados correctamente!', `Te avisaremos en tus notificaciones si la solicitud para adoptar a ${pet.name} es aceptada.`);
  });

  render();
  window.addEventListener('hashchange', render);
});
