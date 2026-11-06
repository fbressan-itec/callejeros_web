# Registro de Decisiones de Arquitectura (ADR) — Callejeros R4

> ⚠️ **REGLA DE GUARDIA MANDATORIA**: Si una propuesta o requerimiento implica un cambio importante o estructural (alteración de la arquitectura multipágina, modificación de la paleta semántica, cambio de framework o de stack, o borrado/refactor mayor de archivos), **la IA (Antigravity, Claude Code u otra) DEBE solicitar autorización explícita al usuario antes de ejecutarlo**, y registrarlo cronológicamente a continuación una vez aprobado.

> 🔄 **Decisiones actualizadas (2026-11-06):** varias decisiones originales (ADR-001 a ADR-021) fueron reemplazadas por decisiones posteriores. Cada una tiene debajo una nota 🔄 que indica qué ADR nuevo la reemplaza; **vale siempre la decisión más nueva**. Las decisiones nuevas están desde el ADR-022 en adelante.
>
> Este registro se mantiene en el repositorio, además de la bitácora de diseño en Google Docs, para que cualquier integrante que siga el proyecto con Antigravity (u otra IA) tenga todo el contexto dentro del propio proyecto y no deshaga decisiones ya tomadas.

---

### [ADR-001] · [2026-10-31 17:58] — Adopción del Protocolo Gentle-AI y Reglas Globales
* **Contexto**: Necesidad de un sistema operativo de ingeniería riguroso, centrado en el usuario y con estándares de calidad Senior.
* **Decisión**: Integrar el protocolo Gentle-AI con sus 6 reglas mandatorias (Senior Product Engineer, SPA/Tailwind/HTML5, DoD estricto, Guards en `docs/contexto/`, Master Context vivo y SDD adaptativo).
> 🔄 **Actualizado por ADR-033:** el stack real no es SPA ni usa TypeScript, Vite o IndexedDB. Es multipágina con HTML, Tailwind por CDN, JavaScript vanilla y LocalStorage.

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
> 🔄 **Pendiente:** el código usa como naranja de marca `#ea580c` (configuración de Tailwind) y botones `orange-500` (`#F97316`). Cuál queda como principal se define con el grupo. No cambiarlo sin esa decisión.

### [ADR-008] · [2026-10-31 19:16] — Tipografía Modular Poppins/Inter y Regla de 16px en Inputs
* **Contexto**: Jerarquía visual legible en pantallas táctiles y prevención de fallos de zoom.
* **Decisión**: Poppins/Outfit para títulos y botones; Inter/Plus Jakarta Sans para cuerpo y formularios. Fijar estrictamente 16px como tamaño base para prevenir auto-zoom en iOS Safari.

### [ADR-009] · [2026-10-31 19:18] — Grilla Adaptativa Elástica y Control de Desbordamiento
* **Contexto**: Visualización consistente entre móviles y monitores amplios.
* **Decisión**: 2 columnas de tarjetas en celular (conmutables a 1), escalando a 2-3 en tablet y 3-4 en desktop. Uso mandatorio de `overflow-x: hidden` en el contenedor principal para erradicar desplazamientos horizontales.
> 🔄 **Actualizado por ADR-025:** el catálogo de adopción va en **1 columna** en el celular (2 en tablet, 3 a 4 en desktop).

### [ADR-010] · [2026-10-31 19:19] — Matriz Mandatoria de los 5 Estados de Interacción
* **Contexto**: Feedback táctil constante y soporte de accesibilidad universal.
* **Decisión**: Estilizar rigurosamente los estados Default, Hover (`-translate-y-1`), Active (`scale-95` y corazón rojo), Focus (`ring-2 ring-orange-500`) y Disabled (`opacity-50` y bloqueo) en cada control interactivo.

### [ADR-011] · [2026-10-31 19:24] — Selección de Tailwind CSS v3 Utility-First
* **Contexto**: Rapidez de maquetado e iteración directa en el marcado HTML sin CSS disperso.
* **Decisión**: Utilizar Tailwind CSS v3 vía CDN con configuración extendida para maquetado modular, responsive y modo oscuro instantáneo.

