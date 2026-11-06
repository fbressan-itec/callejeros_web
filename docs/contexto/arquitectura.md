# Arquitectura del Sistema — Callejeros R4

## 1. Stack Tecnológico
* **Marcado y Estilos**: HTML5 semántico + Tailwind CSS v3 (vía CDN con extensión de temas y `dark:` nativo).
* **Lógica de Cliente**: JavaScript vanilla, sin frameworks ni paso de compilación.
* **Mapa de Alerta Callejeros**: en este proyecto queda **maquetado** (mapa de muestra con marcadores fijos). No se integra Google Maps ni otro servicio de mapas.
* **Persistencia Local**: `LocalStorage` (tema, sesión, favoritos, publicaciones, solicitudes, apadrinamientos, notificaciones y alertas) + datos de ejemplo en `js/data.js`.

---

## 2. Organización Modular y Enrutamiento Multi-Página
* **Enfoque**: Arquitectura Multi-Página (MPA), donde cada sección tiene su propio archivo HTML:
  * Inicio y adopción: `index.html`, `adopciones.html`, `mascota.html` (ficha, `mascota.html#id`), `solicitud.html` (resultado de la solicitud, `solicitud.html#id`), `adopcion-responsable.html`.
  * Alertas: `alerta.html`, `reportar-alerta.html`.
  * Colaborar: `donaciones.html`, `apadrinar.html`, `tienda.html`.
  * Contenido: `noticias.html`, `noticia.html` (`noticia.html#id`), `quienes-somos.html`, `notificaciones.html`.
  * Cuenta: `login.html`, `registro.html`, `recuperar.html`, `mi-cuenta.html`.
* **Mecanismo de Enlace**: Navegación nativa por hipervínculos entre archivos HTML. Las páginas de detalle reciben el id en el hash (`#id`), que se conserva aunque el servidor redirija. Para probar con los datos de LocalStorage conviene usar un servidor estático local.
* **Lógica Compartida (`js/`)**:
  * `js/data.js`: Datos de ejemplo: mascotas (`samplePets`), notificaciones, noticias, alertas y comentarios simulados.
  * `js/main.js`: Shell común: tema (Dark/Light), campanita y slider de notificaciones, menú hamburguesa con estado de sesión, botón flotante (FAB), botón "Volver", favoritos, grupos de edad y eventos demo (respuestas simuladas de voluntarios).
  * `js/adopciones.js`: Catálogo con filtros (especie, edad, sociabilidad, convivencia, castración, sexo, urgentes y favoritos) y formulario para publicar una mascota.
  * `js/mascota.js`: Ficha de la mascota con carrusel, sistema de insignias e información desplegable, y cuestionario de adopción.
  * `js/auth.js`: Login, registro con código de verificación y recuperar contraseña (simulados en el cliente).
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
