---
name: sdd-workflow
description: Protocolo Spec-Driven Development (SDD) e iteración Mobile-First para desarrollo de rutas en Callejeros R4.
---

# SDD Workflow & Mobile-First Iteration Skill

Utilizar esta skill para guiar la ejecución de cada tarea o sección del roadmap de `callejeros_web`.

## Ciclo SDD de 5 Pasos
1. **Explore**:
   * Revisar wireframes y requerimientos en `docs/contexto/`.
   * Verificar la sección móvil previa y los componentes reutilizables.
2. **Propose**:
   * Explicar el *Why* antes del *How* al usuario.
   * Plantear la propuesta de maquetado móvil y cómo escalará a desktop.
3. **Tasks**:
   * Desglosar el trabajo en pasos atómicos (HTML semántico, clases Tailwind, microinteracciones, validaciones).
4. **Apply**:
   * Implementar primero la vista móvil (375px).
   * Validar los 5 estados en cada elemento interactivo.
   * Escalar a desktop (grilla y navegación).
5. **Verify**:
   * Comprobar que no haya scroll horizontal (`overflow-x: hidden`).
   * Validar contraste WCAG AA (4.5:1).
   * Verificar en navegador y consola sin errores.
