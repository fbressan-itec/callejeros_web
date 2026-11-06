# Flujo de Trabajo y Ciclo de Desarrollo — Callejeros R4

## 1. Integración de DCU (Diseño Centrado en el Usuario) con SDD

El proceso de desarrollo articula la empatía de diseño de Figma con la precisión técnica de Spec-Driven Development (SDD):

```
[ Empatía & Wireframe ] ➔ [ Especificación SDD ] ➔ [ Implementación Mobile ] ➔ [ Escalado Desktop ] ➔ [ Verificación DoD ]
      (Figma 9:41)             (Explore/Propose)            (Tailwind v3)             (2 a 4 cols)             (WCAG AA)
```

1. **Investigación & Descubrimiento (DCU)**: Identificación de puntos de dolor (Juan, Mirta, Roberto) y bocetado en Figma.
2. **Especificación Técnica (SDD)**: Justificación del *Why* antes del *How* y desglose en tareas verificables.
3. **Maquetación Mobile-First**: Construcción de la vista móvil táctil con touch targets de 44px.
4. **Escalado Desktop**: Adaptación de grillas elásticas y barras de navegación horizontales.
5. **Validación de Criterios**: Prueba de usabilidad, teclado y contraste antes de dar por cerrada la sección.

---

## 2. Estrategia Adaptativa: Fast-Path vs. SDD Completo

* **Fast-Path (Tareas Simples / 1 Archivo)**:
  * Aplicable a: Corrección de typos, ajustes menores de márgenes o clases Tailwind aisladas.
  * Flujo: Aplicación directa ➔ Comprobación visual rápida ➔ Reporte conciso.
* **Ciclo SDD Completo (Tareas Complejas / >2 Archivos o Impacto Estructural)**:
  * **1. Explore**: Inspección de wireframes y `docs/contexto/`.
  * **2. Propose**: Presentación de propuesta técnica (*Why/How*) para confirmación del usuario.
  * **3. Tasks**: Plan de pasos atómicos de maquetado e interactividad.
  * **4. Apply**: Código en HTML5 semántico + Tailwind con los 5 estados obligatorios.
  * **5. Verify**: Validación de accesibilidad, ausencia de scroll horizontal y consola limpia.

---

## 3. Checklist de Listo (Definition of Done - DoD)

Una sección o pantalla se considera **Done** únicamente si cumple con los 4 pilares:
- [ ] **Usabilidad UX**: Navegación multipágina con menú, sesión, tema y notificaciones compartidos; los 5 estados de componentes implementados y confirmación modal con *overlay*.
- [ ] **Calidad UI**: Aplicación estricta de la paleta semántica, microinteracciones funcionales y modo Dark/Light con alto contraste.
- [ ] **Responsividad Mobile-First**: Grilla adaptativa (2 cols móvil a 3-4 desktop), touch targets >= 44px y `overflow-x: hidden` activo.
- [ ] **Funcionalidad Técnica**: Cero errores en la consola del navegador. El mapa de Alerta Callejeros queda maquetado en este proyecto (no se integra Google Maps).
