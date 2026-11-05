# Callejeros Río Cuarto 🐾

Plataforma web comunitaria para la adopción responsable, rescate, alertas y donaciones para animales en situación de calle en Río Cuarto, Córdoba.

---

## 🚀 Descripción del Proyecto

**Callejeros Río Cuarto** es una solución digital diseñada para conectar a la comunidad con animales que buscan hogar, facilitar el reporte inmediato de mascotas perdidas o encontradas mediante geolocalización, y promover la colaboración solidaria a través de donaciones y voluntariado.

Desarrollada bajo la metodología **Spec-Driven Development (SDD)** con estándares de diseño **Mobile-First** y accesibilidad **WCAG AA**.

---

## ✨ Funcionalidades Principales

1. **🏠 Home Interactiva:**
   - Carrusel de impacto visual con mensajes inspiradores y badges informativos.
   - Acceso rápido a las secciones de adopción, alertas, donaciones y noticias.
   - Navegación accesible con menú hamburguesa y barra de estado.

2. **🐶 Catálogo de Adopción Responsable:**
   - Filtros dinámicos por especie (Perro / Gato), tamaño, sexo y edad en números.
   - Filtro discriminado de castración (**Castrados** y **No castrados**).
   - Identificación de **Casos Urgentes** mediante badges prioritarios.
   - Flujo de adopción en dos etapas: vista descriptiva detallada del animal y formulario de postulación posterior.
   - Interceptores de autenticación para usuarios no logueados con redirección a registro/login.

3. **🚨 Alerta Callejero:**
   - Mapa interactivo con pines de alertas geolocalizadas (perdidos / encontrados).
   - Feed cronológico ordenado desde la publicación más reciente a la más antigua.
   - Formulario de reporte con carga de fotografías de la mascota.

4. **🔔 Centro de Notificaciones & Sliders:**
   - Slider lateral de notificaciones con contador visual de alertas no leídas.
   - Sistema de cierre automático concurrente (abrir un slider cierra los demás).
   - Vista dedicada para historial completo de avisos.

5. **🔐 Autenticación y Registro Multi-Paso:**
   - Registro en 3 pasos con validación de datos, número de teléfono y verificación por código OTP con temporizador.
   - Gestión de sesiones simulada en cliente con estados reactivos.

---

## 🛠️ Stack Tecnológico

- **Estructura y Maquetación:** HTML5 Semántico.
- **Estilos y Diseño:** Tailwind CSS (diseño responsivo y Mobile-First).
- **Lógica e Interactividad:** JavaScript Vanilla Modular (ES6+).
- **Iconografía:** Lucide Icons.
- **Accesibilidad (A11y):** Cumplimiento WCAG AA (contraste 4.5:1, navegación por teclado, 5 estados en cada componente interactivo: *Default, Hover, Active, Focus, Disabled*).
- **Persistencia:** LocalStorage para preferencias y estado de sesión.

---

## 📁 Estructura del Repositorio

```text
callejeros_web/
├── docs/
│   └── contexto/             # Documentación viva (arquitectura, convenciones, ADRs, glosario)
├── js/                       # Módulos de lógica en JavaScript Vanilla
│   ├── adopciones.js         # Filtros, catálogo y flujo de adopción
│   ├── alerta.js             # Lógica del mapa y reportes de alertas
│   ├── auth.js               # Autenticación, registro OTP y sesiones
│   ├── notificaciones.js     # Centro de notificaciones y badge
│   ├── sliders.js            # Control y cierre de sliders/drawers
│   └── global.js             # Inicialización y componentes transversales
├── public/
│   └── images/               # Recursos gráficos y logo oficial
├── imagen_figma/             # Capturas de wireframes y diseño de referencia
├── adopciones.html           # Vista del catálogo de adopciones
├── adopcion-responsable.html # Guía y requisitos para adoptar
├── alerta.html               # Vista de mapa y alertas comunitarias
├── reportar-alerta.html      # Formulario para publicar una alerta con foto
├── registro.html             # Flujo de registro multi-paso (OTP)
├── login.html                # Vista de inicio de sesión
├── donaciones.html           # Información y canales de colaboración
├── noticias.html             # Blog y novedades de la comunidad
├── notificaciones.html       # Vista de todas las notificaciones
├── quienes-somos.html        # Historia, misión y equipo de la organización
├── tienda.html               # Merchandising solidario
├── index.html                # Página principal (Home)
└── README.md                 # Documentación del proyecto
```

---

## 💻 Cómo Ejecutar el Proyecto Localmente

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/<usuario>/<nombre-repo>.git
   cd <nombre-repo>
   ```

2. Abrir con cualquier servidor estático local:
   - **VS Code:** Click derecho en `index.html` -> *Open with Live Server*.
   - **Python:**
     ```bash
     python -m http.server 8000
     ```
   - **Node.js (npx):**
     ```bash
     npx serve .
     ```

3. Abrir `http://localhost:8000` (o el puerto correspondiente) en el navegador.

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Desarrollado con ❤️ para la comunidad de animales de Río Cuarto.
