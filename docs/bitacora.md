# Bitácora — Luxury Cars

> Sitio web estático (HTML + CSS + JS vanilla) para un taller automotriz de lujo.
> Repositorio: `Brayitahan/luxury-cars-proyecto`

---

## Sesión 1 — Fundación del proyecto

- Inicializado repositorio Git (commit inicial, 28 archivos)
- Creado `.gitignore`
- Conectado a GitHub (`Brayitahan/luxury-cars-proyecto`)
- Rama `master` (estable) + `develop` (trabajo)
- Subido código inicial
- Skills instalados: `frontend-design`, `security-best-practices`

**Commits:** `b283813`

---

## Sesión 2 — Refactor de frontend

- Tipografía refinada (300 body, 600–700 headings)
- Hero renovado, indicadores cliqueables, título "Lujo Automotriz — Hecho a Mano"
- Animaciones IntersectionObserver, divisor dorado con rombo
- Micro-interacciones (hover cards, nav underline, botones con sombra)
- Responsive ≤768px
- Fix: script.js faltante en servicios.html

**Commits:** `5582357`, `c9b14f2`

---

## Sesión 3 — Secciones completas de Servicios

Agregado a servicios.html:
- Banner de entrada con overlay
- Texto introductorio
- Por qué Elegirnos (3 columnas)
- Cómo Trabajamos (4 pasos)
- Ubicación y Horarios (con Google Maps)
- Testimonios (3 tarjetas)
- CTA WhatsApp reemplazado por Ubicación + Testimonios

**Commits:** `f1718bc`, `48a46e8`, `270474a`

---

## Sesión 4 — Seguridad y buenas prácticas

- Análisis con skill `security-best-practices`
- Reporte generado
- CSP agregado a index.html y servicios.html
- `onclick` migrados a `addEventListener`
- Null check en botones del carrusel

**Commits:** `a0f121f`, `b6a02cc`, `00031d3`

---

## Sesión 5 — SEO, favicon y configuración

- Meta tags SEO y Open Graph
- Favicon personalizado (48×48)
- opencode.json con MCP Context7
- .vscode/settings.json
- Tarjetas Polichada y Cerámica marcadas "No disponible"

---

## Sesión 6 — Bitácora del proyecto

- Creado `docs/bitacora.md`
- Creado comando OpenCode `bitacora`

**Commits:** `630625c`

---

## Sesión 7 — Página de Inventario

- Banner "Antes y Después"
- 6 tarjetas con antes/después (BMW, Mercedes, Audi, Porsche, Lexus, Range Rover)
- Imágenes placeholder Unsplash
- Guard en `mostrarSlide` para páginas sin carrusel

**Commits:** `2344d3b`

---

## Sesión 8 — Página de Contacto

- Hero split (texto + panel decorativo con círculos concéntricos)
- WhatsApp: `wa.me/573043228031`
- Correo: `unadostrescuatro5@gmail.com`
- Sección "Estamos Aquí para Ti" con tarjetas de contacto
- Responsive: panel decorativo se oculta en móvil

**Commits:** `87fa43e`

---

## Sesión 9 — Heroes únicos para cada página

**Problema:** servicios, inventario y contacto compartían el mismo banner genérico.

| Página | Hero |
|---|---|
| Servicios | Tipográfico con tags — fondo oscuro + patrón diagonal, los 4 servicios como tags interactivos |
| Inventario | Grid 2×2 de imágenes del taller con zoom hover |
| Contacto | Split 50/50: texto + panel con patrón dorado y círculos concéntricos |

**Commits:** `d9ee92b`

---

## Sesión 10 — Home completo y footer rediseñado

Secciones agregadas al home:
1. Bienvenido (eliminado después en sesión 13)
2. Servicios Rápidos (4 tarjetas link a servicios.html)
3. Números (10+ años, 500+ autos, 98% clientes)
4. CTA Final → inventario.html

Footer rediseñado con logo + navegación + horarios + divisor dorado.

**Commits:** `673e1a3`, `c869787`

---

## Sesión 11 — Mejora visual de tarjetas de servicios

- Patrón de diamante CSS al fondo (costura de asientos de lujo)
- Números decorativos 01–04 como watermark
- Línea dorada bajo título que se expande al hover
- Enlace "Saber más" (eliminado después en sesión 12)