### [ADR-012] · [2026-10-31 19:25] — Delimitación Estricta de Alcance Técnico (MVP v1.0)
* **Contexto**: Pragmatismo y foco en entrega rápida evitando sobre-ingeniería o costos externos.
* **Decisión**: Aplicación SPA 100% Client-Side. Google Maps funcional (**In-Scope**). Pasarelas de pago y notificaciones por WhatsApp/mail restringidas a maquetación y demostración visual (**Out-of-Scope**).
> 🔄 **Actualizado por ADR-032:** el sitio es multipágina (no SPA) y el mapa de Alerta Callejeros queda **maquetado** (sin Google Maps ni otro servicio de mapas). Pagos y notificaciones externas siguen fuera de alcance.

### [ADR-013] · [2026-10-31 19:31] — Definición de Criterios de Éxito y Listo (DoD)
* **Contexto**: Asegurar calidad técnica y de experiencia de usuario antes de dar por terminada una fase.
* **Decisión**: Adoptar matriz DoD de 4 dimensiones: Usabilidad UX, Calidad UI, Responsividad Mobile-First (touch targets >= 44px) y Funcionalidad del mapa.
> 🔄 **Actualizado por ADR-032:** el DoD ya no exige un mapa funcional (queda maquetado). La dimensión técnica pide cero errores en la consola.

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
> 🔄 **Actualizado por ADR-017 y ADR-032:** sigue vigente que todo es del lado del cliente con LocalStorage y que el backend queda para una fase futura, pero la arquitectura ya no es SPA: es multipágina.

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
> 🔄 **Actualizado por ADR-031:** los filtros de edad pasan a los grupos **Cachorro** (menos de 1 año), **Adulto** (1 a 7) y **Senior** (más de 7), los mismos que la insignia de edad.

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
> 🔄 **Actualizado por:** ADR-023 (las alertas ya no tienen "Caso Urgente"; sigue solo en adopciones), ADR-029 (la ficha deja de ser el modal `#modal-detalle-mascota` y pasa a ser la página `mascota.html#id`, con el cuestionario adentro) y ADR-031 (el "Sistema de Badges" con texto pasa a insignias solo con íconos). Sigue vigente la sesión obligatoria antes del cuestionario.

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
> 🔄 **Actualizado por:** ADR-022 (el código solo acepta `8596` y respeta el vencimiento del temporizador) y ADR-026 (todos los textos del registro en español: "Registrarme", "Verificar", "Más tarde", "Reenviar código").

### [ADR-021] · [2026-11-05 01:10] — Publicación del Repositorio Público en GitHub y Documentación Oficial
* **Contexto**: El usuario solicitó subir el proyecto completo con todas sus carpetas a un repositorio público de GitHub (`https://github.com/pablo-itec/callejeros_web.git`).
* **Decisiones**:
  1. **Generación de README.md Profesional**: Se elaboró un documento raíz con la descripción integral del proyecto, arquitectura de vistas, stack tecnológico (HTML5, Tailwind CSS, JS modular), accesibilidad WCAG AA, estructura de carpetas y guía de ejecución local.
  2. **Configuración de .gitignore**: Se protegieron archivos de sistema operativo (`Thumbs.db`, `.DS_Store`), editores y eventuales dependencias.
  3. **Control de Versiones y Rama Principal**: Se inicializó el commit raíz con las 75 entidades del proyecto en la rama estándar `main`, configurando el remoto `origin` y sincronizando el árbol de trabajo con GitHub.
* **Consecuencias**: Código fuente 100% versionado y disponible públicamente en GitHub, listo para despliegues continuos, revisiones comunitarias y colaboración externa.
> 🔄 **Actualizado por ADR-032:** el README se reescribió con el estado actual del proyecto (páginas, archivos, insignias, Alerta Callejeros y enlace a la bitácora).

---

## Decisiones nuevas (desde 2026-11-06)

Tomadas durante la revisión con Claude Code. El detalle de UX/UI y el porqué de cada una también está en la bitácora de diseño: https://docs.google.com/document/d/1e58WfBZ8FOg2GzsJbNegcXcHNGWRbLk1TxNpnEnkr14/edit

