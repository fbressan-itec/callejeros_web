# Registro de Decisiones de Arquitectura (ADR) — Callejeros R4

> ⚠️ **REGLA DE GUARDIA MANDATORIA**: Si una propuesta o requerimiento implica un cambio importante o estructural (alteración de la arquitectura SPA, modificación de la paleta semántica, cambio de framework, o borrado/refactor mayor de archivos), **Antigravity DEBE solicitar autorización explícita al usuario antes de ejecutarlo**, y registrarlo cronológicamente a continuación una vez aprobado.

---

### [ADR-001] · [2026-10-31 17:58] — Adopción del Protocolo Gentle-AI y Reglas Globales
* **Contexto**: Necesidad de un sistema operativo de ingeniería riguroso, centrado en el usuario y con estándares de calidad Senior.
* **Decisión**: Integrar el protocolo Gentle-AI con sus 6 reglas mandatorias (Senior Product Engineer, SPA/Tailwind/HTML5, DoD estricto, Guards en `docs/contexto/`, Master Context vivo y SDD adaptativo).

### [ADR-002] · [2026-10-31 18:15] — Nombre del Proyecto y Cuatro Pilares Fundamentales
* **Contexto**: Definición de la identidad comunitaria y alcance del producto en Río Cuarto.
* **Decisión**: Nombrar la plataforma "Callejeros Río Cuarto (Callejeros RIV / R4)" resolviendo 4 pilares: Adopciones Responsables, Alerta Callejeros Geolocalizada, Financiamiento Solidario y Difusión/Educación.

### [ADR-003] · [2026-10-31 18:43] — Arquetipos de Usuario y Puntos de Dolor
* **Contexto**: Diseñar pensando en perfiles humanos reales con limitaciones específicas.
* **Decisión**: Priorizar tres proto-personas: Juan (Alertador móvil con necesidad de reporte en 2 clics), Mirta (Adoptante reflexiva que busca badges de salud y compatibilidad) y Roberto (Gestor de refugio que requiere centralización de difusión).

### [ADR-004] · [2026-10-31 18:52] — Arquitectura Mobile-First, FAB Persistente y Layout Figma
* **Contexto**: El wireframe de Figma define un flujo vertical para smartphones.
* **Decisión**: Adoptar estructura Mobile-First con Navbar fija, carrusel y bloques Hero secuenciales. Incorporar un Floating Action Button (FAB) en esquina inferior derecha con atenuación por inactividad para acceso rápido a "Alerta Callejeros".

### [ADR-005] · [2026-10-31 19:09] — Anatomía de Tarjetas y Protección de Privacidad por Diseño
* **Contexto**: Estructuración de fichas de adopción y seguridad de refugios y hogares de tránsito.
* **Decisión**: Tarjetas con hover elevador, badge de sociabilidad (verde/rojo), botón de favoritos con corazón activo en rojo y omisión deliberada de la ubicación física exacta de la mascota para proteger al animal y al cuidador.

### [ADR-006] · [2026-10-31 19:14] — Cuestionario de Adopción y Modal de Éxito con Overlay
* **Contexto**: Reducción de fatiga al postularse y cierre claro de la transacción.
* **Decisión**: Estructurar el formulario en 3 áreas (Contacto, Entorno, Tenencia) y desplegar un modal emergente con overlay semitransparente, checkmark circular afirmativo y botón directo "Ir al inicio".

### [ADR-007] · [2026-10-31 19:15] — Paleta Semántica y Soporte de Modo Claro / Oscuro
* **Contexto**: Identidad visual empática y contraste accesible WCAG AA.
* **Decisión**: Naranja Amigable `#F97316` (CTA principal), Verde Botánico `#10B981` (bienestar), badges semánticos (Verde, Rojo, Azul) y toggle Dark/Light Mode en Navbar guardado en LocalStorage.

### [ADR-008] · [2026-10-31 19:16] — Tipografía Modular Poppins/Inter y Regla de 16px en Inputs
* **Contexto**: Jerarquía visual legible en pantallas táctiles y prevención de fallos de zoom.
* **Decisión**: Poppins/Outfit para títulos y botones; Inter/Plus Jakarta Sans para cuerpo y formularios. Fijar estrictamente 16px como tamaño base para prevenir auto-zoom en iOS Safari.

