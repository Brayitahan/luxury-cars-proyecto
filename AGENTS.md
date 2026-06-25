# Luxury Cars — AGENTS.md

## Stack
- Sitio estático puro (HTML + CSS + JS vanilla). Sin build, sin package.json, sin servidor. Abre los `.html` directamente en el navegador.

## Páginas
| Ruta | Estado |
|---|---|
| `index.html` | ✅ Inicio — carrusel hero (5 diapositivas, avance automático 5s) |
| `servicios.html` | ✅ Servicios — 4 tarjetas escritas a mano |
| `inventario.html` | ❌ **No existe** — enlazada en el nav |
| `contacto.html` | ❌ **No existe** — enlazada en el nav |

## Archivos clave
- `css/estilos.css` — todos los estilos, tema oscuro con propiedades CSS personalizadas (`--color-dorado`, etc.), clases kebab-case
- `js/script.js` — lógica del carrusel (siguiente/anterior + `setInterval`)
- `data/servicios.json` — datos de servicios (JSON), **no usado** por las páginas HTML actuales (las tarjetas están escritas a mano)
- `data/index.html`, `data/servicios.html` — copias obsoletas de los HTML raíz; probablemente desactualizadas

## Convenciones
- Idioma: español (nombres de clases, comentarios, contenido)
- Clases CSS: kebab-case
- JS: ES5/ES6, sin framework, `onclick` en línea en el HTML para los botones del carrusel

## Gotchas
- No hay `.gitignore`, no hay `.git` — los comandos git fallarán a menos que se inicialice
- No hay herramientas de test/lint/formato configuradas
- Las imágenes en `img/` son placeholders según `img/README.txt`
- Los duplicados en `data/` probablemente están muertos — edita los `.html` raíz, no los de `data/`
