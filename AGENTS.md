# Luxury Cars — AGENTS.md

## Stack
- Sitio estático puro (HTML + CSS + JS vanilla). Sin build, sin package.json, sin servidor. Abre los `.html` directamente en el navegador.

## Páginas
| Ruta | Estado |
|---|---|
| `index.html` | ✅ Inicio — carrusel hero (5 diapositivas, avance automático 5s) |
| `servicios.html` | ✅ Servicios — 4 tarjetas escritas a mano |
| `inventario.html` | ✅ Galería antes/después con 6 trabajos |
| `contacto.html` | ✅ Hero split con WhatsApp y correo |

## Archivos clave
- `css/estilos.css` — todos los estilos, tema oscuro con propiedades CSS personalizadas (`--color-dorado`, etc.), clases kebab-case
- `js/script.js` — lógica del carrusel + IntersectionObserver + addEventListener

## Convenciones
- Idioma: español (nombres de clases, comentarios, contenido)
- Clases CSS: kebab-case
- JS: ES5/ES6, sin framework

## Estructura del proyecto
```
/
├── css/estilos.css
├── js/script.js
├── img/
│   ├── favicon.png
│   ├── logo.png
│   ├── hero/          ← carrusel (5 diapositivas)
│   ├── iconos/        ← servicios, ubicación, whatsapp
│   ├── inventario/    ← antes/después (pendiente fotos reales)
│   └── servicios/     ← hero de servicios (pendiente)
├── docs/
│   ├── bitacora.md
│   └── security_best_practices_report.md
├── .opencode/commands/
│   ├── bitacora.md
│   ├── description.md
│   └── fotos.md
├── index.html
├── servicios.html
├── inventario.html
├── contacto.html
├── opencode.json
├── AGENTS.md
└── skills-lock.json
```

## Gotchas
- No hay herramientas de test/lint/formato configuradas
- Las imágenes en `img/hero/` son placeholders (taller-1.jpg a taller-5.jpg)
- El inventario usa URLs de Unsplash hasta que el usuario tome fotos reales
- `img/inventario/` e `img/servicios/` están vacíos (con `.gitkeep`) esperando fotos reales
