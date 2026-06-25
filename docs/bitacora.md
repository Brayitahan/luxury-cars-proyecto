# Bitácora — Luxury Cars

> Sitio web estático (HTML + CSS + JS vanilla) para un taller automotriz de lujo.
> Repositorio: `Brayitahan/luxury-cars-proyecto`

---

## Sesión 1 — Fundación del proyecto

### Git y GitHub
- Inicializado repositorio Git con commit inicial (28 archivos)
- Creado `.gitignore` en raíz
- Conectado a GitHub como `Brayitahan`, repo: `luxury-cars-proyecto`
- Rama `master` (estable) protegida; todo el trabajo se hace en `develop`
- Subido código inicial a GitHub

### Skills de OpenCode instalados
- `frontend-design` — guía de diseño visual y toma de decisiones estéticas
- `security-best-practices` — análisis de seguridad automatizado

---

## Sesión 2 — Refactor de frontend

### Diseño visual y UI
- Refactor completo de `css/estilos.css`: tipografía refinada con escala de pesos intencional (300 body, 600–700 headings)
- Hero renovado: título "Lujo Automotriz — Hecho a Mano"
- Indicadores (dots) cliqueables para el carrusel
- Divisor dorado con rombo como firma visual entre secciones
- Animaciones de entrada al hacer scroll mediante IntersectionObserver en `js/script.js`
- Micro-interacciones: borde dorado superior en tarjetas al hover, nav con subrayado animado dorado, botones con sombra dorada y efecto elevación
- Scroll suave en toda la página
- Media queries responsive para ≤768px (header, hero, botones, flechas, grid)

### Fixes
- Agregado `<script src="js/script.js">` faltante en `servicios.html` (las tarjetas no se renderizaban)

### Commits
- `5582357` — refactor frontend completo
- `c9b14f2` — fix: script.js faltante en servicios.html

---

## Sesión 3 — Secciones completas de Servicios

Agregadas a `servicios.html`:
1. **Banner de entrada** — imagen de fondo con título y overlay oscuro
2. **Texto introductorio** — párrafo entre título y tarjetas explicando los servicios
3. **Por qué Elegirnos** — 3 columnas (Experiencia, Garantía, Atención Personalizada)
4. **Cómo Trabajamos** — 4 pasos numerados (Diagnóstico → Reparación → Control de Calidad → Entrega)
5. **Ubicación y Horarios** — dirección, horarios con link a Google Maps
6. **Testimonios** — 3 tarjetas con comilla decorativa y reseñas de clientes

### Cambios adicionales
- CTA de WhatsApp reemplazado por secciones de Ubicación + Testimonios
- Link de Google Maps actualizado: `https://maps.app.goo.gl/kz5e8yXtMKkfyWht7`

### Commits
- `f1718bc` — feat: agrega banner, intro, por qué elegirnos, proceso y CTA WhatsApp
- `48a46e8` — feat: reemplaza CTA por ubicación+horarios y agrega testimonios
- `270474a` — fix: actualiza link de Google Maps

---

## Sesión 4 — Seguridad y buenas prácticas

### Análisis de seguridad
- Ejecutado análisis con skill `security-best-practices`
- Reporte generado en `security_best_practices_report.md`
- Sin vulnerabilidades críticas

### CSP (Content Security Policy)
- Agregado meta tag CSP a `index.html` y `servicios.html` para mitigar XSS
- Fix: agregado `'unsafe-inline'` a `style-src` porque el carrusel usa estilos inline
- Commit: `a0f121f`, `b6a02cc`

### Migración de eventos JS
- Migrados todos los `onclick` inline del HTML a `addEventListener` en `script.js`
- Mejora de mantenibilidad y seguridad
- Commit: `a0f121f`

### Fix: null check en carrusel
- Corregido error: `getElementById("btn-anterior")` rompía el script en `servicios.html` porque esa página no tiene botones de carrusel
- Agregado null check antes de asignar eventos
- Commit: `00031d3`

