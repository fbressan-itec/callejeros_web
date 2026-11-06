# Diagrama de flujo por recorridos — Callejeros Río Cuarto

Segunda versión del diagrama de flujo del sitio actual: un **mapa general** de las secciones y un **diagrama por cada recorrido principal**. Solo muestra lo que hoy existe en el sitio. La primera versión, en un solo diagrama, es `diagrama_flujo_actual.md`, en esta misma carpeta.

Las imágenes exportadas están en la carpeta `recorridos/`, en esta misma carpeta.

**Cómo leerlo**

- Rectángulo: una página del sitio (con su archivo).
- Rectángulo redondeado: un paso o una pantalla dentro de una página.
- Rombo: una decisión (por ejemplo, si hay sesión iniciada).
- Línea punteada: algo que llega solo, simulado por el prototipo (una respuesta o una aprobación).

---

## 1. Mapa general

Desde el inicio y desde el menú hamburguesa (igual en todas las páginas) se llega a cada sección. La campanita de notificaciones y el botón "Volver" también están en todas las páginas internas.

```mermaid
flowchart TD
    INICIO["Inicio<br/><small>index.html</small>"]
    MENU{{"Menú hamburguesa<br/>(en todas las páginas)"}}
    CAMPANA{{"Campanita de notificaciones<br/>(en todas las páginas)"}}

    INICIO --> MENU
    INICIO --> CAMPANA
    INICIO -->|"Carrusel"| R1
    INICIO -->|"Botón flotante"| R3

    MENU --> R1["Adopción<br/><small>adopciones.html · mascota.html · solicitud.html</small>"]
    MENU -->|"Publicar"| R2["Publicar una mascota<br/><small>adopciones.html#publicar</small>"]
    MENU -->|"Alerta Callejero! (rojo)"| R3["Alerta Callejeros<br/><small>alerta.html · reportar-alerta.html</small>"]
    MENU --> RESP["Adopción Responsable<br/><small>adopcion-responsable.html</small>"]
    MENU --> R4["Colaborar<br/><small>donaciones.html · apadrinar.html · tienda.html</small>"]
    MENU --> R5["Noticias y eventos<br/><small>noticias.html · noticia.html</small>"]
    MENU --> QS["Quiénes Somos<br/><small>quienes-somos.html</small>"]
    MENU -->|"Ingresar / Mi cuenta"| R6["Cuenta<br/><small>login.html · registro.html · recuperar.html · mi-cuenta.html</small>"]
    CAMPANA --> R7["Notificaciones<br/><small>notificaciones.html</small>"]
```

---

## 2. Adopción

Del catálogo a la ficha de la mascota, el cuestionario y la respuesta simulada de un voluntario.

```mermaid
flowchart TD
    CATALOGO["Catálogo de adopción<br/><small>adopciones.html</small><br/>Todos / Perros / Gatos, buscador y filtros"]
    FICHA["Ficha de la mascota<br/><small>mascota.html#id</small><br/>fotos, insignias, padrinos y desplegables"]
    SESION{"¿Sesión iniciada?"}
    LOGIN["Iniciar sesión<br/><small>login.html</small>"]
    CUESTIONARIO("Cuestionario de adopción<br/>edad, dirección, localidad,<br/>tipo de vivienda...")
    RECIBIDA("Notificación<br/>'Recibimos tu solicitud'")
    SOLICITUD["Respuesta a la solicitud<br/><small>solicitud.html#id</small>"]
    APROBADA("Aprobada<br/>contacto del hogar de tránsito,<br/>punto de encuentro y próximos pasos")
    DESAPROBADA("Desaprobada<br/>mensaje cordial con el motivo")
    RESP["Adopción Responsable<br/><small>adopcion-responsable.html</small>"]
    DONAR["Donaciones<br/><small>donaciones.html</small>"]
    APADRINAR["Apadrinar a esta mascota<br/><small>apadrinar.html</small>"]

    CATALOGO -->|"Tocar una tarjeta"| FICHA
    FICHA -->|"¡Adoptame!"| SESION
    SESION -->|"No"| LOGIN
    LOGIN -->|"Vuelve a la ficha"| FICHA
    SESION -->|"Sí"| CUESTIONARIO
    CUESTIONARIO -->|"Enviar"| RECIBIDA
    RECIBIDA -.->|"Respuesta simulada a los ~8 s"| SOLICITUD
    SOLICITUD --> APROBADA
    SOLICITUD --> DESAPROBADA
    DESAPROBADA -->|"Aprender sobre Adopción Responsable"| RESP
    DESAPROBADA -->|"Otras formas de ayudar"| DONAR
    FICHA -->|"Donaciones y Apadrinamiento"| APADRINAR
```