### [ADR-022] · [2026-11-06 01:29] — Corrección de Bugs de Consistencia y Seguridad
* **Contexto**: Revisión general del front: datos contradictorios, clases de Tailwind inexistentes, HTML mal cerrado y datos de usuarios insertados sin escapar.
* **Decisiones**:
  1. Todo texto cargado por usuarios se inserta con `escapeHtml()` (`js/main.js`) para que no se interprete como HTML.
  2. El parámetro `?redirect=` del login y el registro solo acepta páginas propias del sitio (`getSafeRedirect()` en `js/auth.js`), nunca URLs externas.
  3. El código de verificación del registro solo acepta `8596` y respeta el vencimiento del temporizador.
* **Consecuencias**: Menos errores visibles y un prototipo más seguro aunque no tenga servidor.

### [ADR-023] · [2026-11-06 01:57] — Botón "Volver" y Alerta Callejeros como Sistema Propio
* **Contexto**: Faltaba una salida clara en las páginas internas, y las alertas mezclaban la etiqueta "Caso Urgente" de adopciones, cuando en la calle todos los casos son urgentes.
* **Decisiones**:
  1. Botón "<" estilo Figma (44px) en todas las páginas internas, marcado con `data-back`: vuelve a la pantalla anterior o, si se entró directo, a un destino fijo.
  2. Alerta Callejeros es un sistema separado de adopciones, para el **seguimiento de animales en la calle**: quien ve un animal perdido, desamparado o herido lo publica para que otros lo reconozcan o lo ayuden (alimento, atención, tránsito). No publica en el catálogo de adopción.
  3. Tres situaciones: perdido, encontrado y emergencia. **Sin etiqueta "Caso Urgente"** en alertas (sigue en adopciones, para tránsitos que vencen).
  4. Cada alerta tiene una ficha a pantalla completa en el celular, con contacto y comentarios de vecinos (simulados, `sampleAlertComments` en `js/data.js`). El campo para comentar está solo maquetado.
* **Consecuencias**: Alerta Callejeros es uno de los dos aportes propios del proyecto (junto con las insignias, ADR-031).

### [ADR-024] · [2026-11-06 02:14] — Noticias en Página Propia con Comentarios Simulados
* **Decisión**: Cada tarjeta de `noticias.html` abre la noticia completa en `noticia.html#id` (datos en `sampleNews`, `js/data.js`), con comentarios simulados. Las páginas de detalle usan `#id` en lugar de `?id=` porque algunos servidores borran el `?` al redirigir. Alertas y noticias comparten `renderCommentItems()` de `js/main.js`.

### [ADR-025] · [2026-11-06 02:36] — Ajustes Mobile First
* **Decisiones**:
  1. Todos los campos de formulario usan 16px (`text-base`) para que iOS no haga zoom.
  2. Todos los botones y enlaces táctiles miden al menos 44px.
  3. Un único menú hamburguesa, igual al de Figma, en todas las páginas con menú. Resalta la sección actual, queda inaccesible al teclado cerrado (`inert`) y el acceso a alertas se llama "🚨 Alerta Callejero!", en rojo.
  4. El botón flotante de alerta se oculta mientras el menú está abierto.
  5. En el celular, el carrusel de la home se desliza con el dedo y las flechas se ocultan (tapaban el título).
  6. El catálogo de adopción va en 1 columna en el celular, con pestañas compactas Todos / Perros / Gatos y el texto de Figma "¿Qué preferís adoptar?".

### [ADR-026] · [2026-11-06 02:45] — Cuenta en Español, Recuperar Contraseña y Datos del Formulario de Adopción
* **Decisiones**:
  1. Registro y recuperar contraseña con todos los textos en español ("Registrarme", "Ingresá tu número de teléfono", "Verificar", "Más tarde", "Verificá tu teléfono", "Reenviar código").
  2. Flujo "¿Olvidaste tu contraseña?" de Figma en `recuperar.html`: Email o Teléfono, código de 4 dígitos (demo `7098`, temporizador 02:30), nueva contraseña y éxito.
  3. El cuestionario de adopción suma Edad (mínimo 18 años), Dirección y Localidad, como en Figma. **Se mantiene un solo campo "Nombre Completo"** aunque Figma separa Nombre y Apellido.

