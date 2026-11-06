# Glosario y Reglas de Negocio — Callejeros R4

## 1. Tabla de Rotulado Orientado al Usuario (Labeling vs. Dev Jargon)

| Término Técnico / Dev Jargon | Etiqueta en Pantalla (Labeling Natural) | Ubicación / Contexto | Función en la Interfaz |
| :--- | :--- | :--- | :--- |
| `catalogue_view` | **Adoptá un Callejero** | Menú Principal (Nav) | Catálogo general de tarjetas de mascotas disponibles. |
| `submit_adoption` | **¡Adoptame!** / **Adoptar a [Nombre]** | Tarjeta / Detalle | Botón de Acción Principal (CTA) que abre el cuestionario. |
| `badges_system` | **Insignias de Salud y Conducta** | Ficha de Mascota | Etiquetas visuales de estado (Vacunado, Castrado, Sociable, Salvaje). |
| `info_hub` | **Información** | Menú Principal (Nav) | Portal que agrupa "Quiénes Somos" y "Adopción Responsable". |
| `support_module` | **Quiero Colaborar** | Menú Principal / Footer | Módulo con Apadrinamiento y Donaciones solidarias. |
| `recurrent_sub` | **Plan de Apadrinamiento** | Dentro de "Quiero Colaborar" | Aporte periódico destinado al sustento de una mascota puntual. |
| `news_feed` | **Noticias y Eventos** | Menú Principal | Novedades, colectas y jornadas de castración gratuita. |
| `e_commerce` | **Tienda Solidaria** | Menú Principal | Catálogo de productos para financiamiento del sitio y refugios. |
| `create_pet_form` | **Publicar Adopción** | Menú / Área Privada | Formulario para registrar un animal en tránsito o refugio. |
| `alert_map_view` | **Alerta Callejeros** | Menú Principal / FAB | Seguimiento comunitario de animales en la calle: listado de alertas, ficha con comentarios y mapa de muestra (maquetado). |
| `auth_portal` | **Mi Cuenta / Iniciar Sesión** | Barra Superior (Header) | Portal de acceso y gestión para vecinos y rescatistas. |

---

## 2. Reglas de Negocio Nucleares
1. **Regla de Adopción Validada**: Ninguna postulación se envía sin completar las 3 áreas del cuestionario (Contacto, Entorno, Tenencia Responsable).
2. **Regla de Privacidad de Refugios**: Prohibido exponer direcciones físicas o coordenadas exactas en tarjetas de adopción públicas para proteger a los hogares de tránsito.
3. **Regla de Alerta Inmediata**: El reporte de un animal en la vía pública debe ser ejecutable en un máximo de 2 pasos desde el FAB, sin obligar al usuario a iniciar sesión.
4. **Regla de Transparencia Comunitaria**: Cada campaña de recaudación o apadrinamiento debe explicitar el destino específico de los fondos.

---

## 3. Términos del Dominio
* **Hogar de Tránsito**: Residencia temporal que brinda acogida y rehabilitación a un animal rescatado hasta su adopción definitiva.
* **Insignia "Sociable"**: Badge verde que garantiza compatibilidad probada con niños u otros animales.
* **Insignia "Salvaje / Manejo Especial"**: Badge rojo que advierte necesidad de adoptantes experimentados o predios cerrados.
* **FAB (Floating Action Button)**: Botón táctil persistente en esquina inferior derecha que conecta directamente con la emergencia en vía pública.
