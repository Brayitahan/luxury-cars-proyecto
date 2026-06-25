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

## Sesión 8 — Página de Contacto

### Creación de `contacto.html`
- Hero dividido en dos columnas: texto con datos de contacto + panel decorativo con patrón dorado y círculos concéntricos
- Tarjeta de WhatsApp con enlace directo a `wa.me/573043228031`
- Tarjeta de correo con `unadostrescuatro5@gmail.com`
- Sección inferior "Estamos Aquí para Ti" con las dos tarjetas de contacto
- Mismo estilo visual (fondo oscuro, dorado, fade-in, divisor con rombo)
- Diseño responsive: en móvil el panel decorativo se oculta y las tarjetas se apilan
- Número de WhatsApp actualizado en el sitio (ya no placeholder)

### Commit
- `87fa43e` — feat: crea página de contacto con WhatsApp y correo

---

## Sesión 12 — Footer unificado y limpieza

### Problemas
- El footer nuevo solo estaba en index.html, las demás páginas tenían el footer viejo (solo copyright)
- El enlace "Saber más" en tarjetas de servicios no tenía sentido (linkeaba a la misma página)

### Cambios
- Footer reemplazado en servicios.html, inventario.html y contacto.html con el mismo diseño (logo + navegación + horarios + divisor dorado)
- Script.js movido al final del body en servicios.html e inventario.html (contacto.html ya lo tenía bien)
- Eliminado `.tarjeta-enlace` de HTML y CSS

### Commit
- `1663612` — fix: unifica footer en todas las paginas y elimina enlace saber mas

---

### Problema
Las tarjetas de servicios se veían simples y sin personalidad. Fondo liso, solo icono + texto, sin elementos decorativos ni interactividad.

### Cambios

**Textura de lujo**: patrón de diamante CSS en el fondo de cada tarjeta (inspirado en costura de asientos de cuero de autos de lujo). Dos capas de líneas diagonales cruzadas a 45° con opacidad muy sutil.

**Números decorativos**: cada tarjeta tiene un número grande (01–04) en la esquina inferior derecha, muy tenue (opacidad 0.05), como watermark de lujo.

**Línea dorada bajo el título**: cada `h3` tiene una línea dorada centrada que se expande de 32px → 70px al hacer hover.

**Enlace "Saber más"**: aparece al hover con fade + deslizamiento hacia arriba. Enlace a servicios.html (preparado para sección detalle).

### Commits
- `5510422` — feat: mejora tarjetas de servicios con textura diamante, numeros decorativos y enlace hover

---

### Problema
El home solo tenía el hero del carrusel y un footer minimalista con copyright. Se sentía vacío. El footer era igual en todas las páginas pero muy básico.

### Secciones agregadas al home
1. **Bienvenido** — párrafo de presentación del taller, texto centrado con divisor dorado
2. **Servicios Rápidos** — grid de 4 tarjetas (Pintura, Latonería, Polichada, Cerámica) que linkean a servicios.html. Versión compacta de las tarjetas de servicio.
3. **Números** — 3 estadísticas (10+ años, 500+ autos, 98% clientes satisfechos) con números grandes en dorado
4. **CTA Final** — "¿Listo para darle una nueva vida a tu auto?" con botón "Ver Trabajos Realizados" link a inventario.html

### Footer rediseñado
- Grid de 3 columnas: logo+descripción, navegación, horarios
- Divisor dorado con rombo antes del copyright
- "Domingo: Cerrado" en rojo suave
- Sin repetición de WhatsApp (solo link a contacto.html)
- Responsive: en móvil todo se centra y apila

### CSS agregado
- `.bienvenido`, `.bienvenido-texto`
- `.servicios-rapidos`, `.grid-servicios-rapidos`, `.servicio-rapido-card`, `.servicio-rapido-icono`
- `.numeros`, `.numeros-contenido`, `.grid-numeros`, `.numero-item`, `.numero-valor`, `.numero-etiqueta`
- `.cta-final`, `.cta-final-contenido`
- Footer: `.footer-grid`, `.footer-col`, `.footer-logo-img`, `.footer-desc`, `.footer-nav`, `.footer-horario`, `.footer-bottom`, `.footer-divisor`
- Todos con responsive

### Commit
- `673e1a3` — feat: agrega bienvenido, servicios rapidos, numeros, cta final y footer completo al home

---

### Problema
Las páginas de servicios, inventario y contacto compartían el mismo banner genérico (`.banner-seccion` con imagen de fondo + overlay + texto), dando una sensación repetitiva.

### Solución
Cada página tiene ahora su propio tratamiento de hero:

| Página | Estilo de hero | Descripción |
|---|---|---|
| Servicios | **Tipográfico con tags** | Fondo oscuro con patrón diagonal sutil, título "Cuidado Automotriz", los 4 servicios como tags con borde dorado, sin imagen de fondo |
| Inventario | **Grid de imágenes 2×2** | 4 fotos del taller en cuadrícula como fondo, overlay oscuro, título y subtítulo centrados con text-shadow |
| Contacto | **Split con patrón decorativo** | Mitad izquierda texto con datos de contacto, mitad derecha panel con patrón diagonal dorado y círculos concéntricos decorativos |

### CSS agregado
- `.hero-servicios`, `.hero-servicios-contenido`, `.hero-servicios-badge`, `.hero-servicios-tags`, `.hero-servicios-tag`, `.hero-servicios-sub`
- `.hero-inventario`, `.hero-inventario-grid`, `.hero-inventario-cell`, `.hero-inventario-contenido`
- `.hero-contacto`, `.hero-contacto-grid`, `.hero-contacto-texto`, `.hero-contacto-badge`, `.hero-contacto-sub`, `.hero-contacto-links`, `.hero-contacto-link`, `.hero-contacto-icono-correo`, `.hero-contacto-visual`, `.hero-contacto-patron`
- Todos con responsive para ≤768px

### Detalles de diseño
- Servicios: fondo con gradiente oscuro + líneas diagonales a 45° con opacidad 0.025 + radial glow. Tags con hover que se rellenan de dorado.
- Inventario: grid absoluto 2×2, hover hace zoom suave (scale 1.03) en toda la cuadrícula. Overlay y texto con text-shadow para legibilidad.
- Contacto: split 50/50, lado visual con patrón diagonal + dos círculos concéntricos decorativos (como un volante o halo). En móvil se oculta el lado visual.

### Commits
- `d9ee92b` — refactor: heroes únicos para cada página (tipográfico, grid imagenes, split)

---

## Estado actual del proyecto

### Páginas
| Ruta | Estado |
|---|---|
| `index.html` | ✅ Completo — carrusel hero (5 diapositivas, avance automático 5s) |
| `servicios.html` | ✅ Completo — banner, 4 tarjetas, por qué elegirnos, proceso, ubicación, testimonios |
| `inventario.html` | ✅ Completo — galería antes/después con 6 trabajos |
| `contacto.html` | ✅ Completo — hero split con WhatsApp y correo |

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
