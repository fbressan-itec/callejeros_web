# ToDo — Callejeros Río Cuarto (EFI Interfaz de Usuario 2026)

Lista de tareas pendientes del proyecto. Reúne lo que falta hacer, lo que quedó para decidir más adelante y lo que ya se completó.

**Cómo se mantiene:** se actualiza a medida que se trabaja. Cada tarea nueva que surge se agrega en "Pendiente", y cuando se termina se marca `[x]` y se pasa a "Hecho". Los agentes de IA que trabajen en el repo también deben mantenerla al día.

Prioridad: **mobile first** y fidelidad a los bocetos de `imagen_figma/`.

## Pendiente

### Front
- [ ] Revisar las correcciones que encontró el equipo (lista a completar).
- [ ] Mapa de `alerta.html`: por ahora queda el mapa de muestra. Decidir más adelante si se reemplaza por uno real (Leaflet + OpenStreetMap, sin API key) o si se mantiene como maqueta.

### Revisión general mobile first (2026-11-06)
- [ ] La ficha de mascota en mobile es un modal con márgenes; la de alertas ocupa toda la pantalla. Unificar (pantalla completa en mobile).
- [ ] Botones sin acción: "Consultar por WhatsApp" (tienda), "Google" y "Facebook" (login y registro), "Recordarme" (login).
- [ ] `<img src="">` vacíos en las fichas (adopciones y alertas) generan un pedido extra al servidor; sacar el `src` hasta que se cargue la foto.
- [ ] Formularios: los botones de envío no se ven deshabilitados cuando faltan datos (estado "Disabled" de la convención de 5 estados).

### Falta respecto a Figma
- [ ] Formulario de adopción: Figma separa **Nombre** y **Apellido** en dos campos; hoy es uno solo ("Nombre Completo"). Opcional.

### Falta respecto al diagrama de flujo
- [ ] Ficha de mascota: comentarios (solo usuarios) y galería de varias fotos.
- [ ] Tienda: detalle de producto, botón "Agregar al carrito", carrito y elegir método de pago (simulado).
- [ ] Donaciones: hero con fotos, cómo se usan las donaciones y preguntas frecuentes.
- [ ] Adopción Responsable: filtro de contenido y botón para compartir en redes.
- [ ] Sección de Voluntariado (nota del diagrama: "Ver de agregar sección de voluntariados").

### Sistema de alertas (separado de adopciones)
Objetivo: seguimiento de animales en la calle. Quien ve un animal desamparado lo publica para que otros lo reconozcan (si es su mascota perdida) o puedan ayudarlo (alimento, atención, tránsito). No publica en el catálogo de adopción.
- [ ] Verificar con el equipo si alguien ya trabajó estos cambios (ya están hechos en la rama `fix/bugs-consistencia`).
- [ ] Comentarios reales (que se guarden y los vean otros usuarios): hoy son simulados porque no hay backend. Queda para cuando exista uno.

