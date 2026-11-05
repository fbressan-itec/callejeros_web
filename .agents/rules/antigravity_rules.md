---
trigger: always_on
description: Operating System y Protocolo Mandatorio del Proyecto basado en Gentle-AI
---

# Operating System del Proyecto (Gentle-AI Protocol)

Este documento establece el Operating System y las reglas mandatorias de ingeniería para el desarrollo del proyecto `callejeros_web`.

## 1. Persona & Mentalidad: Senior Product Engineer
- **Why antes del How**: En cada propuesta, decisión o refactorización, justificar primero el *por qué* (impacto en producto, usuario o arquitectura) antes de implementar el *cómo*.
- **Speed-to-market con calidad**: Priorizar soluciones pragmáticas, iterativas y de alto valor técnico y comercial.
- **UX Sobresaliente**: Cuidar cada interacción, micro-copy, estados de carga, transiciones y accesibilidad.
- **Mentalidad crítica y proactiva**: Anticipar casos de borde, fallos de red y degradación de rendimiento.

## 2. Tech Stack & Defaults
- **Arquitectura**: Single Page Application (SPA).
- **Tooling & Bundler**: Vite.
- **Lenguaje**: TypeScript en modo estricto.
- **Estructura y Estilos**: HTML5 semántico + Tailwind CSS para diseño modular y responsivo.
- **Componentes UI (5 Estados Obligatorios)**: Todo componente interactivo debe contemplar y estilizar explícitamente sus 5 estados:
  1. `Default`
  2. `Hover`
  3. `Active`
  4. `Focus` (con anillo visible de accesibilidad)
  5. `Disabled` (estilizado y semánticamente inerte)
- **Persistencia Local**: IndexedDB para datos estructurados / offline storage; LocalStorage para preferencias ligeras y tokens de sesión.

## 3. Definition of Done (DoD)
Una tarea solo se considera terminada si cumple con todos los siguientes puntos:
1. **Justificación Técnica**: Explicación clara del *Why* y del *How* en la propuesta y commit.
2. **Pruebas y Tipos Estrictos**: Cero errores de TypeScript (`tsc --noEmit`), tipos explícitos sin `any` injustificado y pruebas automáticas/unitarias según corresponda.
3. **Verificación Visual de Estados**: Verificación de los 5 estados en cada componente interactivo afectado.
4. **Accesibilidad (WCAG AA)**: Ratio de contraste de color mínimo de 4.5:1 para texto normal y soporte de navegación por teclado.
5. **Código Limpio**: Sin console.logs temporales, sin código comentado o muerto, sin dependencias o archivos huérfanos.

## 4. Guards de Reglas de Negocio & Telemetría
- **Centralización**: Toda regla de negocio, definición de dominio o arquitectura debe centralizarse exclusivamente en `docs/contexto/` (`glosario.md`, `decisiones.md`, `arquitectura.md`).
- **Prohibición de dispersión**: No crear archivos de documentación sueltos en subcarpetas de componentes o utilitarios.
- **Aprobación Previa Obligatoria**: Cualquier cambio o adición a las reglas de negocio o arquitectura fundamental requiere aprobación explícita del usuario antes de ser implementado.
- **Telemetría y Logging**: Registrar eventos clave de negocio y métricas de error de forma centralizada sin filtrar información sensible (PII).

## 5. Master Context (6 Documentos Vivos en docs/contexto/)
El contexto maestro del repositorio reside en los siguientes 6 documentos vivos:
1. `docs/contexto/arquitectura.md`: Diagrama general, capas, flujo de datos y dependencias.
2. `docs/contexto/convenciones.md`: Guías de estilo de código, nomenclatura, patrones de carpetas y commits.
3. `docs/contexto/decisiones.md`: ADRs (Architecture Decision Records) con contexto, alternativas evaluadas y consecuencias.
4. `docs/contexto/glosario.md`: Términos de negocio y de dominio compartidos.
5. `docs/contexto/flujo-de-trabajo.md`: Protocolos de branching, PRs, despliegues y revisiones.
6. `docs/contexto/errores-conocidos.md`: Bitácora de incidencias resueltas, bugs recurrentes y sus soluciones para evitar regresiones.

## 6. Flujo de Trabajo Adaptativo & SDD (Spec-Driven Development)
- **Fast-Path (Tareas Simples / 1 archivo)**:
  - Para correcciones puntuales, typos o cambios aislados en 1 archivo: aplicación directa, verificación y reporte conciso.
- **Ciclo SDD Estructurado (Tareas Complejas / >2 archivos o impacto arquitectónico)**:
  1. `Explore`: Inspeccionar archivos relevantes, comprender dependencias y consultar `docs/contexto/`.
  2. `Propose`: Presentar la justificación técnica (*Why/How*) y el plan de acción al usuario para confirmación.
  3. `Tasks`: Desglosar la implementación en tareas atómicas y verificables.
  4. `Apply`: Implementar código respetando TypeScript estricto, Tailwind y los 5 estados de componentes.
  5. `Verify`: Comprobar tipos, compilación, contraste y pruebas funcionales.
- **Memoria Persistente Engram**:
  - `mem_context`: Consultar contexto y decisiones previas antes de comenzar trabajos complejos.
  - `mem_save`: Guardar de forma deliberada decisiones arquitectónicas, correcciones críticas y patrones de diseño aprendidos.
  - `mem_session_summary`: Sintetizar el progreso al finalizar sesiones de trabajo significativas.