### [ADR-027] · [2026-11-06 02:57] — Circuito de Adopción Completo con Respuestas Simuladas
* **Decisiones**:
  1. Al enviar el cuestionario llega la notificación "Recibimos tu solicitud" y, unos 8 segundos después, la respuesta simulada en `solicitud.html#id`: **aprobada** (contacto del hogar de tránsito y punto de encuentro público) o **desaprobada** (mensaje cordial y enlace a Adopción Responsable). Regla de la demo: casa abierta sin patio, desaprobada; el resto, aprobada.
  2. Publicar una mascota exige cuenta y un teléfono de contacto (no se muestra en el catálogo) y queda **en revisión**; a los segundos se aprueba y aparece en el catálogo.
  3. Los eventos simulados se resuelven solos aunque se cambie de página (`scheduleDemoEvent` y `pushNotification` en `js/main.js`).

### [ADR-028] · [2026-11-06 03:03] — Apadrinamiento en 3 Pasos
* **Decisión**: `apadrinar.html`: monto mensual ($ 2.000 / 5.000 / 10.000 u otro, mínimo $ 500), fondo general o un rescatado, método de pago simulado y confirmación con notificación. Pide cuenta. Se llega desde Donaciones o desde la ficha de una mascota (que llega con ese animal elegido). La ficha muestra cuántos padrinos tiene (`getPadrinosCount()`).

### [ADR-029] · [2026-11-06 03:36] — Ficha de Mascota en Página Propia
* **Contexto**: La ficha era un modal sobre el catálogo: el "atrás" del celular sacaba del catálogo y no se podía compartir una mascota.
* **Decisiones**:
  1. La ficha es la página `mascota.html#id` (`js/mascota.js`), fiel a Figma: barra superior (< · nombre · ♡), carrusel de fotos que se desliza, insignias, padrinos, información desplegable cerrada (Descripción, Estado de salud, Notas), "¡Adoptame!", "Donaciones y Apadrinamiento" y "Compartir". El cuestionario de adopción vive en esta página.
  2. El texto sobre la foto va con **degradado fijo** y un resumen de 2 líneas, no "transparente que se oscurece al tocar" (en el celular no hay hover y no cumplía contraste WCAG AA). La descripción se limita a 400 caracteres al publicar, con contador, y en la ficha aparece "Ver más" solo si el resumen se corta.
  3. Donaciones suma una portada con foto, tarjetas que se deslizan en el celular y 6 preguntas frecuentes. Adopción Responsable suma "Compartí esta guía".
  4. Sin comentarios en la ficha de mascota (quedan en Alertas y Noticias).

### [ADR-030] · [2026-11-06 06:37] — Mi Cuenta, Insignias de Rol y Favoritos
* **Decisiones**:
  1. `mi-cuenta.html` (maquetado, no guarda cambios): tarjeta de perfil con foto, nombre, correo e insignia de rol; "Mi actividad"; configuración en desplegables (Datos personales, Correo, Teléfono, Contraseña, Notificaciones, Privacidad) que muestran el dato actual y se abren de a uno; cerrar sesión y eliminar cuenta con confirmación.
  2. La tarjeta de perfil será el **perfil público** cuando haya back end, por eso no lleva datos privados. El estado del teléfono va en su fila, en ámbar.
  3. Insignias de rol **"Staff Callejeros"** y **"Refugio verificado"** (tilde azul con texto), asignadas solo por el administrador; las cuentas comunes muestran "Miembro de la comunidad". No hay insignia para voluntarios de refugios porque no se puede comprobar. El rol se guarda en `user.role`.
  4. Botones de prueba "Alternar Modo Test" (menú) y "Cambiar rol" (tarjeta de Mi Cuenta), marcados en el código para quitarlos en la fase de desarrollo.
  5. "Favoritos" abre `adopciones.html#favoritos` con el catálogo filtrado; si no hay ninguno, muestra "Todavía no tenés favoritos" con un botón al catálogo. Sin indicador extra de filtro activo.

