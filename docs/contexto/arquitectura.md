# Arquitectura del Sistema — Callejeros R4

## 1. Stack Tecnológico
* **Marcado y Estilos**: HTML5 semántico + Tailwind CSS v3 (vía CDN con extensión de temas y `dark:` nativo).
* **Lógica de Cliente**: JavaScript / TypeScript ligero sin dependencias pesadas.
* **Integración Externa**: Google Maps JavaScript API (100% funcional en MVP para geolocalización de alertas en Río Cuarto).
* **Persistencia Local**: `LocalStorage` (preferencias de tema, favoritos y reportes simulados) + mocks estructurados en JSON.

---

## 2. Organización Modular y Enrutamiento Multi-Página
* **Enfoque**: Arquitectura Multi-Página (MPA) limpia y robusta, donde cada sección principal cuenta con su propio archivo HTML semántico e independiente (`index.html`, `adopciones.html`, `quienes-somos.html`, `alerta.html`, `notificaciones.html`, `login.html`, `registro.html`, `donaciones.html`, `noticias.html`, `adopcion-responsable.html`, `tienda.html`).
* **Mecanismo de Enlace**: Navegación nativa por hipervínculos directos entre archivos HTML (`.html`), garantizando funcionamiento perfecto tanto al abrir archivos directamente en el navegador (`file:///`) como en cualquier servidor estático.
* **Lógica Compartida (`js/`)**:
  * `js/data.js`: Catálogo de mascotas (`samplePets`) y alertas comunitarias (`initialNotifications`).
  * `js/main.js`: Shell común con persistencia de Tema (Dark/Light), campanita con badge y slider de últimas 5 notificaciones, drawer de menú hamburguesa con estado de usuario (`LocalStorage`) y atenuación de inactividad del botón flotante (FAB).
  * `js/adopciones.js`: Motor de filtrado rápido y avanzado, favoritos, fichas modales de detalle, cuestionario y confirmación de adopción.
  * `js/auth.js`: Autenticación simulada del lado del cliente y visibilidad de contraseñas.
* **Shell Global Persistente**:
  * **Navbar fija**: Logo, icono de alertas, toggle Dark/Light y menú hamburguesa (touch target >= 44px).
  * **Botón Flotante (FAB)**: Acceso directo persistente a "Alerta Callejeros" con atenuación por inactividad.
  * **Footer institucional**: Contacto, redes y enlaces secundarios.

---

## 3. Relación con Frames de Figma
* **Frame Mobile Base (Wireframe 9:41)**:
  * Layout vertical optimizado para pulgar: Header ➔ Carrusel Hero ➔ Hero Adopciones ➔ Hero Quiénes Somos ➔ Hero Donaciones ➔ Footer.
  * FAB en esquina inferior derecha (`z-40`, margen seguro `pb-24` en contenido móvil).
  * Modal centrado con *overlay* semitransparente para confirmación de adopción.
* **Frame Desktop**:
  * Transformación de navegación colapsable a barra horizontal visible.
  * Grilla elástica de tarjetas expandida de 2 a 3/4 columnas con botón explícito de adopción.

---

## 4. Límites Técnicos Estrictos (Lo que NO existe)
* ⛔ **NO frameworks complejos**: Prohibido usar React, Vue, Angular o Svelte.
* ⛔ **NO backend ni servidores**: Sin Node.js, Express, Django ni Python en ejecución.
* ⛔ **NO bases de datos externas**: Sin Firebase ni bases de datos SQL en el servidor.
* ⛔ **NO pasarelas de pago reales**: Tienda Solidaria y Donaciones operan exclusivamente como demostración maquetada sin procesar cobros reales.
* ⛔ **NO notificaciones externas**: Sin integración con APIs de WhatsApp ni correos salientes; todo feedback se resuelve visualmente en pantalla.
* ⛔ **NO estilos inline**: Prohibido el uso de `style="..."`; todo maquetado debe emplear clases atómicas de Tailwind CSS.
