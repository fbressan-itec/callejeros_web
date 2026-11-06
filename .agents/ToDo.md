# ToDo — Callejeros Río Cuarto (EFI Interfaz de Usuario 2026)

Lista de tareas pendientes del proyecto. Reúne lo que falta hacer, lo que quedó para decidir más adelante y lo que ya se completó.

**Cómo se mantiene:** se actualiza a medida que se trabaja. Cada tarea nueva que surge se agrega en "Pendiente", y cuando se termina se marca `[x]` y se pasa a "Hecho". Los agentes de IA que trabajen en el repo también deben mantenerla al día.

Prioridad: **mobile first** y fidelidad a los bocetos de `imagen_figma/`.

## Pendiente

### Front
- [ ] Revisar las correcciones que encontró el equipo (lista a completar).
- [ ] Mapa de `alerta.html`: por ahora queda el mapa de muestra. Decidir más adelante si se reemplaza por uno real (Leaflet + OpenStreetMap, sin API key) o si se mantiene como maqueta.
- [ ] Flujo "¿Olvidaste tu contraseña?" de Figma (`ruta_loguin_mobile.png`): elegir Email/Teléfono → código → nueva contraseña. Hoy el enlace de `login.html` apunta a `#`.
- [ ] Registro paso 3: el teléfono enmascarado se ve mal (`+54  •••• 456`); toma los primeros 4 caracteres en vez del código de área.
- [ ] Revisar el resto de pantallas contra Figma (menú hamburguesa, filtros, detalle, formulario y confirmación).

### Sistema de alertas (separado de adopciones)
Objetivo: seguimiento de animales en la calle. Quien ve un animal desamparado lo publica para que otros lo reconozcan (si es su mascota perdida) o puedan ayudarlo (alimento, atención, tránsito). No publica en el catálogo de adopción.
- [ ] Verificar con el equipo si alguien ya trabajó estos cambios (ya están hechos en la rama `fix/bugs-consistencia`).
- [ ] Comentarios reales (que se guarden y los vean otros usuarios): hoy son simulados porque no hay backend. Queda para cuando exista uno.

### Documentación
- [ ] Alinear `.agents/rules/antigravity_rules.md` y `.agents/memory/engram_memory.json` con el stack real (HTML + Tailwind CDN + JS vanilla + LocalStorage, sin build). Hoy piden Vite + TypeScript + IndexedDB + SPA.
- [ ] README: corregir la lista de archivos de `js/` (nombra `alerta.js`, `notificaciones.js`, `sliders.js` y `global.js`, que no existen) y la URL de clonado.
- [ ] `docs/contexto/arquitectura.md` y el DoD dicen "Google Maps 100% funcional": actualizar según lo que se decida con el mapa.
- [ ] Hacer un diagrama de flujo nuevo y actualizado. El original (`imagen_diagrama_flujo/Callejeros_Ro_IV.png`, hecho en Coggle) quedó como referencia, pero no refleja los cambios posteriores.
- [ ] Naranja principal: los docs dicen `#F97316`, la config de Tailwind usa `#ea580c`. Definir cuál queda.

### Entrega / presentación
- [ ] Confirmar con el profe que una web de varias páginas HTML cuenta como "Web SPA" (justificación: ADR-017).
- [ ] Tailwind y las fotos se cargan desde internet: prever conexión el día de la presentación (o una versión offline).

## Hecho
- [x] `</main>` duplicado en `adopcion-responsable.html`.
- [x] Clases de Tailwind inexistentes (`opacity-85`, `dark:bg-slate-855`).
- [x] Enlace "Publicar" del menú → abre el modal de publicar mascota en `adopciones.html`.
- [x] Datos contradictorios ("Más de 20 rescatados", notificación de Rocco adoptado).
- [x] Código de verificación: solo acepta `8596` y respeta el vencimiento del temporizador.
- [x] Escapado de datos cargados por usuarios y validación del parámetro `?redirect=`.
- [x] Botón "Volver" (estilo Figma "<", 44px) en todas las páginas internas. Vuelve a la pantalla anterior; si se entró directo, va a un destino fijo (inicio, o el mapa en reportar-alerta). Reemplaza los "← Volver" / "Volver al Mapa" del encabezado.
- [x] Alertas: quitado el "Caso Urgente" (checkbox del formulario, badge y animación). Se mantienen los 3 tipos: Perdido, Encontrado y Emergencia. El badge "Caso Urgente" de **adopciones** se mantiene (tránsitos que vencen pronto).
- [x] Alertas: ficha de detalle (pantalla completa en mobile) con contacto y sección de comentarios. Los comentarios son de personas ficticias (`sampleAlertComments` en `js/data.js`) y el campo para comentar está solo maquetado.
- [x] Decidido: el catálogo de adopciones queda en 1 columna en mobile (se ve mejor), aunque Figma y el ADR-009 muestran 2.
