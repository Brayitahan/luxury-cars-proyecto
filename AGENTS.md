# Luxury Cars — AGENTS.md

## Stack
- Frontend: HTML + CSS + JS vanilla (ES5/ES6). Sin framework.
- Backend: Node.js + Express + PostgreSQL (Railway).
- Despliegue: Railway (`https://web-production-c048f.up.railway.app`).

## Páginas
| Ruta | Estado |
|---|---|
| `index.html` | ✅ Inicio — carrusel hero (5 diapositivas, 5s) + mapa Google + números + CTA |
| `servicios.html` | ✅ Servicios — hero tipográfico, 4 tarjetas con textura diamante, proceso 4 pasos |
| `inventario.html` | ✅ Galería dinámica desde API + lightbox con before/after/proceso + parallax hero |
| `contacto.html` | ✅ Hero split 50/50 + WhatsApp + correo |
| `admin.html` | ✅ Panel protegido con JWT + CRUD (crear/editar/eliminar trabajos) + subida de imágenes |

## Archivos clave
- `css/estilos.css` — tema oscuro con props CSS (`--color-dorado`), clases kebab-case, animaciones, lightbox, responsive
- `js/script.js` — carrusel hero + IntersectionObserver (fade-in) global
- `js/inventario.js` — galería dinámica (fetch GET), lightbox, parallax grid
- `js/comentarios.js` — carga y envío de comentarios (fetch GET/POST)
- `js/admin.js` — login JWT, CRUD trabajos, modal de edición
- `server.js` — Express, helmet, rate-limit, JWT, multer, file-type validation
- `db.js` — pool PostgreSQL, creación de tablas, seed data
- `railway.json` — configuración de deploy Railway

## API (Express, puerto 3000)
| Ruta | Método | Auth | Descripción |
|---|---|---|---|
| `/api/admin/login` | POST | rate-limit | Login con código, devuelve JWT (24h) |
| `/api/trabajos` | GET | — | Lista todos los trabajos |
| `/api/trabajos` | POST | JWT | Crear trabajo (multipart: before + after + proceso opcional) |
| `/api/trabajos/:id` | PUT | JWT | Editar trabajo (texto + reemplazo opcional de imágenes) |
| `/api/trabajos/:id` | DELETE | JWT | Eliminar trabajo + archivos del disco |
| `/api/comentarios` | GET | — | Lista comentarios |
| `/api/comentarios` | POST | — | Crear comentario |

## Base de datos (PostgreSQL en Railway)
- Tabla `trabajos`: id, titulo, servicio, descripcion, before, after, proceso (JSONB), fecha
- Tabla `comentarios`: id, nombre, comentario, auto, fecha
- Seed: 3 trabajos (BMW Serie 3, Ford Mustang GT, Porsche 911 Carrera) + 5 comentarios

## Convenciones
- Idioma: español (nombres, clases, contenido)
- Clases CSS: kebab-case (ej. `tarjeta-servicio`)
- JS: ES5/ES6, sin framework
- Comentarios en español, explicando el "por qué"

## Estructura
```
/
├── css/estilos.css
├── js/script.js, inventario.js, admin.js, comentarios.js
├── img/
│   ├── hero/          ← 5 diapositivas (placeholders taller-1.jpg..5.jpg)
│   ├── iconos/        ← servicios, whatsapp
│   └── inventario/    ← imágenes subidas por admin
├── docs/
│   ├── bitacora.md
│   └── security_best_practices_report.md
├── data/              ← backups JSON (ya no se usan en producción)
├── server.js
├── db.js
├── package.json
├── railway.json
├── opencode.json
├── AGENTS.md
├── .env               ← ADMIN_CODE, JWT_SECRET (no commit)
└── .gitignore
```

## Variables de entorno (`.env`)
| Variable | Descripción |
|---|---|
| `ADMIN_CODE` | Código de acceso al panel admin (default: `Mono14723`) |
| `JWT_SECRET` | Secreto para firmar JWTs (default: auto-generado) |
| `DATABASE_URL` | Cadena de conexión PostgreSQL (solo en Railway) |

## Gotchas
- Railway despliega desde la rama `master` del repo.
- Railway usa Node.js v18. `file-type@16` para compatibilidad CommonJS.
- Imágenes subidas se guardan en `img/inventario/` con nombre UUID.
- Las imágenes seed (Unsplash) no están en disco; el DELETE las ignora silenciosamente.
- No hay herramientas de test/lint configuradas.
- `img/hero/` placeholders — reemplazar con fotos reales del taller.
- `img/servicios/` vacío (con `.gitkeep`).

## Deploy
```bash
git checkout master && git merge develop && git push origin master
```
Railway auto-despliega desde master. URL: `https://web-production-c048f.up.railway.app`
