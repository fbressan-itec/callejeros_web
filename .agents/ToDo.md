# ToDo — Callejeros Río Cuarto (EFI Interfaz de Usuario 2026)

Lista de tareas pendientes del proyecto. Reúne lo que falta hacer, lo que quedó para decidir más adelante y lo que ya se completó.

**Cómo se mantiene:** se actualiza a medida que se trabaja. Cada tarea nueva que surge se agrega en "Pendiente", y cuando se termina se marca `[x]` y se pasa a "Hecho". Los agentes de IA que trabajen en el repo también deben mantenerla al día.

Prioridad: **mobile first** y fidelidad a los bocetos de `imagen_figma/`.

## Pendiente

### Front
- [ ] Revisar las correcciones que encontró el equipo (lista a completar).
- [ ] Mapa de `alerta.html`: por ahora queda el mapa de muestra. Decidir más adelante si se reemplaza por uno real (Leaflet + OpenStreetMap, sin API key) o si se mantiene como maqueta.

### Revisión general mobile first (2026-11-06)
- [ ] `<img src="">` vacíos en las fichas (adopciones y alertas) generan un pedido extra al servidor; sacar el `src` hasta que se cargue la foto.

### Falta respecto a Figma
- [ ] Formulario de adopción: Figma separa **Nombre** y **Apellido** en dos campos; hoy es uno solo ("Nombre Completo"). Opcional.

### Falta respecto al diagrama de flujo
- [ ] **Para la fase de desarrollo (con backend), no en este maquetado:** mejorar la información de Adopción Responsable — hero con foto, filtro de contenido por temas (Perros · Gatos · Cachorros · Adultos mayores), checklist interactivo "¿Estás listo para adoptar?" y costos estimados por mes.

### Sistema de alertas (separado de adopciones)
Objetivo: seguimiento de animales en la calle. Quien ve un animal desamparado lo publica para que otros lo reconozcan (si es su mascota perdida) o puedan ayudarlo (alimento, atención, tránsito). No publica en el catálogo de adopción.
- [ ] Verificar con el equipo si alguien ya trabajó estos cambios (ya están hechos en la rama `fix/bugs-consistencia`).
- [ ] Comentarios reales (que se guarden y los vean otros usuarios): hoy son simulados porque no hay backend. Queda para cuando exista uno.

### Insignias de la ficha de mascota
- [ ] **Para la fase de desarrollo (con backend):** el formulario manda solo las respuestas y el servidor calcula las badges con las mismas reglas que `getPetBadges` (`js/mascota.js`). "Caso urgente" queda pendiente hasta que lo valide un voluntario en la revisión. Está explicado en comentarios en `js/data.js` y `js/adopciones.js`.
- [ ] Thor ahora tiene 9 años (para que haya un Senior de ejemplo), pero su foto es de un cachorro: cambiar la foto por la de un perro mayor.
- [ ] ADR nuevo: insignias solo con ícono SVG (reemplaza el "Sistema de Badges" con texto del ADR-019), grupos de edad Cachorro / Adulto / Senior y convivencia Sí / No / Sin evaluar.

### Mi Cuenta
- [ ] **Para la fase de desarrollo (con backend):** que `mi-cuenta.html` guarde de verdad los cambios (foto, datos, correo, teléfono con verificación por SMS, contraseña, preferencias) y que "Eliminar cuenta" borre la cuenta. Hoy es maquetado.
- [ ] "Mis alertas" y "Mis solicitudes" llevan al mapa y a las notificaciones: falta una lista propia de cada usuario.
- [ ] ADR nuevo: sección Mi Cuenta (página propia con desplegables, mismo estilo que la ficha de mascota).
- [ ] **Para la fase de desarrollo (con backend):** badges de rol "Staff Callejeros" y "Refugio verificado" asignadas solo por el admin, y mostrarlas también donde las ven otros usuarios (comentarios, publicaciones de adopción, alertas). La card de perfil de Mi Cuenta es la que se va a mostrar como perfil público. Hoy el rol se guarda en `user.role` (LocalStorage) y se cambia con "Rol de prueba".
- [ ] Quitar "Alternar Modo Test" en la fase de desarrollo (está comentado en los 14 HTML y en `js/main.js`).
- [ ] Quitar el botón "Rol de prueba" de la card de Mi Cuenta en la fase de desarrollo (está comentado en `mi-cuenta.html`).