### [ADR-031] · [2026-11-06 07:49] — Sistema de Insignias de la Ficha de Mascota
* **Contexto**: El "Sistema de Badges" con texto (ADR-019) repetía la Descripción. La idea es que un adoptante vea de un vistazo si el animal le sirve y decida si sigue leyendo.
* **Decisiones**:
  1. Insignias **solo con ícono SVG** de 48px, en una caja gris sin título. El significado aparece al pasar el mouse, tocar o llegar con el teclado, en la línea de abajo de la caja; cada una tiene su texto para lectores de pantalla.
  2. Siempre: especie, sexo, edad, Sociable / **Salvaje** (no "tímido": hay perros tímidos que son familiares), con niños, con otros animales y castración. Solo si corresponde: caso urgente y cuidados de salud.
  3. "Con niños" y "Con otros animales" usan el mismo ícono en verde (sí), ámbar (no) o gris (sin evaluar); "Descripción" muestra el dato en texto.
  4. Edad en tres grupos, iguales en insignias y filtros: **Cachorro** (menos de 1 año), **Adulto** (1 a 7) y **Senior** (más de 7) (`getAgeGroup()` en `js/main.js`).
  5. Las insignias se **calculan solas** a partir de los datos (`getPetBadges()` en `js/mascota.js`); nadie las elige y no hay vista previa al publicar. Con back end, el servidor las calcula con las mismas reglas y un voluntario valida "Caso urgente".
  6. SVG y no emojis: el mismo ícono cambia de color, y los emojis se ven distinto en cada celular y no se pueden pintar.
  7. Formulario de publicar: edad con número y "Años / Meses"; "¿Sociable con niños?" y "¿Con otros animales?" que arrancan en "Sin evaluar"; casilla de salud que habilita un campo obligatorio de 150 caracteres.
  8. Filtros nuevos: "Sociable con niños" y "Sociable con otros animales" (solo los "Sí").
* **Consecuencias**: Es el aporte más propio del proyecto. No cambiar estas reglas sin decisión del grupo.

### [ADR-032] · [2026-11-06 08:30] — Alcance, Plataforma Comunitaria y Arquitectura Multipágina
* **Decisiones**:
  1. **Plataforma comunitaria, no la web de un refugio:** refugios y particulares dan en adopción, los vecinos siguen a los animales en la calle, se publican perdidos y encontrados, y se puede colaborar, todo en un solo lugar.
  2. **Multipágina en lugar de SPA** (confirma ADR-017): con un solo archivo cada arreglo rompía otras secciones; con una página por sección cada pantalla tiene su enlace, el botón "atrás" funciona como se espera y cada sección se prueba por separado. Lo común (menú, tema, sesión, notificaciones, favoritos) se comparte con JavaScript y LocalStorage. La justificación queda en el README y en la bitácora; no hace falta consultarlo.
  3. **Mapa de Alerta Callejeros maquetado:** no se integra Google Maps, Leaflet ni otro servicio en este proyecto.
  4. **Tienda sin carrito:** la plataforma no vende; conecta al comprador con quien publica cada producto ("Consultar por WhatsApp").
  5. **Sin sección de Voluntariado:** la organización de voluntarios de cada refugio está fuera de alcance.
  6. **Botones sin acción que quedan así:** "Consultar por WhatsApp", "Google" / "Facebook" del registro y "Recordarme".
  7. **Presentación con internet:** se presenta por Google Classroom; no hace falta versión offline aunque Tailwind, las fuentes y las fotos se carguen desde la web.
  8. **A definir con el grupo:** el naranja principal (ver nota en ADR-007).

### [ADR-034] · [2026-11-06 09:00] — Filtros sin Desplegables y "Ver Resultados" Fijo
* **Contexto**: En el modal de filtros, los grupos (Edad, Sociabilidad, Castración, Sexo) tenían una flecha como si fueran desplegables, pero no hacían nada al tocarlos. El panel mide más de una pantalla y media en el celular, y "VER RESULTADOS" quedaba al final.
* **Decisiones**:
  1. Se sacan las flechas y todos los grupos quedan siempre visibles. Cada grupo tiene 2 o 3 opciones: desplegarlos sumaría toques y escondería filtros activos (el usuario olvida que marcó uno y no entiende por qué ve pocos animales). Se aparta del Figma, que mostraba flechas.
  2. "VER RESULTADOS" y "Limpiar Filtros" quedan fijos abajo del panel, al alcance del pulgar sin bajar hasta el final.