---

## 3. Publicar una mascota en adopción

Pide cuenta y pasa por la revisión de un voluntario antes de aparecer en el catálogo.

```mermaid
flowchart TD
    ENTRADA["Menú: Publicar<br/><small>adopciones.html#publicar</small>"]
    SESION{"¿Sesión iniciada?"}
    LOGIN["Iniciar sesión<br/><small>login.html</small>"]
    FORM("Formulario de publicar<br/>foto obligatoria, especie, edad, sexo,<br/>castración, sociabilidad, convivencia,<br/>salud, descripción y teléfono")
    REVISION("En revisión<br/>un voluntario la revisa")
    PUBLICADA("Aprobada<br/>aparece en el catálogo con sus insignias<br/>calculadas a partir de las respuestas")
    NOTIF("Notificación al usuario")
    CATALOGO["Catálogo de adopción<br/><small>adopciones.html</small>"]

    ENTRADA --> SESION
    SESION -->|"No"| LOGIN
    LOGIN -->|"Vuelve al formulario"| FORM
    SESION -->|"Sí"| FORM
    FORM -->|"Publicar"| REVISION
    REVISION -.->|"Aprobación simulada a los segundos"| PUBLICADA
    PUBLICADA --> NOTIF
    PUBLICADA --> CATALOGO
```

---

## 4. Alerta Callejeros

El seguimiento de los animales que están en la calle. Publicar una alerta no pide cuenta.

```mermaid
flowchart TD
    MENU["Menú: Alerta Callejero!"]
    FAB["Botón flotante<br/>(inicio y Alerta Callejeros)"]
    ALERTAS["Alerta Callejeros<br/><small>alerta.html</small><br/>mapa (maqueta) y listado, más reciente primero"]
    FILTRO("Filtrar por situación<br/>Perdido · Avistado · Emergencia")
    FICHA["Ficha de la alerta<br/><small>alerta.html#id</small><br/>foto, ubicación, contacto<br/>y comentarios de vecinos"]
    CONTACTO("Llamar · Copiar teléfono")
    REPORTAR["Reportar alerta<br/><small>reportar-alerta.html</small>"]
    FORM("Formulario<br/>foto obligatoria, situación, especie,<br/>ubicación, descripción y teléfono")
    LISTADO("Alerta publicada<br/>'Ver en el listado'")

    MENU --> ALERTAS
    ALERTAS --> FILTRO
    FILTRO --> ALERTAS
    ALERTAS -->|"Tocar una tarjeta o un marcador"| FICHA
    FICHA --> CONTACTO
    FAB --> REPORTAR
    REPORTAR --> FORM
    FORM -->|"Publicar"| LISTADO
    LISTADO -->|"alerta.html#listado"| ALERTAS
```

---

## 5. Colaborar

Formas de ayudar sin adoptar: donar, apadrinar y comprar en la tienda solidaria.