### Documentación
- [ ] Alinear `.agents/rules/antigravity_rules.md` y `.agents/memory/engram_memory.json` con el stack real (HTML + Tailwind CDN + JS vanilla + LocalStorage, sin build). Hoy piden Vite + TypeScript + IndexedDB + SPA.
- [ ] README: corregir la lista de archivos de `js/` (nombra `alerta.js`, `notificaciones.js`, `sliders.js` y `global.js`, que no existen), la URL de clonado y sumar las páginas nuevas `noticia.html`, `recuperar.html`, `solicitud.html`, `apadrinar.html`, `mascota.html` y `mi-cuenta.html` (y el nuevo `js/mascota.js`) (también en `docs/contexto/arquitectura.md`).
- [ ] `docs/contexto/arquitectura.md` y el DoD dicen "Google Maps 100% funcional": actualizar según lo que se decida con el mapa.
- [ ] Hacer un diagrama de flujo nuevo y actualizado. El original (`imagen_diagrama_flujo/Callejeros_Ro_IV.png`, hecho en Coggle) quedó como referencia, pero no refleja los cambios posteriores.
- [ ] ADR-020 dice que el registro usa los textos en inglés de Figma ("Verify", "Send Again"); ahora está en español. Registrar el cambio en un ADR nuevo.
- [ ] ADR nuevo: la ficha de mascota pasa de modal a página propia (`mascota.html#id`), fiel a Figma; el cuestionario de adopción se muda a esa página. Actualiza ADR-019 (que describía `#modal-detalle-mascota`).
- [ ] Naranja principal: los docs dicen `#F97316`, la config de Tailwind usa `#ea580c`. Definir cuál queda.