* **Consecuencias**: No quedan controles que parecen interactivos y no lo son. No volver a poner flechas en los filtros sin hacerlos desplegables de verdad.

### [ADR-033] · [2026-11-06 08:30] — Stack Real y Reglas para las IA
* **Contexto**: Las reglas iniciales de Antigravity (`.agents/rules/antigravity_rules.md` y `.agents/memory/engram_memory.json`) pedían SPA, Vite, TypeScript e IndexedDB, y Google Maps funcional. Si otro integrante sigue el proyecto con Antigravity, la IA podría intentar migrar el proyecto y deshacer lo decidido.
* **Decisión**: El stack oficial es **HTML5 semántico multipágina + Tailwind CSS v3 por CDN + JavaScript vanilla sin compilación + LocalStorage**. Se corrigen las reglas y la memoria de Antigravity con este stack y con guardas explícitas: no migrar a SPA, TypeScript, Vite, frameworks ni IndexedDB; no integrar mapas reales; no cambiar las reglas de las insignias ni la paleta sin aprobación; mantener `.agents/ToDo.md` y este registro al día.

### [ADR-035] · [2026-11-06 12:00] — Revisión UX Mobile: Alerta Callejeros y Formularios
* **Contexto**: Revisión a 375px de los flujos principales, en modo claro y oscuro.
* **Decisiones**:
  1. En Alerta Callejeros el mapa (maqueta, ADR-032) queda arriba del listado pero **más chico**, y en el celular hay **un solo llamado a publicar: el botón flotante** (igual que en el inicio, ADR-004). Se sacaron el botón grande del encabezado y la tarjeta "¿Encontraste o perdiste…?".
  2. La ficha de alerta usa `alerta.html#id` (como `mascota.html#id`, ADR-029): el "atrás" del celular la cierra y cada alerta tiene su enlace.
  3. La tercera situación se llama **"Avistado"** en toda la interfaz (antes "Encontrado" en el filtro y "Avistados" en el mapa). Sigue habiendo tres situaciones (ADR-023); el valor interno sigue siendo `encontrado`.
  4. Al publicar una alerta se vuelve directo al listado (`alerta.html#listado`). El teléfono de la alerta se avisa como público.
  5. Al publicar una mascota, la foto es obligatoria y Castración / Sociabilidad arrancan sin respuesta (refuerza ADR-031: la ficha no se "embellece" con valores por defecto).
  6. El tiempo de publicación de alertas y notificaciones queda como texto fijo en el maquetado; el cálculo real va con el back end.
  7. En el celular, el botón flotante del inicio y de Alerta Callejeros despliega "Publicar Alerta Callejero" 3 s (a los 2 s de entrar y cada 30 s) hasta que la persona lo usa una vez. Mientras el texto está desplegado el botón se ve **rojo sólido** (sin transparencia) y vuelve a la transparencia de reposo al plegarse, en el mismo momento. Así un usuario nuevo sabe para qué sirve el ícono. El del inicio lleva al formulario (`reportar-alerta.html`).
  8. **"Tipo de Vivienda" (cuestionario de adopción) sigue siendo menú desplegable, solo en el maquetado.** Se mantiene para poder mostrar en la demo el mensaje de solicitud desaprobada (regla: "Casa sin patio / Abierta" → desaprobada). **Para la fase de desarrollo (front + back end)** se espera un campo que el usuario completa a mano, porque la aprobación la controla un moderador / admin. Está comentado en `mascota.html` y `js/mascota.js`.
  9. **"Tipo de Situación" (reportar alerta) pasa a tarjetas con opciones fijas** (Perdido, Avistado, Emergencia), sin opción marcada. Son pocas opciones y no cambian, así que se eligen de una lista cerrada y el usuario no escribe texto libre. En el celular el menú desplegable cortaba el texto.
  10. En `notificaciones.html`, "Marcar todas leídas" va debajo del título en el celular, en una línea y alineado a la derecha; desde tablet vuelve al costado. Al costado se partía en tres líneas y se veía como un recuadro grande.
* **Pendiente de decisión del grupo**: el contraste de colores (junto con el naranja principal) y detalles del botón flotante. Detalle en `.agents/ToDo.md`.