### [ADR-009] · [2026-10-31 19:18] — Grilla Adaptativa Elástica y Control de Desbordamiento
* **Contexto**: Visualización consistente entre móviles y monitores amplios.
* **Decisión**: 2 columnas de tarjetas en celular (conmutables a 1), escalando a 2-3 en tablet y 3-4 en desktop. Uso mandatorio de `overflow-x: hidden` en el contenedor principal para erradicar desplazamientos horizontales.

### [ADR-010] · [2026-10-31 19:19] — Matriz Mandatoria de los 5 Estados de Interacción
* **Contexto**: Feedback táctil constante y soporte de accesibilidad universal.
* **Decisión**: Estilizar rigurosamente los estados Default, Hover (`-translate-y-1`), Active (`scale-95` y corazón rojo), Focus (`ring-2 ring-orange-500`) y Disabled (`opacity-50` y bloqueo) en cada control interactivo.

### [ADR-011] · [2026-10-31 19:24] — Selección de Tailwind CSS v3 Utility-First
* **Contexto**: Rapidez de maquetado e iteración directa en el marcado HTML sin CSS disperso.
* **Decisión**: Utilizar Tailwind CSS v3 vía CDN con configuración extendida para maquetado modular, responsive y modo oscuro instantáneo.

### [ADR-012] · [2026-10-31 19:25] — Delimitación Estricta de Alcance Técnico (MVP v1.0)
* **Contexto**: Pragmatismo y foco en entrega rápida evitando sobre-ingeniería o costos externos.
* **Decisión**: Aplicación SPA 100% Client-Side. Google Maps funcional (**In-Scope**). Pasarelas de pago y notificaciones por WhatsApp/mail restringidas a maquetación y demostración visual (**Out-of-Scope**).

### [ADR-013] · [2026-10-31 19:31] — Definición de Criterios de Éxito y Listo (DoD)
* **Contexto**: Asegurar calidad técnica y de experiencia de usuario antes de dar por terminada una fase.
* **Decisión**: Adoptar matriz DoD de 4 dimensiones: Usabilidad UX, Calidad UI, Responsividad Mobile-First (touch targets >= 44px) y Funcionalidad del mapa.

### [ADR-014] · [2026-10-31 19:32] — Metodología Incremental Mobile-First por Rutas
* **Contexto**: Orden secuencial de desarrollo para no dispersar esfuerzos.
* **Decisión**: Trabajar incrementalmente: Shell Base ➔ Ruta 1 (Home) ➔ Ruta 2 (Adoptá) ➔ Ruta 3 (Alerta) ➔ Rutas 4 a 10. Cada sección se prueba primero en móvil antes de escalar a desktop.

### [ADR-015] · [2026-11-01 18:43] — Implementación de la Home Fiel a Wireframe de Figma (Fase 1)
* **Contexto**: Ingesta visual de `boceto_home_mobile.png` y `boceto_menu-hamburguesa_mobile.png` para maquetar el software vivo de la portada.
* **Decisión**: Maquetar la Home completa en `index.html` con Navbar fija (touch targets >= 44px), Drawer lateral categorizado con estado de usuario, Hero carrusel dinámico, 3 bloques Hero secuenciales (Adopciones con preview Gestalt, Quiénes Somos con valores, y Quiero Colaborar con vías solidarias), FAB persistente con atenuación por inactividad y Footer institucional, cumpliendo WCAG AA y los 5 estados de interacción.

### [ADR-016] · [2026-11-01 19:26] — Confirmación de Arquitectura Frontend SPA (Opción A) y Roadmap de Backend Futuro
* **Contexto**: El usuario solicitó avanzar con los flujos de Adopción y Login, consultando sobre la creación de un backend y base de datos.
* **Decisión**: Se ratifica la **Opción A**: mantener el desarrollo 100% Client-Side SPA para el MVP v1.0, aprovechando el servicio de persistencia en `LocalStorage` y mocks estructurados para validar completamente el diseño y la experiencia de usuario. Se establece en el roadmap técnico que, una vez finalizado y aprobado el frontend con diseño de alta calidad, se procederá a implementar un backend independiente según especificaciones formales que se definirán oportunamente.
* **Consecuencias**: Velocidad de maquetado e iteración visual máxima sin dependencias de infraestructura ni procesos de servidor durante esta etapa de diseño.

