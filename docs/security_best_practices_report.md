# Security Best Practices Report — Luxury Cars

## Executive Summary

Luxury Cars es un sitio web estático (HTML + CSS + JS vanilla) sin formularios, sin backend, sin almacenamiento de datos de usuario, y sin dependencias de terceros aparte de Google Fonts. El perfil de riesgo es inherentemente bajo. Se encontraron 3 hallazgos: 1 de severidad **Media** y 2 de severidad **Low**.

---

## Finding LC-01 — Script tag duplicado en 3 páginas (Media)

| Campo | Valor |
|---|---|
| **Rule ID** | JS-CSP-002 / Quality |
| **Severity** | Media |
| **Location** | `servicios.html:224` (extra en 261), `inventario.html:172` (extra en 209), `contacto.html:103` (extra en 140) |
| **Evidence** | Cada uno de estos archivos tiene `<script src="js/script.js"></script>` dos veces. El segundo bloque está antes del `</body>` después del `<footer>`. |
| **Impact** | `script.js` se ejecuta dos veces en esas páginas. Esto duplica listeners de eventos, crea dos `IntersectionObserver`, dos `setInterval`, etc. Puede causar comportamientos erráticos en el carrusel (transiciones dobles) y degradación de rendimiento. |
| **Fix** | Eliminar la segunda ocurrencia de `<script src="js/script.js"></script>` en cada archivo (la que está después del `<footer>`). |

---

## Finding LC-02 — Sin Subresource Integrity (SRI) en Google Fonts (Low)

| Campo | Valor |
|---|---|
| **Rule ID** | JS-SRI-001 |
| **Severity** | Low |
| **Location** | `index.html:33`, `servicios.html:23`, `inventario.html:23`, `contacto.html:23` |
| **Evidence** | `<link href="https://fonts.googleapis.com/css2?family=Advent+Pro..." rel="stylesheet">` sin atributo `integrity`. |
| **Impact** | Si el CDN de Google Fonts fuera comprometido, podría servir CSS malicioso. El riesgo es extremadamente bajo dado que es Google, pero la buena práctica es incluir SRI. |
| **Fix** | Agregar `integrity` al `<link>` de Google Fonts. Sin embargo, Google Fonts no publica hashes estables, por lo que la mitigación práctica es aceptar el riesgo o considerar self-hosting de la fuente. |
| **Mitigation** | Self-hostear la fuente Advent Pro eliminaría esta dependencia externa por completo. |

---

## Finding LC-03 — CSP con `unsafe-inline` en `style-src` (Low)

| Campo | Valor |
|---|---|
| **Rule ID** | JS-CSP-001 |
| **Severity** | Low |
| **Location** | Meta CSP en los 4 archivos HTML (e.g., `index.html:22`) |
| **Evidence** | `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` — incluye `unsafe-inline`. |
| **Impact** | Permite cualquier estilo inline en la página. Esto es necesario porque las diapositivas del carrusel y las celdas del hero usan `style="background-image: url(...)"`. Sin `unsafe-inline`, esas imágenes de fondo no se mostrarían. |
| **Fix** | No es práctico eliminar `unsafe-inline` sin refactorizar para mover todos los estilos inline a clases CSS o usar CSS custom properties desde JS. El riesgo es mínimo porque no hay contenido generado por usuarios que pueda inyectar estilos arbitrarios. |
| **Accept** | Riesgo aceptado y documentado. En un sitio estático sin contenido dinámico de usuarios, el riesgo de exfiltración vía CSS inline es insignificante. |

---

## Summary

| ID | Severidad | Descripción | Acción |
|---|---|---|---|
| LC-01 | **Media** | Script tag duplicado en 3 páginas | Corregir |
| LC-02 | Low | Sin SRI en Google Fonts | Aceptado / Self-host |
| LC-03 | Low | `unsafe-inline` en style-src del CSP | Aceptado |
