# Convenciones de Diseño y Código — Callejeros R4

## 1. Sistema de Colores Semánticos
* **Primario (CTA)**: Naranja Amigable `#F97316` (`orange-500` / `hover:bg-orange-600`), forzar `text-white`.
* **Secundario (Bienestar)**: Verde Botánico `#10B981` (`emerald-500` / `hover:bg-emerald-600`).
* **Estados Semánticos**:
  * Éxito / Sociable: Verde Esmeralda `#059669` (`emerald-600`, `text-white`).
  * Urgente / Salvaje / Favorito: Rojo Coral `#EF4444` (`red-500`, `text-white`).
  * Informativo / Salud: Azul Cobalto `#2563EB` (`blue-600`, `text-white`).
* **Superficies y Modo Claro/Oscuro**:
  * **Modo Claro (Default)**: Fondo `#F8FAFC` (`slate-50`), tarjetas `#FFFFFF`, texto `#0F172A` (`slate-900`).
  * **Modo Oscuro**: Fondo `#0F172A` (`slate-900`), tarjetas `#1E293B` (`slate-800`), texto `#F1F5F9` (`slate-100`).

---

## 2. Escala Tipográfica Modular
* **Display / Títulos**: `Poppins` o `Outfit` (`h1`: 32px mobile / 48px desk [700]; `h2`: 24px / 32px [600]; `h3`: 18px / 20px [700]).
* **Body / Formularios**: `Inter` o `Plus Jakarta Sans` (`p`: 16px base obligatorio para prevenir autozoom en iOS; `badges/caption`: 12-14px [500]).

---

## 3. Los 5 Estados Obligatorios de Componentes UI
Todo componente interactivo debe estilizar explícitamente sus 5 estados:

1. **Default**: Bordes redondeados (`rounded-xl`), sombra suave, corazón en contorno negro.
2. **Hover**: Brillo sutil (`brightness-105`), elevación de tarjetas (`hover:-translate-y-1 shadow-lg`), FAB con opacidad 100%.
3. **Active**: Hundimiento táctil (`scale-95`), corazón con animación pulso (`scale-125`) y relleno rojo `#EF4444`.
4. **Focus / Focus-Visible**: Anillo de accesibilidad visible en teclado: `outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900`.
5. **Disabled**: `opacity-50 cursor-not-allowed pointer-events-none` en botones si faltan campos obligatorios.

---

## 4. Espaciado y Leyes de Gestalt
* **Proximidad y Semejanza**: Tarjetas agrupadas con `gap-4` (móvil) a `gap-6` (escritorio).
* **Contenedores de Información**: Padding interno uniforme (`p-4` a `p-6`) con separación clara entre foto, badges, texto y botón de acción.
* **Separación de Botones**: Margen mínimo de 8px a 12px entre controles adyacentes para prevenir toques accidentales.

---

## 5. Accesibilidad WCAG AA
* **Ratio de Contraste**: Mínimo 4.5:1 en todo texto. Se fuerza `text-white` en fondos naranja, verde y rojo.
* **Touch Targets Táctiles**: Mínimo 44px x 44px en botón de menú hamburguesa, FAB y botones principales.
* **Navegación por Teclado**: 100% operable con `Tab`, `Enter` y `Espacio` sin atrapar el foco.
* **Semántica**: Atributos `alt` descriptivos en imágenes y `aria-label` en botones con solo icono.
