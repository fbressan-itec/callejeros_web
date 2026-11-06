---
trigger: always_on
description: Operating System y Protocolo Mandatorio del Proyecto basado en Gentle-AI
---

# Operating System del Proyecto (Gentle-AI Protocol)

Este documento establece el Operating System y las reglas mandatorias de ingeniería para el desarrollo del proyecto `callejeros_web`.

> ⚠️ **Antes de proponer o cambiar algo, leé `.agents/ToDo.md` y `docs/contexto/decisiones.md`.** Muchas decisiones ya se tomaron y se revisaron con el usuario (ADR-022 a ADR-033). Vale siempre la decisión más nueva. No deshagas ni "mejores" una decisión registrada sin aprobación explícita del usuario.

## 1. Persona & Mentalidad: Senior Product Engineer
- **Why antes del How**: En cada propuesta, decisión o refactorización, justificar primero el *por qué* (impacto en producto, usuario o arquitectura) antes de implementar el *cómo*.
- **Speed-to-market con calidad**: Priorizar soluciones pragmáticas, iterativas y de alto valor técnico y comercial.
- **UX Sobresaliente**: Cuidar cada interacción, micro-copy, estados de carga, transiciones y accesibilidad.
- **Mentalidad crítica y proactiva**: Anticipar casos de borde, fallos de red y degradación de rendimiento.
- **Opinión antes de cambios grandes**: para decisiones de diseño, dar ventajas, desventajas y una recomendación, y esperar la decisión del usuario.

## 2. Tech Stack (oficial, ver ADR-033)
- **Arquitectura**: **Multipágina** (una página HTML por sección, ver ADR-017 y ADR-032). **No es una SPA.** Las páginas de detalle reciben el id en el hash (`mascota.html#id`, `noticia.html#id`, `solicitud.html#id`).
- **Estructura y Estilos**: HTML5 semántico + **Tailwind CSS v3 por CDN** (configuración `tailwind.config` repetida en el `<head>` de cada página). Modo claro y oscuro con la clase `dark`.
- **Lógica**: **JavaScript vanilla, sin compilación** (sin bundler, sin TypeScript, sin frameworks). Lógica compartida en `js/main.js` y datos de ejemplo en `js/data.js`.
- **Persistencia**: **LocalStorage** (sesión, tema, favoritos, publicaciones, solicitudes, apadrinamientos, notificaciones, alertas). Sin IndexedDB.
- **Sin back end**: comentarios, pagos y respuestas de voluntarios son simulados. El back end queda para una fase futura (los comentarios en el código explican cómo debería funcionar).
- **Componentes UI (5 Estados Obligatorios)**: Todo componente interactivo debe contemplar y estilizar explícitamente sus 5 estados:
  1. `Default`
  2. `Hover`
  3. `Active`
  4. `Focus` (con anillo visible de accesibilidad)
  5. `Disabled` (estilizado y semánticamente inerte)
- **Mobile First**: cada pantalla se diseña y prueba primero a 375px. Controles táctiles de al menos 44px y campos de formulario de 16px (`text-base`).

## 3. Definition of Done (DoD)
Una tarea solo se considera terminada si cumple con todos los siguientes puntos:
1. **Justificación Técnica**: Explicación clara del *Why* y del *How* en la propuesta y commit.
2. **Probado en el navegador**: verificado a 375px (y en desktop), en modo claro y oscuro, con **cero errores en la consola**. Usar un servidor estático local (con `file://` el LocalStorage no funciona igual).
3. **Verificación Visual de Estados**: Verificación de los 5 estados en cada componente interactivo afectado.
4. **Accesibilidad (WCAG AA)**: Ratio de contraste de color mínimo de 4.5:1 para texto normal y soporte de navegación por teclado.
5. **Código Limpio**: Sin console.logs temporales, sin código comentado o muerto, sin dependencias o archivos huérfanos. Los textos cargados por usuarios se insertan con `escapeHtml()`.
6. **Documentado**: `.agents/ToDo.md` actualizado y, si es una decisión de diseño o arquitectura, un ADR nuevo en `docs/contexto/decisiones.md`.

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

Además: `.agents/ToDo.md` (pendientes y decisiones tomadas) y la bitácora de diseño en Google Docs (enlace en el README).

## 6. Flujo de Trabajo Adaptativo & SDD (Spec-Driven Development)
- **Fast-Path (Tareas Simples / 1 archivo)**:
  - Para correcciones puntuales, typos o cambios aislados en 1 archivo: aplicación directa, verificación y reporte conciso.
- **Ciclo SDD Estructurado (Tareas Complejas / >2 archivos o impacto arquitectónico)**:
  1. `Explore`: Inspeccionar archivos relevantes, comprender dependencias y consultar `docs/contexto/` y `.agents/ToDo.md`.
  2. `Propose`: Presentar la justificación técnica (*Why/How*) y el plan de acción al usuario para confirmación.
  3. `Tasks`: Desglosar la implementación en tareas atómicas y verificables.
  4. `Apply`: Implementar con HTML, Tailwind y JavaScript vanilla, respetando los 5 estados de componentes y Mobile First.
  5. `Verify`: Probar en el navegador a 375px y en desktop, contraste y consola sin errores.
- **Memoria Persistente Engram**:
  - `mem_context`: Consultar contexto y decisiones previas antes de comenzar trabajos complejos.
  - `mem_save`: Guardar de forma deliberada decisiones arquitectónicas, correcciones críticas y patrones de diseño aprendidos.
  - `mem_session_summary`: Sintetizar el progreso al finalizar sesiones de trabajo significativas.

## 7. Guardas del proyecto: lo que NO se cambia sin aprobación
Estas decisiones ya se tomaron con el usuario. No las cambies, ni las "corrijas", aunque otra regla o skill sugiera lo contrario:
- **No migrar** a SPA, TypeScript, Vite ni otro bundler, React / Vue / Angular / Svelte, IndexedDB ni un CSS compilado. El proyecto es multipágina, con Tailwind por CDN y JavaScript vanilla (ADR-033).
- **No integrar mapas reales** (Google Maps, Leaflet u otros): el mapa de Alerta Callejeros queda maquetado (ADR-032). Ignorar la sección de Google Maps de la skill `dom-interactivity`.
- **No juntar las páginas en un solo HTML** ni pasar las fichas a modales: la ficha de mascota es `mascota.html#id` (ADR-029).
- **Insignias de la ficha** (ADR-031): solo ícono SVG; se calculan solas desde los datos (`getPetBadges()`), sin vista previa en el formulario; "Salvaje" y no "tímido"; edad Cachorro (<1) / Adulto (1 a 7) / Senior (>7), igual en filtros (`getAgeGroup()`); convivencia Sí / No / Sin evaluar por color.
- **Alerta Callejeros** es un sistema propio de seguimiento de animales en la calle, separado de adopciones y **sin etiqueta "Caso Urgente"** (ADR-023). "Caso Urgente" solo existe en adopciones.
- **Insignias de rol** "Staff Callejeros" y "Refugio verificado": las asigna solo el administrador; no crear una insignia para voluntarios de refugios (ADR-030).
- **Botones de prueba** "Alternar Modo Test" y "Cambiar rol": se quedan en el maquetado; se quitan recién en la fase de desarrollo.
- **Paleta**: no cambiar los colores; el naranja principal está pendiente de definir con el grupo (nota en ADR-007).
- **Textos en español rioplatense** (vos, tenés, publicá), como en todo el sitio.
- **Mantener al día** `.agents/ToDo.md` y `docs/contexto/decisiones.md` con cada cambio.
