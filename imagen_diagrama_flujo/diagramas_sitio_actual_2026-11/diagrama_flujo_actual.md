# Diagrama de flujo actual — Callejeros Río Cuarto

Páginas y recorridos principales del sitio tal como está hoy. Reemplaza como referencia al diagrama original hecho en Coggle (`../Callejeros_Ro_IV.png`, en la carpeta de arriba), que se conserva para comparar en la presentación.

**Cómo leerlo**

- Rectángulo: una página del sitio (con su archivo).
- Rectángulo redondeado: un paso o una pantalla dentro de una página.
- Rombo: una decisión (por ejemplo, si hay sesión iniciada).
- Línea punteada: algo que pedía el diagrama original y se descartó a propósito, o un evento simulado que llega solo.

Imagen exportada: `diagrama_flujo_actual.png` (en esta misma carpeta).

El menú hamburguesa, la campanita de notificaciones y el botón "Volver" están en todas las páginas internas, así que el diagrama los muestra una sola vez.

```mermaid
flowchart TD
    %% ===== Entrada y navegación común =====
    INICIO["Inicio<br/><small>index.html</small>"]
    MENU{{"Menú hamburguesa<br/>(igual en todas las páginas)"}}
    CAMPANA{{"Campanita de notificaciones<br/>(panel con las últimas 5)"}}

    INICIO -->|"Carrusel: Loki, Luna"| FICHA
    INICIO -->|"Botón flotante"| REPORTAR
    INICIO --> MENU
    INICIO --> CAMPANA

    MENU --> CATALOGO
    MENU -->|"Publicar"| PUB_SESION
    MENU -->|"Alerta Callejero! (rojo)"| ALERTAS
    MENU --> RESPONSABLE
    MENU --> DONACIONES
    MENU --> TIENDA
    MENU --> NOTICIAS
    MENU --> QUIENES
    MENU -->|"Sin sesión: Ingresar"| LOGIN
    MENU -->|"Con sesión: Mi cuenta"| MICUENTA

    QUIENES["Quiénes Somos<br/><small>quienes-somos.html</small>"]
    RESPONSABLE["Adopción Responsable<br/><small>adopcion-responsable.html</small><br/>guía + Compartí esta guía"]

    %% ===== Adopción =====
    subgraph ADOPCION["Adopción"]
        CATALOGO["Catálogo de adopción<br/><small>adopciones.html</small><br/>Todos / Perros / Gatos, buscador, filtros"]
        FICHA["Ficha de la mascota<br/><small>mascota.html#id</small><br/>fotos, insignias, padrinos, desplegables"]
        ADOP_SESION{"¿Sesión iniciada?"}
        CUESTIONARIO("Cuestionario de adopción<br/>edad, dirección, tipo de vivienda...")
        RECIBIDA("Notificación<br/>'Recibimos tu solicitud'")
        SOLICITUD["Respuesta a la solicitud<br/><small>solicitud.html#id</small>"]
        APROBADA("Aprobada<br/>contacto del hogar de tránsito,<br/>punto de encuentro y próximos pasos")
        DESAPROBADA("Desaprobada<br/>mensaje cordial con el motivo")

        CATALOGO -->|"Tarjeta"| FICHA
        FICHA -->|"¡Adoptame!"| ADOP_SESION
        ADOP_SESION -->|"Sí"| CUESTIONARIO
        CUESTIONARIO -->|"Enviar"| RECIBIDA
        RECIBIDA -.->|"respuesta simulada a los ~8 s"| SOLICITUD
        SOLICITUD --> APROBADA
        SOLICITUD --> DESAPROBADA
    end

    FICHA -->|"Donaciones y Apadrinamiento"| APADRINAR
    DESAPROBADA -->|"Aprender sobre Adopción Responsable"| RESPONSABLE
    DESAPROBADA -->|"Otras formas de ayudar"| DONACIONES

    %% ===== Publicar una mascota =====
    subgraph PUBLICAR["Publicar una mascota en adopción"]
        PUB_SESION{"¿Sesión iniciada?"}
        PUB_FORM("Formulario de publicar<br/><small>adopciones.html#publicar</small><br/>foto obligatoria, teléfono, salud y convivencia")
        REVISION("En revisión<br/>un voluntario la aprueba")
        PUBLICADA("Aparece en el catálogo<br/>con insignias calculadas solas")

        PUB_SESION -->|"Sí"| PUB_FORM
        PUB_FORM -->|"Publicar"| REVISION
        REVISION -.->|"aprobación simulada + notificación"| PUBLICADA
    end
    PUBLICADA --> CATALOGO

    %% ===== Alerta Callejeros =====
    subgraph ALERTA["Alerta Callejeros (animales en la calle)"]
        ALERTAS["Alerta Callejeros<br/><small>alerta.html</small><br/>mapa (maqueta) + listado, más reciente primero<br/>filtros: Perdido / Avistado / Emergencia"]
        FICHA_ALERTA["Ficha de la alerta<br/><small>alerta.html#id</small><br/>contacto + comentarios de vecinos"]
        REPORTAR["Reportar alerta<br/><small>reportar-alerta.html</small><br/>foto obligatoria, situación, especie,<br/>ubicación, descripción, teléfono"]

        ALERTAS -->|"Tarjeta o marcador del mapa"| FICHA_ALERTA
        ALERTAS -->|"Botón flotante"| REPORTAR
        REPORTAR -->|"Publicar: Ver en el listado"| ALERTAS
    end

    %% ===== Colaborar =====
    subgraph COLABORAR["Colaborar"]
        DONACIONES["Donaciones<br/><small>donaciones.html</small><br/>portada, formas de ayudar, preguntas frecuentes"]
        APADRINAR["Apadrinar<br/><small>apadrinar.html</small>"]
        APA_SESION{"¿Sesión iniciada?"}
        APA_1("Paso 1: monto mensual")
        APA_2("Paso 2: fondo general o un rescatado")
        APA_3("Paso 3: método de pago (simulado)")
        APA_OK("Confirmación + notificación")
        TIENDA["Tienda solidaria<br/><small>tienda.html</small>"]
        WHATSAPP("Consultar por WhatsApp<br/>con quien publica el producto")
        CARRITO("Carrito y pago"):::descartado

        DONACIONES -->|"Apadriná ahora"| APADRINAR
        APADRINAR --> APA_SESION
        APA_SESION -->|"Sí"| APA_1 --> APA_2 --> APA_3 --> APA_OK
        TIENDA --> WHATSAPP
        TIENDA -.->|"descartado"| CARRITO
    end

    %% ===== Noticias =====
    subgraph NOVEDADES["Noticias y eventos"]
        NOTICIAS["Noticias<br/><small>noticias.html</small>"]
        NOTICIA["Noticia completa<br/><small>noticia.html#id</small><br/>con comentarios"]
        NOTICIAS --> NOTICIA
    end

    %% ===== Notificaciones =====
    CAMPANA -->|"Ver todas las notificaciones"| NOTIFICACIONES["Historial de notificaciones<br/><small>notificaciones.html</small>"]
    NOTIFICACIONES -->|"Ver detalle"| SOLICITUD

    %% ===== Cuenta =====
    subgraph CUENTA["Cuenta"]
        LOGIN["Iniciar sesión<br/><small>login.html</small>"]
        REGISTRO["Registro en 3 pasos<br/><small>registro.html</small><br/>datos → teléfono → código"]
        RECUPERAR["Recuperar contraseña<br/><small>recuperar.html</small><br/>email o teléfono → código → nueva contraseña"]
        VUELVE("Vuelve a la página<br/>desde la que se pidió la sesión")
        MICUENTA["Mi Cuenta<br/><small>mi-cuenta.html</small><br/>perfil, mi actividad, configuración<br/>(maquetado: no guarda cambios)"]

        LOGIN -->|"Registrate acá"| REGISTRO
        LOGIN -->|"¿Olvidaste tu clave?"| RECUPERAR
        RECUPERAR --> LOGIN
        LOGIN -->|"Ingresar"| VUELVE
        REGISTRO -->|"Registrarme"| VUELVE
    end

    %% Pedidos de sesión: van fuera de los grupos para que "Iniciar sesión" quede en Cuenta
    ADOP_SESION -->|"No"| LOGIN
    PUB_SESION -->|"No"| LOGIN
    APA_SESION -->|"No"| LOGIN

    MICUENTA -->|"Favoritos"| CATALOGO
    MICUENTA -->|"Solicitudes"| NOTIFICACIONES
    MICUENTA -->|"Apadrinamientos"| APADRINAR
    MICUENTA -->|"Mis alertas"| ALERTAS

    %% ===== Descartado del diagrama original =====
    VOLUNTARIADO("Sección de Voluntariado"):::descartado
    MENU -.->|"descartado"| VOLUNTARIADO

    classDef descartado fill:#f1f5f9,stroke:#94a3b8,stroke-dasharray:5 5,color:#64748b
```

## Cambios respecto del diagrama original

| Diagrama original (Coggle) | Sitio actual |
|---|---|
| Catálogo separado para perros y para gatos | Un solo catálogo con pestañas Todos / Perros / Gatos, buscador y filtros |
| Comentarios en la ficha de la mascota | Sin comentarios en la ficha; quedan en Alertas y Noticias |
| Alerta / Reportes "en desarrollo (ver ideas)" | Sistema propio: listado, mapa (maqueta), ficha con comentarios y formulario de reporte |
| Tienda con carrito y pago | Sin carrito: "Consultar por WhatsApp" con quien publica el producto |
| "Ver de agregar sección de voluntariados" | Descartada: fuera del alcance de la plataforma |
| Login / Registro → Home | Login y registro vuelven a la página desde la que se pidió la sesión; se suman Recuperar contraseña y Mi Cuenta |
| — | Notificaciones (campanita e historial) y respuesta simulada a solicitudes y publicaciones |
