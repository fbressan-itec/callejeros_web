# Callejeros Río Cuarto 🐾

Plataforma web comunitaria para la adopción responsable, las alertas de animales en la calle, el apadrinamiento y las donaciones en Río Cuarto, Córdoba.

Proyecto Final (EFI) de la materia **Interfaz de Usuario**, ITEC 2026. Es un **prototipo navegable**: todo funciona en el navegador, sin servidor, para poder mostrar los recorridos completos.

📓 **Bitácora de diseño:** el camino del proyecto y la justificación de cada decisión de UI/UX están en [Callejeros Río Cuarto — Bitácora de diseño](https://docs.google.com/document/d/1e58WfBZ8FOg2GzsJbNegcXcHNGWRbLk1TxNpnEnkr14/edit).

---

## 🚀 Descripción del proyecto

**Callejeros Río Cuarto** conecta a la comunidad con animales que buscan hogar, permite avisar rápido cuando se ve un animal perdido o en peligro, y ofrece formas de ayudar aunque no se pueda adoptar (apadrinar, donar o comprar en la tienda solidaria).

Está diseñada **Mobile First** (cada pantalla se pensó y probó primero a 375px de ancho), con fidelidad a los bocetos de Figma de `imagen_figma/` y criterios de accesibilidad **WCAG AA**: contraste mínimo de 4.5:1, controles táctiles de al menos 44px, campos de 16px y navegación con teclado.

---

## 🏅 Sistema de insignias: nuestro aporte

La ficha de cada mascota abre con una fila de **insignias**: íconos que resumen al animal de un vistazo. En las webs de adopción que conocemos, la conducta y la salud aparecen en párrafos largos o en listas de texto; acá un adoptante sabe en dos segundos si el adecuado para su grupo familiar, o si seguir buscando a su compañero ideal.

- **Siempre visibles:** especie, sexo, edad (Cachorro, Adulto o Senior), sociable o salvaje, convivencia con niños, convivencia con otros animales y castración.
- **Solo cuando corresponde:** caso urgente y cuidados de salud. Que aparezcan ya es una señal.
- **Convivencia por color:** "Con niños" y "Con otros animales" usan siempre el mismo ícono, en verde (sí), ámbar (no) o gris (sin evaluar).
- **Solo íconos, con su significado a mano:** al pasar el mouse, tocar una insignia o llegar con el teclado, se lee qué significa. Cada una mide 48px y tiene su texto para lectores de pantalla.
- **Automáticas:** nadie elige insignias. Quien publica responde el formulario y las insignias se calculan a partir de esas respuestas, así la ficha no puede contradecir los datos ni "embellecerse".
- **Los mismos criterios en los filtros:** el catálogo filtra por los mismos grupos de edad y por convivencia con niños y con otros animales.

Además, las cuentas pueden llevar una **insignia de rol** que asigna solo el administrador: **Staff Callejeros** (el equipo que modera el sitio) o **Refugio verificado** (refugios oficiales).

El detalle y los motivos de cada regla están en la [bitácora de diseño](https://docs.google.com/document/d/1e58WfBZ8FOg2GzsJbNegcXcHNGWRbLk1TxNpnEnkr14/edit), pestaña "2. Decisiones de UI/UX".

---

## ✨ Funcionalidades

1. **🏠 Inicio:** carrusel que se desliza con el dedo, accesos a adopción, Quiénes Somos y formas de colaborar, y un botón flotante siempre a mano para Alerta Callejeros.
2. **🐶 Adopción responsable:**
   - Catálogo con filtros por especie, edad, sociabilidad, convivencia, castración, sexo, casos urgentes y favoritos.
   - Ficha de cada mascota en su propia página (`mascota.html#id`): carrusel de fotos, insignias, padrinos e información desplegable (Descripción, Estado de salud y Notas).
   - Cuestionario de adopción que exige sesión, y respuesta simulada de un voluntario (aprobada o desaprobada) en `solicitud.html#id`.
   - Publicar una mascota pide cuenta y queda en revisión hasta que un voluntario la aprueba.
3. **🚨 Alerta Callejeros:** listado de alertas de la más reciente a la más antigua (perdidos, encontrados y emergencias), ficha con comentarios de vecinos y formulario de reporte con foto obligatoria. El mapa es una maqueta.
4. **💛 Colaborar:** donaciones con preguntas frecuentes, apadrinamiento en 3 pasos (monto, a quién ayudar y método de pago simulado) y tienda solidaria que conecta con quien publica cada producto.
5. **📰 Noticias y eventos:** listado y noticia completa con comentarios.
6. **🔔 Notificaciones:** campanita con contador, panel con las últimas 5 y página con el historial completo.
7. **🔐 Cuenta:** inicio de sesión, registro en 3 pasos con verificación por código, recuperar contraseña y **Mi Cuenta**, para cambiar foto, datos, correo, teléfono, contraseña, notificaciones y privacidad (maquetado: los cambios todavía no se guardan).

### Datos de prueba
- Código de verificación del registro: `8596`. Código para recuperar la contraseña: `7098`.
- En el menú hamburguesa, **"Alternar Modo Test"** inicia o cierra una sesión de prueba sin pasar por el login.
- En Mi Cuenta, **"Cambiar rol"** muestra las tres insignias de rol (Miembro, Staff Callejeros y Refugio verificado).
- Las respuestas de los voluntarios llegan solas a los pocos segundos.

Los dos botones de prueba están marcados en el código para quitarlos en la fase de desarrollo.

---

## 🛠️ Stack tecnológico

- **Estructura:** HTML5 semántico, una página por sección.
- **Estilos:** Tailwind CSS v3 por CDN, con modo claro y oscuro.
- **Lógica:** JavaScript vanilla, sin frameworks ni paso de compilación.
- **Íconos:** SVG dibujados en el propio HTML y JavaScript (incluidas las insignias), y emojis en algunos textos.
- **Persistencia:** LocalStorage (sesión, favoritos, publicaciones, solicitudes, apadrinamientos, notificaciones y tema).
- **Tipografías:** Poppins (títulos) e Inter (texto), desde Google Fonts.

Tailwind, las fuentes y las fotos de ejemplo se cargan desde internet, así que el sitio necesita conexión.

---

## 📁 Estructura del repositorio

```text
callejeros_web/
├── docs/contexto/             # Documentación viva: arquitectura, convenciones, decisiones (ADR), glosario
├── js/
│   ├── data.js                # Datos de ejemplo: mascotas, noticias, alertas y notificaciones
│   ├── main.js                # Lógica compartida: tema, menú, sesión, notificaciones, favoritos y grupos de edad
│   ├── adopciones.js          # Catálogo, filtros y formulario para publicar una mascota
│   ├── mascota.js             # Ficha de la mascota, insignias y cuestionario de adopción
│   └── auth.js                # Login, registro con código y recuperar contraseña
├── public/images/             # Logo oficial
├── imagen_figma/              # Bocetos de Figma usados como referencia
├── imagen_diagrama_flujo/     # Diagrama de flujo original
├── index.html                 # Inicio
├── adopciones.html            # Catálogo de adopción
├── mascota.html               # Ficha de una mascota (mascota.html#id)
├── solicitud.html             # Resultado de una solicitud de adopción (solicitud.html#id)
├── adopcion-responsable.html  # Guía de adopción responsable
├── alerta.html                # Alerta Callejeros: listado, mapa y ficha de cada alerta
├── reportar-alerta.html       # Formulario para publicar una alerta con foto
├── donaciones.html            # Formas de colaborar y preguntas frecuentes
├── apadrinar.html             # Apadrinamiento en 3 pasos
├── tienda.html                # Tienda solidaria
├── noticias.html              # Noticias y eventos
├── noticia.html               # Noticia completa (noticia.html#id)
├── notificaciones.html        # Historial de notificaciones
├── quienes-somos.html         # Quiénes somos
├── login.html                 # Inicio de sesión
├── registro.html              # Registro en 3 pasos
├── recuperar.html             # Recuperar contraseña
├── mi-cuenta.html             # Administrar la cuenta
└── README.md
```

---

## 💻 Cómo ejecutarlo

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/pablo-itec/callejeros_web.git
   cd callejeros_web
   ```

2. Levantar un servidor estático local (abriendo el HTML como archivo, el navegador no guarda los datos de prueba):
   - **VS Code:** clic derecho en `index.html` → *Open with Live Server*.
   - **Python:**
     ```bash
     python -m http.server 8000
     ```
   - **Node.js:**
     ```bash
     npx serve .
     ```

3. Abrir `http://localhost:8000` (o el puerto que corresponda). Para verlo como en el celular, usar el modo responsive del navegador a 375px.

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Desarrollado con ❤️ para la comunidad de animales de Río Cuarto.