```mermaid
flowchart TD
    DONACIONES["Donaciones<br/><small>donaciones.html</small><br/>portada, formas de ayudar<br/>y preguntas frecuentes"]
    FICHA["Ficha de una mascota<br/><small>mascota.html#id</small>"]
    APADRINAR["Apadrinar<br/><small>apadrinar.html</small>"]
    SESION{"¿Sesión iniciada?"}
    LOGIN["Iniciar sesión<br/><small>login.html</small>"]
    P1("Paso 1<br/>monto mensual<br/>$ 2.000 / 5.000 / 10.000 u otro")
    P2("Paso 2<br/>fondo general o un rescatado")
    P3("Paso 3<br/>método de pago (simulado)<br/>Mercado Pago, transferencia o tarjeta")
    OK("Confirmación + notificación")
    TIENDA["Tienda solidaria<br/><small>tienda.html</small>"]
    WHATSAPP("Consultar por WhatsApp<br/>con quien publica el producto")

    DONACIONES -->|"Apadriná ahora"| APADRINAR
    FICHA -->|"Donaciones y Apadrinamiento<br/>(llega con la mascota elegida)"| APADRINAR
    APADRINAR --> SESION
    SESION -->|"No"| LOGIN
    LOGIN -->|"Vuelve a Apadrinar"| APADRINAR
    SESION -->|"Sí"| P1 --> P2 --> P3 --> OK
    TIENDA --> WHATSAPP
```

---

## 6. Noticias y eventos

```mermaid
flowchart TD
    NOTICIAS["Noticias y eventos<br/><small>noticias.html</small>"]
    NOTICIA["Noticia completa<br/><small>noticia.html#id</small><br/>con foto y comentarios"]

    NOTICIAS -->|"Tocar una tarjeta"| NOTICIA
```

---

## 7. Cuenta

Iniciar sesión, registrarse, recuperar la contraseña y administrar la cuenta. Cuando otra página pide la sesión, al terminar se vuelve a esa página.

```mermaid
flowchart TD
    MENU["Menú hamburguesa"]
    LOGIN["Iniciar sesión<br/><small>login.html</small>"]
    REG["Registro<br/><small>registro.html</small>"]
    REG1("Paso 1: datos personales")
    REG2("Paso 2: teléfono")
    REG3("Paso 3: código de verificación")
    REC["Recuperar contraseña<br/><small>recuperar.html</small>"]
    REC1("Elegir email o teléfono")
    REC2("Código de 4 dígitos")
    REC3("Nueva contraseña")
    VUELVE("Vuelve a la página<br/>que pidió la sesión (o al inicio)")
    MICUENTA["Mi Cuenta<br/><small>mi-cuenta.html</small><br/>perfil, mi actividad y configuración<br/>(maquetado: no guarda cambios)"]
    ACT("Mi actividad<br/>favoritos, solicitudes,<br/>apadrinamientos y alertas")
    CONF("Configuración en desplegables<br/>datos, correo, teléfono, contraseña,<br/>notificaciones y privacidad")
    SALIR("Cerrar sesión · Eliminar cuenta<br/>(con confirmación)")

    MENU -->|"Sin sesión: Ingresar"| LOGIN
    MENU -->|"Con sesión: Mi cuenta"| MICUENTA
    LOGIN -->|"Ingresar"| VUELVE
    LOGIN -->|"Registrate acá"| REG
    REG --> REG1 --> REG2 --> REG3
    REG2 -->|"Más tarde"| VUELVE
    REG3 -->|"Verificar"| VUELVE
    LOGIN -->|"¿Olvidaste tu clave?"| REC
    REC --> REC1 --> REC2 --> REC3
    REC3 -->|"Contraseña cambiada"| LOGIN
    MICUENTA --> ACT
    MICUENTA --> CONF
    MICUENTA --> SALIR
```

---

## 8. Notificaciones

```mermaid
flowchart TD
    CAMPANA{{"Campanita<br/>(contador de no leídas)"}}
    PANEL("Panel con las últimas 5")
    HISTORIAL["Historial de notificaciones<br/><small>notificaciones.html</small>"]
    DETALLE("Ver detalle")
    SOLICITUD["Respuesta a una solicitud<br/><small>solicitud.html#id</small>"]
    OTRA["Página relacionada<br/>(mascota publicada, apadrinamiento...)"]

    CAMPANA --> PANEL
    PANEL -->|"Ver todas las notificaciones"| HISTORIAL
    HISTORIAL -->|"En cada aviso"| DETALLE
    DETALLE --> SOLICITUD
    DETALLE --> OTRA
```
