---
name: dom-interactivity
description: Patrones de manipulación ligera del DOM, persistencia en LocalStorage y modales con overlay sin frameworks pesados (el mapa queda maquetado, sin Google Maps).
---

# Dinamismo del DOM Skill (sitio multipágina, sin SPA)

Utilizar esta skill para implementar interactividad rápida y mantenible en `callejeros_web` sin recurrir a frameworks complejos.

## 1. Alternancia de Modo Oscuro (Dark Mode Toggle)
```javascript
const themeToggle = document.getElementById('theme-toggle');
themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
```

## 2. Microinteracción de Favoritos (Persistencia en LocalStorage)
```javascript
function toggleFavorite(petId, btnElement) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const index = favorites.indexOf(petId);
  const isFav = index !== -1;
  
  if (isFav) {
    favorites.splice(index, 1);
  } else {
    favorites.push(petId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateHeartUI(btnElement, !isFav);
}
```

## 3. Modal de Adopción con Overlay
* Bloquear scroll del fondo cuando el modal esté abierto: `document.body.classList.add('overflow-hidden')`.
* Atrapar el foco dentro del modal para accesibilidad.
* Al presionar "Ir al inicio" o la tecla Escape, remover la clase y cerrar el modal.

## 4. Mapa de Alerta Callejeros
* ⚠️ **No integrar Google Maps ni otro servicio de mapas.** En este proyecto el mapa queda maquetado (ver ADR-032 en `docs/contexto/decisiones.md`). La guía siguiente queda solo como referencia para una fase futura, si el grupo lo decide.
* Asegurar que el contenedor `#map` tenga altura CSS antes de llamar a `new google.maps.Map(element, options)`.
* Centralizar marcadores en Río Cuarto (`lat: -33.123, lng: -64.349`).