### Entrega / presentación
- [ ] Completar la bitácora de diseño en Google Docs ("Callejeros Río Cuarto — Bitácora de diseño: camino y decisiones de UI/UX", https://docs.google.com/document/d/1e58WfBZ8FOg2GzsJbNegcXcHNGWRbLk1TxNpnEnkr14/edit): revisar las notas ✎, sumar los informes y actividades del grupo y anotar cada cambio significativo de UX/UI. Reemplaza a `bitacora de progreso.docx`.
- [ ] Redactar los "conocimientos implementados" (punto 5 de la Parte 1 de la consigna) en el Documento de Investigación, referenciando la bitácora.
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
- [x] Decidido (este maquetado): quedan como están los botones sin acción ("Consultar por WhatsApp" de la tienda, "Google"/"Facebook" del registro y "Recordarme" del login).
- [x] **Decisión de alcance — Tienda sin carrito.** El diagrama original pedía carrito y pago. Se descarta porque los productos los publican distintos refugios y entidades, cada uno con su propia forma de venta: la plataforma no vende, sino que conecta al comprador con quien publica el producto ("Consultar por WhatsApp"). *(Motivo para el documento de investigación.)*
- [x] **Decisión de alcance — Sin sección de Voluntariado.** El diagrama la dejaba como idea. Se descarta porque la organización de los voluntarios de cada refugio está fuera del alcance de la plataforma. *(Motivo para el documento de investigación.)*
- [x] **Decisión de alcance — Sin comentarios en la ficha de mascota.** El diagrama los incluía; se descartan para esta versión (los comentarios quedan en Alertas y Noticias).
- [x] Donaciones: hero con foto y frase que invita a adoptar ("Adoptar cambia dos vidas…") + 3 tarjetas con foto y frase que se deslizan en mobile, y 6 preguntas frecuentes desplegables.
- [x] Adopción Responsable: sección "Compartí esta guía" con WhatsApp, Facebook, X, "Copiar enlace" y el menú nativo de compartir en celulares.
- [x] Loki tiene 2 fotos en `js/data.js` (`images`), listas para el carrusel de la ficha.
- [x] Ficha de mascota en página completa (`mascota.html#id` + `js/mascota.js`), fiel a Figma: barra superior (< · nombre · ♡), **carrusel de fotos** que se desliza con el dedo (puntitos de 44px, contador "1 / 2" y flechas en desktop), **degradado fijo** con un resumen de 2 líneas (opción A: siempre legible, sin tapar la cara; sin etiquetas para no repetir el Sistema de Badges), Sistema de Badges, padrinos, **info desplegable** cerrada (Descripción / Estado de salud / Notas), "¡Adoptame!", "Donaciones y Apadrinamiento" y "Compartir". El cuestionario de adopción vive en esta página.
- [x] Decidido (UX): el texto sobre la foto va con degradado fijo y no "transparente que se oscurece al tocar", porque en mobile no hay hover, el texto quedaba escondido, no cumplía contraste WCAG AA y chocaba con el gesto de deslizar.
- [x] Descripción de la mascota: al publicar se limita a **400 caracteres** con contador (se pone naranja cerca del límite). En la ficha, el resumen sobre la foto se corta en 2 líneas y aparece **"Ver más"** solo si hace falta: abre el desplegable "Descripción" con el texto completo.
- [x] Menú hamburguesa: "Reportar" pasa a ser **"🚨 Alerta Callejero!"** en rojo, en las 13 páginas con menú.
- [x] Decidido: el catálogo de adopciones queda en 1 columna en mobile (se ve mejor), aunque Figma y el ADR-009 muestran 2.
- [x] **Mi Cuenta** (`mi-cuenta.html`, maquetado no funcional, mobile first): tarjeta de perfil con foto (vista previa al elegirla), nombre, correo y estado del teléfono; "Mi actividad" (favoritos, solicitudes, apadrinamientos y alertas, con contadores del dispositivo); desplegables de Datos personales, Correo, Teléfono, Contraseña, Notificaciones y Privacidad; Cerrar sesión y "Eliminar cuenta" con confirmación. Los guardados muestran un aviso "Vista previa" y no cambian nada. Se entra desde el botón "⚙️ Mi cuenta" del menú (con sesión iniciada); sin sesión pide login y vuelve a la página.
- [x] Mi Cuenta, ajustes de UX: sin texto bajo el título; badges de rol "Staff Callejeros" (ejemplo visible) y "Refugio verificado" (con texto, oculta), y "Miembro de la comunidad" solo para cuentas sin rol. Se descartó una badge para voluntarios de refugios porque no se puede comprobar. El estado del teléfono salió de la card (es pública) y pasó a la fila Teléfono, en ámbar porque es algo pendiente y no un error. Cada desplegable muestra el dato actual y se abre uno a la vez. El menú dice "🛡️ Staff Callejeros" en lugar de "Voluntario Callejeros".
- [x] Favoritos desde Mi Cuenta: `adopciones.html#favoritos` abre el catálogo filtrado (el filtro se mantiene al volver de una ficha). Si no hay favoritos, aparece "Todavía no tenés favoritos" con el botón "Ver mascotas en adopción". Sin chip extra: ya existe "Limpiar Filtros".
- [x] Botón "Rol de prueba" (solo demo) dentro de la card de Mi Cuenta: pasa por Miembro → Staff Callejeros → Refugio verificado y lo guarda en `user.role`. La badge de la card y la etiqueta del menú salen de ese rol (cuenta común: el menú no muestra rol). No se puso en el menú para no cargarlo.
- [x] **Insignias de la ficha de mascota** (reemplazan la grilla "Sistema de Badges" con texto, que repetía "Descripción"): solo íconos SVG de 48px en una caja gris sin título. El significado aparece al pasar el mouse, al tocar o con el teclado, en la línea de abajo de la caja (no en un globito, que en el celular se corta en los bordes). Se usan SVG y no emojis porque el mismo ícono cambia de color. Siempre: especie, sexo, edad, Sociable / Salvaje, con niños, con otros animales y castración. Solo si corresponde: caso urgente (primera) y cuidados de salud. "Con niños" y "Con otros animales" usan el mismo ícono en verde (Sí), ámbar (No) o gris (Sin evaluar); "Descripción" muestra esas dos filas. Se descartó "Tímido": hay perros tímidos que son familiares.
- [x] Edad en 3 grupos, iguales en badges y filtros: **Cachorro** (menos de 1 año), **Adulto** (1 a 7) y **Senior** (más de 7) (`getAgeGroup` en `js/main.js`). Thor pasa a 9 años para que haya un Senior de ejemplo.
- [x] Filtros nuevos: "Sociable con niños" y "Sociable con otros animales" (muestran solo los "Sí").
- [x] Formulario de publicar: edad con número más "Años / Meses" (antes "5 Meses" quedaba como 5 años); selectores "¿Sociable con niños?" y "¿Con otros animales?" que arrancan en "Sin evaluar"; casilla de salud que habilita un campo obligatorio de 150 caracteres (al desmarcarla se vacía); "Salvaje / Tímido" pasa a "Salvaje". Las badges se calculan solas y no hay vista previa, para que no se acomoden las respuestas para "embellecer" la publicación.