### [ADR-017] · [2026-11-01 19:40] — Reorganización Modular en Páginas HTML Dedicadas (Arquitectura Multi-Página Limpia)
* **Contexto**: Al concentrar todas las vistas en un único `index.html` con enrutador hash, las rutas que no contaban con contenedor renderizado rompían la visualización dejando la pantalla en blanco y dificultaban la navegación nativa en navegadores locales.
* **Decisión**: Por instrucción explícita del usuario, se reorganiza el proyecto desacoplando cada ruta en su propio archivo HTML semántico e independiente (`index.html`, `adopciones.html`, `quienes-somos.html`, `alerta.html`, `notificaciones.html`, `login.html`, `registro.html`, `donaciones.html`, `noticias.html`, `adopcion-responsable.html`, `tienda.html`).
* **Lógica Compartida**: Se extrae la lógica transversal en módulos limpios de JavaScript (`js/data.js`, `js/main.js`, `js/adopciones.js`, `js/auth.js`) asegurando que el estado de sesión, el tema visual (Dark/Light), el contador de notificaciones y los favoritos persistan y se sincronicen fluidamente entre todas las páginas mediante `LocalStorage`.
* **Consecuencias**: Cero pantallas en blanco, enlaces directos fiables (tanto en entorno local `file://` como en servidor web), estructura de archivos clara y mantenibilidad máxima para cada sección del wireframe de Figma.

### [ADR-018] · [2026-11-01 20:25] — Optimización Desktop, Autocierre de Sliders, Feed de Alertas con Subida de Fotos y Filtros Numéricos
* **Contexto**: El usuario reportó 5 oportunidades de mejora en la experiencia de usuario: (1) imagen y degradado del carrusel Home, (2) sliders superpuestos sin autocierre, (3) márgenes laterales estrechos en pantallas grandes, (4) visualización cronológica de alertas y necesidad de formulario de reporte en vista separada con subida de fotos, (5) representación de edad en números según Figma.
* **Decisiones**:
  1. **Carrusel Home**: Reemplazo de la foto del primer slide por un perro rescatado (`photo-1587300003388-59208cc962cb`). Corrección del contenedor de gradiente sombreado a ancho completo (`w-full h-full absolute inset-0`) garantizando contraste uniforme sobre toda la imagen en desktop.
  2. **Sliders con Autocierre**: Implementación de exclusión mutua estricta en `js/main.js`. Al desplegar el slider de notificaciones se cierra automáticamente el menú hamburguesa, y viceversa. Se añaden escuchas de click exterior y tecla `Escape` para el cierre preventivo.
  3. **Márgenes Laterales Responsive**: Ajuste del contenedor principal de todas las vistas a `max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20`, complementado con grillas adaptativas de 2 a 4 columnas para eliminar huecos vacíos en resoluciones 1080p y superiores.
  4. **Alerta Callejero y Subida de Fotos**: Incorporación en `alerta.html` de un feed cronológico de alertas activas ordenadas de más reciente a más antigua debajo del mapa, con badges de situación y tiempo transcurrido. Creación de la vista dedicada `reportar-alerta.html` con sistema prioritario de subida y previsualización inmediata de fotos de mascotas (dropzone interactivo con `FileReader`).
  5. **Filtros Numéricos de Adopción**: En `adopciones.html` y `js/adopciones.js`, adecuación exacta a `boceto_filtro-mascotas_mobile.png` utilizando rangos numéricos con toggles ("De 0 a 3 Años", "De 3 a 7 Años", "Más de 7 Años") y filtro por sexo.
* **Consecuencias**: Interfaz más profesional y espaciosa en monitores grandes, gestión de estados sin colisiones visuales entre drawers, reporte intuitivo de mascotas con fotos y búsqueda ágil por edad exacta.

