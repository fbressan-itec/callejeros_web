# Bitácora de Errores Conocidos y Gotchas — Callejeros R4

Guía de soluciones inmediatas a problemas recurrentes de maquetado, contraste y accesibilidad.

---

## 1. Soluciones de Contraste en Modo Claro
* **Problema**: Botones primarios naranja (`#F97316`) y badges rojos (`#EF4444`) heredan tipografía gris oscura al alternar a modo claro en ciertos navegadores, reduciendo el ratio a menos de 2.5:1.
* **Solución**: Declarar siempre la clase utilitaria `text-white` de forma explícita en todos los contenedores de acción de color saturado, garantizando un ratio accesible > 4.5:1 en ambos temas.

---

## 2. Problemas de Foco en Teclado y Accesibilidad
* **Problema 1: Focus Invisible por `outline-none`**:
  * Remover el contorno nativo sin proveer reemplazo anula la navegación para usuarios que usan la tecla `Tab`.
  * **Solución**: Usar `focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900`.
* **Problema 2: Elementos Clicables en `<div>`**:
  * El teclado y los lectores de pantalla ignoran eventos en etiquetas no semánticas.
  * **Solución**: Utilizar siempre la etiqueta nativa `<button type="button">` con atributo `aria-label` descriptivo.

---

## 3. Ajustes de Responsive Móvil
* **Problema 1: Desbordamiento Horizontal (Scroll Lateral)**:
  * Anchos fijos en píxeles (`w-[400px]`) provocan que la pantalla móvil baile lateralmente.
  * **Solución**: Establecer `w-full` y `overflow-x: hidden` en el contenedor principal `<body>` o `<main>`.
* **Problema 2: Zoom Forzado en Inputs de iOS**:
  * Safari en iOS aplica un molesto zoom invasivo si un `<input>` tiene una fuente menor a 16px.
  * **Solución**: Usar `text-base` (16px) como tamaño mínimo en todos los inputs, selects y textareas.
* **Problema 3: Solapamiento del FAB**:
  * El botón flotante de alertas tapa botones de acción en tarjetas o el pie de página en móviles.
  * **Solución**: Asignar `z-40` al FAB y garantizar un padding inferior seguro `pb-24` en el contenedor principal.

---

## 4. Gotchas de Google Maps
* **Problema: Colapso del Contenedor a 0px de Altura**:
  * Si `<div id="map">` no tiene altura explícita en CSS, la API de Google Maps colapsa el mapa a 0px de alto.
  * **Solución**: Aplicar altura fija o responsiva en Tailwind: `h-80 md:h-[450px] w-full rounded-2xl`.

---

## 5. Gotchas de Navegación y Enrutamiento en Archivo Único
* **Problema: Pantalla en Blanco por Hash SPA en Archivo Monolítico**:
  * Concentrar todas las rutas en un único `index.html` mediante un router hash dinámico provoca que, al hacer clic en enlaces a secciones no declaradas en el objeto `views`, todas las vistas se oculten simultáneamente (`classList.add('hidden')`), dejando la pantalla completamente en blanco. Además, bloquea la navegación nativa del historial del navegador en entornos locales (`file:///`).
  * **Solución**: Desacoplar la aplicación en páginas HTML independientes (`index.html`, `adopciones.html`, `quienes-somos.html`, etc.) compartiendo la lógica de sesión, tema, notificaciones y favoritos a través de módulos en `js/` persistidos en `LocalStorage`.

---

## 6. Sombreado de Hero Carrusel Restringido en Desktop
* **Problema**: Si la capa de gradiente oscura (`bg-gradient-to-t`) se coloca en el mismo contenedor que limita el ancho del texto (`max-w-4xl mx-auto`), en pantallas grandes (1440p / 4K) los costados quedan descubiertos con imagen clara sin degradado, dificultando la lectura.
* **Solución**: Desacoplar el degradado en un elemento independiente de cobertura total (`absolute inset-0 w-full h-full`), y colocar el contenido tipográfico en un contenedor secundario centrado con márgenes fluidos.

---

## 7. Colisión Visual por Apertura Concurrente de Sliders
* **Problema**: Si el usuario abre el menú hamburguesa lateral y posteriormente hace clic en la campanita de notificaciones sin cerrar el anterior, ambos paneles se superponen generando ruido visual y bloqueo de accesibilidad.
* **Solución**: Programar exclusión mutua automática en `js/main.js`: la apertura de un drawer invoca el cierre inmediato del otro, complementado con listeners globales para la tecla `Escape` y clics en el backdrop.