### Documentación
- [ ] Alinear `.agents/rules/antigravity_rules.md` y `.agents/memory/engram_memory.json` con el stack real (HTML + Tailwind CDN + JS vanilla + LocalStorage, sin build). Hoy piden Vite + TypeScript + IndexedDB + SPA.
- [ ] README: corregir la lista de archivos de `js/` (nombra `alerta.js`, `notificaciones.js`, `sliders.js` y `global.js`, que no existen), la URL de clonado y sumar las páginas nuevas `noticia.html`, `recuperar.html`, `solicitud.html` y `apadrinar.html` (también en `docs/contexto/arquitectura.md`).
- [ ] `docs/contexto/arquitectura.md` y el DoD dicen "Google Maps 100% funcional": actualizar según lo que se decida con el mapa.
- [ ] Hacer un diagrama de flujo nuevo y actualizado. El original (`imagen_diagrama_flujo/Callejeros_Ro_IV.png`, hecho en Coggle) quedó como referencia, pero no refleja los cambios posteriores.
- [ ] ADR-020 dice que el registro usa los textos en inglés de Figma ("Verify", "Send Again"); ahora está en español. Registrar el cambio en un ADR nuevo.
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
- [x] Noticias: cada tarjeta (ahora con foto) abre la noticia en grande en `noticia.html#id`. Los datos están en `sampleNews` (`js/data.js`). Se usa `#id` en vez de `?id=` porque algunos servidores borran el `?` al redirigir.
- [x] Noticias con comentarios simulados (personas ficticias y respuestas de "Callejeros R4"), como pedía el diagrama original. Campo para comentar solo maquetado. Alertas y noticias usan la misma función `renderCommentItems()` de `js/main.js`.
- [x] Carrusel de la home en mobile: las flechas tapaban el título. Ahora se ocultan en mobile (siguen en tablet/desktop), se puede deslizar con el dedo y los puntitos son botones de 44px.
- [x] Mobile first: los 23 campos de formulario pasan a 16px (`text-base`), así iOS no hace zoom al tocarlos.
- [x] Mobile first: todos los botones y enlaces táctiles miden al menos 44px (pestañas, filtros, favoritos, Adoptar, Llamar/Copiar, ojito de contraseña, CTA de la home y del carrusel, cerrar de modales, botones del menú). Solo queda chico "Alternar Modo Test", que se va a ocultar.
- [x] Menú hamburguesa unificado: el de la home (completo y fiel a Figma) está en las 10 páginas que tienen menú, con chips de 44px. Resalta la sección actual y, cerrado, queda fuera del alcance del teclado (`inert`).
- [x] El botón flotante de alerta se oculta mientras el menú está abierto.
- [x] Quiénes Somos: la foto de los cuises ("Sobre la Iniciativa") se reemplazó por la de un gato.
- [x] Flujo "¿Olvidaste tu contraseña?" de Figma en `recuperar.html`: elegir Email o Teléfono → código de 4 dígitos (demo: `7098`, temporizador 02:30) → nueva contraseña → éxito. Enlazado desde "¿Olvidaste tu clave?" del login.
- [x] Formulario de adopción: se agregaron **Edad** (mínimo 18 años), **Dirección** y **Localidad**, como en Figma.
- [x] Decidido (versión demo): queda visible "Alternar Modo Test", y no se corrigen el teléfono enmascarado del registro ni los listeners duplicados del código.
- [x] Resultado de la solicitud de adopción (diagrama de flujo): al enviar el cuestionario llega la notificación "Recibimos tu solicitud" y, unos 8 segundos después, la respuesta simulada. Se ve en `solicitud.html#id`: **aprobada** (contacto del hogar de tránsito, punto de encuentro público con mapa y próximos pasos) o **desaprobada** (mensaje cordial + "Aprender sobre Adopción Responsable"). Regla de la demo: casa abierta sin patio → desaprobada; el resto → aprobada.
- [x] Publicar adopción: exige cuenta (si no, popup de login que vuelve a `adopciones.html#publicar`), pide teléfono de contacto (no se muestra en el catálogo) y queda **en revisión**; a los segundos se aprueba, aparece en el catálogo y llega la notificación.
- [x] Notificaciones con enlace ("Ver detalle") y eventos demo que se resuelven solos (`scheduleDemoEvent` y `pushNotification` en `js/main.js`).
- [x] Registro en español ("Registrarme", "Ingresá tu número de teléfono", "Verificar", "Más tarde", "Verificá tu teléfono", "Reenviar código"), igual que recuperar contraseña.
- [x] Apadrinamiento (diagrama de flujo) en `apadrinar.html`: "Apadriná ahora" → monto mensual ($ 2.000 / 5.000 / 10.000 u otro, mínimo $ 500) → fondo general o un rescatado → método de pago (Mercado Pago, transferencia o tarjeta, simulado y sin cobro) → confirmación + notificación. Pide cuenta. Se entra desde Donaciones ("💛 Apadriná ahora") o desde la ficha de una mascota, que llega con ese animal ya elegido.
- [x] Ficha de mascota: muestra cuántos padrinos tiene (los de ejemplo de `js/data.js` + los del usuario, con `getPadrinosCount()`).
- [x] Decidido: el catálogo mantiene las pestañas chicas Todos / Perros / Gatos (más espacio para las tarjetas en mobile y conserva "Todos"), con el texto de Figma "¿Qué preferís adoptar?" encima.
- [x] Decidido: el catálogo de adopciones queda en 1 columna en mobile (se ve mejor), aunque Figma y el ADR-009 muestran 2.