---

## Sesión 5 — SEO, responsive y configuración

### SEO
- Agregados `<meta name="description">`, `<meta name="keywords">`, Open Graph tags y `<link rel="icon">` en `index.html` y `servicios.html`

### Favicon
- Imagen personalizada del usuario redimensionada a 48×48 y enlazada como `img/favicon.png`

### Configuración del proyecto
- **OpenCode**: creado `opencode.json` con configuración MCP de Context7 (remoto) y comando personalizado `description` en `.opencode/commands/`
- **VS Code**: creado `.vscode/settings.json` con `json.schemaDownload.enable` y `workbench.trustedDomains` para que el schema de opencode.json cargue sin error

### Marcado visual en servicios
- Tarjetas de Polichada y Cerámica marcadas como "No disponible" con badge rojo y opacidad reducida (clases `no-disponible` / `badge-no-disponible`)

---

## Sesión 6 — Bitácora del proyecto

### Creación de `docs/bitacora.md`
- Documento que registra todas las sesiones de trabajo con detalle
- Creado también el comando de OpenCode `bitacora` en `.opencode/commands/bitacora.md`

### Commit
- `630625c` — feat: crea bitácora del proyecto y comando bitacora en opencode

---

---

## Sesión 7 — Página de Inventario (galería antes/después)

### Creación de `inventario.html`
- Banner con título "Antes y Después — El resultado habla por sí solo"
- Galería con 6 tarjetas de trabajos realizados:
  - BMW Serie 3 (pintura completa)
  - Mercedes-Benz Clase C (latonería y pintura)
  - Audi A4 (pulido y detallado)
  - Porsche 911 (pintura personalizada)
  - Lexus IS (restauración de faros y pulido)
  - Range Rover Sport (latonería completa)
- Cada tarjeta tiene: nombre del auto, servicio realizado, comparación lado a lado (antes/después) con etiquetas diferenciadas por color, descripción del trabajo
- Animaciones fade-in heredadas del resto del sitio
- Imágenes placeholder de Unsplash (CSP actualizado para permitirlas)
- Diseño responsive: en móvil las columnas se apilan

### CSS agregado
- Estilos para `.inventario`, `.grid-trabajos`, `.trabajo-card`, `.comparacion`, `.foto`, `.etiqueta`, `.trabajo-titulo`, `.trabajo-servicio`, `.trabajo-descripcion`
- Hover con borde dorado superior y transformación (consistente con tarjetas de servicios)

### Fix en script.js
- Agregado `guard` en `mostrarSlide` para páginas que no tienen slides del carrusel

### Commit
- `2344d3b` — feat: crea página de inventario con galería antes/después

---

## Estado actual del proyecto

### Páginas
| Ruta | Estado |
|---|---|
| `index.html` | ✅ Completo — carrusel hero (5 diapositivas, avance automático 5s) |
| `servicios.html` | ✅ Completo — banner, 4 tarjetas, por qué elegirnos, proceso, ubicación, testimonios |
| `inventario.html` | ✅ Completo — galería antes/después con 6 trabajos |
| `contacto.html` | ❌ No existe — enlazado en el nav |

### Archivos clave
- `css/estilos.css` — ~920 líneas, tema oscuro con propiedades CSS personalizadas (`--color-dorado`, etc.)
- `js/script.js` — carrusel, IntersectionObserver, addEventListener
- `data/` — contiene copias obsoletas de los HTML raíz y `servicios.json` (no usado)

### Pendientes / recordatorios
- ~~Número de WhatsApp en placeholder (`573001234567`)~~ → ya actualizado en contacto.html (`3043228031`)
- Dirección en Ubicación es placeholder — el usuario debe actualizarla
- Testimonios actuales son placeholder — editables directamente en HTML
- No hay herramientas de test/lint/formato configuradas
- Las imágenes en `img/` son placeholders según `img/README.txt`
