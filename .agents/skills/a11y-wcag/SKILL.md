---
name: a11y-wcag
description: Criterios y verificación de accesibilidad WCAG AA para Callejeros R4, asegurando contraste 4.5:1, navegación por teclado, touch targets y semántica.
---

# Accesibilidad Web (WCAG AA) Skill

Utilizar esta skill para auditar y garantizar que las pantallas de `callejeros_web` cumplan con las directrices de accesibilidad universal.

## Reglas Mandatorias
1. **Contraste de Color Mínimo (4.5:1)**:
   * Todo texto sobre fondo coloreado (naranja, verde, rojo) debe forzar `text-white`.
   * En modo claro: texto `text-slate-900` sobre `bg-slate-50` o `bg-white` (ratio > 10:1).
   * En modo oscuro: texto `text-slate-100` sobre `bg-slate-900` o `bg-slate-800` (ratio > 10:1).
2. **Touch Targets Táctiles (Mínimo 44px x 44px)**:
   * Botón de menú hamburguesa: `min-w-[44px] min-h-[44px] flex items-center justify-center`.
   * Botón Flotante (FAB): `w-14 h-14` (56px) para manipulación fluida con el pulgar.
3. **Navegación Operable con Teclado**:
   * Usar siempre `<button>` y `<a>` nativos.
   * Prohibir `outline-none` sin proveer `focus-visible:ring-*`.
4. **Textos Alternativos y Atributos ARIA**:
   * Imágenes: `alt="Foto de Loki, perro mestizo de 6 años en adopción"`.
   * Botones icónicos: `aria-label="Agregar a favoritos"`, `aria-label="Cerrar modal"`.
