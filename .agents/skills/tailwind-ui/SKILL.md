---
name: tailwind-ui
description: Guía de maquetación y utilidades de Tailwind CSS v3 para Callejeros R4, asegurando diseño Mobile-First, modo oscuro y los 5 estados de componentes interactivos.
---

# Tailwind UI & Component System Skill

Utilizar esta skill para maquetar interfaces y componentes en `callejeros_web` siguiendo la arquitectura de estilos definida en `docs/contexto/convenciones.md`.

## Paleta y Tokens de Callejeros R4
* **Primario**: `bg-orange-500` / `hover:bg-orange-600` / `text-white`
* **Secundario**: `bg-emerald-500` / `hover:bg-emerald-600`
* **Semántica**:
  * Sociable / Éxito: `bg-emerald-600 text-white`
  * Salvaje / Urgente / Favorito: `bg-red-500 text-white`
  * Informativo: `bg-blue-600 text-white`
* **Modo Oscuro**:
  * Fondo: `bg-slate-50 dark:bg-slate-900`
  * Superficies (Cards): `bg-white dark:bg-slate-800`
  * Textos: `text-slate-900 dark:text-slate-100`

## Patrón de los 5 Estados
Para cualquier componente interactivo (botones, inputs, tarjetas):
```html
<button type="button" class="
  px-5 py-3 rounded-xl font-medium text-white bg-orange-500 shadow-sm
  hover:brightness-105 hover:shadow-md cursor-pointer transition-all
  active:scale-95
  focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
">
  ¡Adoptame!
</button>
```

## Grilla Adaptativa Mobile-First
```html
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  <!-- Tarjetas de mascotas -->
</div>
```