**Commits:** `5510422`, `4039fff`

---

## Sesión 12 — Footer unificado y limpieza

- Footer nuevo replicado en servicios.html, inventario.html y contacto.html
- Script.js movido al final del body en todas las páginas
- Enlace "Saber más" eliminado de HTML y CSS

**Commits:** `1663612`

---

## Sesión 13 — Limpieza general de redundancias

| Cambio | Motivo |
|---|---|
| ❌ Bienvenido eliminado | Hero ya cumple ese rol |
| ✂️ Servicios Rápidos simplificados | Solo icono + título, sin descripción |
| ❌ Horarios quitados de Ubicación | Ya están en el footer |
| ❌ CSS muerto eliminado | `banner-seccion`, `banner-contenido`, `info-horarios`, `fila-horario`, `bienvenido` y responsive |
| ♻️ Hover de tarjetas unificado | 6 clases comparten el mismo patrón mediante selectores agrupados |
| ❌ Carpeta `data/` eliminada | 3 archivos obsoletos |
| — CTA Final, Elegirnos + Cómo Trabajamos, Testimonios | Mantenidos |

Backup pusheado a GitHub antes de los cambios.

**Commits:** `7f0a76b`

---

## Sesión 14 — Fix centrado de iconos y ubicación

- `.icono-servicio` y `.servicio-rapido-icono`: `display: block; margin: 0 auto` para centrado forzado
- `.grid-ubicacion`: cambiado de grid a flex con `justify-content: center` para centrar la tarjeta única

**Commits:** `8e7fca4`

---

---

## Sesión 15 — SEO, `<main>`, heading hierarchy y aria

- `<h1>` único agregado a servicios, inventario, contacto y admin
- `<main>` semántico envuelve el contenido principal en las 5 páginas
- `aria-current="page"` en el nav activo de todas las páginas
- Footer `<h4>` migrado a `<h3>` en todas las páginas (jerarquía correcta h1→h2→h3)
- Hero de servicios: título `<h2>`→`<h1>`; sección "Cómo Trabajamos" `<h4>`→`<h3>`
- Hero de inventario y contacto: `<h2>`→`<h1>`
- Admin gate y panel: `<h2>`→`<h1>` (mutuamente excluyentes)

**Commits:** `c31a4a0`

---

## Sesión 16 — Migración a PostgreSQL + Railway

- Migrada persistencia de JSON files a PostgreSQL (`db.js`)
- Creado `db.js`: pool de conexiones, inicialización de tablas (`trabajos`, `comentarios`), seed data
- `server.js` actualizado: rutas usan `db.query()` en lugar de `leerJSON`/`guardarJSON`
- Agregado `pg` a dependencias
- Conectado a Railway proyecto `innovative-charm`
- Agregado PostgreSQL al proyecto Railway
- Seed data: 3 trabajos (BMW, Mustang, Porsche) y 5 comentarios desde PostgreSQL

**Commits:** (pendiente)

---

## Estado actual del proyecto

### Páginas
| Ruta | Estado |
|---|---|
| `index.html` | ✅ Completo — carrusel hero + mapa + números + CTA + h1 + main + aria-current |
| `servicios.html` | ✅ Completo — hero tipográfico, tarjetas con textura, proceso, ubicación, testimonios, h1, main, aria-current |
| `inventario.html` | ✅ Completo — hero parallax grid, galería dinámica + lightbox + h1 + main + aria-current |
| `contacto.html` | ✅ Completo — hero split, WhatsApp y correo + h1 + main + aria-current |
| `admin.html` | ✅ Panel protegido con JWT, CRUD inventario + h1 + main + aria-current |

### Archivos clave
- `css/estilos.css` — tema oscuro con props CSS personalizadas (`--color-dorado`)
- `js/script.js` — carrusel, IntersectionObserver, addEventListener
- `js/inventario.js` — galería dinámica con lightbox y parallax
- `js/admin.js` — login JWT, CRUD trabajos, edición/deleción
- `server.js` — API REST Express (puerto 3000), multer, JWT, rate-limit, helmet, file-type
- `docs/bitacora.md` — este documento

### Pendientes
- Dirección en Ubicación es placeholder — el usuario debe actualizarla
- Imágenes en `img/` son placeholders
- No hay herramientas de test/lint/formato configuradas