### [ADR-019] · [2026-11-01 20:45] — Flujo Secuencial de Adopción, Ficha Detalle Fiel a Figma, Badge "Casos Urgentes" y Validación de Sesión
* **Contexto**: El usuario solicitó perfeccionar la lógica de adopción: dividir el filtro de castración en "castrados" y "no castrados", incorporar la categoría y badge seleccionable de "casos urgentes", y garantizar que el botón "Adoptar" conduzca primero a la vista descriptiva con el sistema de badges de Figma antes de habilitar el cuestionario únicamente a usuarios autenticados.
* **Decisiones**:
  1. **Filtro de Castración Bipartito**: En `adopciones.html` y `js/adopciones.js`, se desdobla el filtro en opciones explícitas: `Todos`, `Castrados` (`pet.castrado === true`) y `No Castrados` (`pet.castrado === false`).
  2. **Etiqueta y Badge "Casos Urgentes"**:
     - Se incorpora el badge seleccionable interactivo (`🚨 Caso Urgente`) al momento de publicar animales tanto en alertas (`reportar-alerta.html`) como en el nuevo modal de publicación de adopción (`#modal-publicar-mascota`).
     - Se añade en el catálogo un filtro switch dedicado (`#filter-only-urgent`) para aislar animales con tránsito a vencer o postoperatorio crítico.
     - Se visibiliza el badge pulsante en las cards del catálogo y en la ficha descriptiva.
  3. **Flujo de Adopción en Dos Pasos**:
     - Al hacer clic en "Adoptar" en la tarjeta, el usuario es dirigido obligatoriamente a la **Ficha Descriptiva del Animal** (`#modal-detalle-mascota`), estructurada fielmente según `ruta_adopciones_mobile.png` con barra superior (Atrás, Nombre, Favorito), foto principal, historia y el bloque formal **"Sistema de Badges"** (Sociabilidad, Castración, Urgencia, Sexo, Edad, Especie), junto a los acordeones colapsables de Estado de Salud y Notas Especiales.
     - El formulario de adopción solo es accesible mediante el botón CTA **"¡Adoptame!"** dentro de la ficha descriptiva.
  4. **Validación de Sesión Obligatoria con Interceptor Popup**:
     - Al presionar **"¡Adoptame!"**, el sistema valida la presencia de sesión activa en `LocalStorage`.
     - Si el usuario **no está registrado**, se interrumpe el flujo y se despliega un popup informativo modal (`#modal-auth-required`) advirtiendo que la identificación es obligatoria para garantizar la trazabilidad del animal, con botones directos para Iniciar Sesión (`login.html?redirect=adopciones.html`) o Crear Cuenta (`registro.html?redirect=adopciones.html`).
     - Si el usuario **está logueado**, se abre el cuestionario pre-completando automáticamente su nombre y correo electrónico.
* **Consecuencias**: Cumplimiento riguroso del wireframe de Figma, prevención de adopciones anónimas o solicitudes spam, y claridad absoluta en el estado reproductivo y de urgencia de cada animal.

### [ADR-020] · [2026-11-02 15:30] — Flujo de Registro con Verificación por Teléfono y Código OTP (Figma) y Corrección de Overlay del Carrusel
* **Contexto**: El usuario solicitó dos ajustes clave: (1) Reincorporar los títulos y eslóganes directamente sobre las imágenes del carrusel manteniendo intactas las imágenes originales y el degradado sombreado, y (2) Implementar el flujo completo de validación por teléfono o código OTP en el registro según el diseño de Figma (`ruta_loguin_mobile.png`).
* **Decisiones**:
  1. **Superposición del Carrusel Home**: Se corrigió el posicionamiento CSS en `index.html`. Se aplicó `absolute inset-0` a las etiquetas `<img>` y se desacopló el contenedor de textos con `absolute inset-0 z-10 flex flex-col justify-end`, eliminando el desplazamiento en flujo que empujaba los títulos fuera del viewport. Se mantuvieron intactas las tres imágenes originales (perro rescatado, perro callejero, gato) y sus filtros de contraste (`brightness-[0.70]`/`[0.65]` y `bg-gradient-to-t`).
  2. **Registro Multi-Paso con Validación OTP (Figma)**:
     - **Paso 1 (Registrate)**: Nombre, Email, Contraseña con toggle de visibilidad y accesos rápidos a Google / Facebook según Figma.
     - **Paso 2 (Igrese su numero de telefono)**: Pantalla dedicada para captura de teléfono con botón primario *Verification* y opción secundaria *Later* para omitir.
     - **Paso 3 (Verify Phone Number)**: Interfaz de verificación con teléfono enmascarado (`+54 9 358 •••• 567`), 4 casilleros individuales para dígitos OTP con avance y retroceso automático de foco, temporizador regresivo de 04:30 minutos (`#countdown-timer`), botón *Verify* y enlace *Send Again*.
     - Se fijó el código de referencia `8596` fiel al mockup de Figma (con soporte para cualquier código de 4 dígitos) y persistencia del estado verificado en `callejeros_user`.
* **Consecuencias**: Fidelidad total con las pantallas 4, 5 y 6 de `ruta_loguin_mobile.png`, experiencia de usuario fluida con validación por SMS/WhatsApp, y visualización nítida y legible de los títulos del carrusel en todos los dispositivos.
