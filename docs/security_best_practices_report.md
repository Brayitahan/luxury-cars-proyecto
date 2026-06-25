# Reporte de Seguridad — Luxury Cars

**Fecha:** 25/06/2026
**Proyecto:** Sitio web estático (HTML + CSS + JS vanilla)
**Propósito:** Página informativa de taller automotriz (sin backend, sin autenticación, sin captura de datos)

---

## Resumen Ejecutivo

El proyecto es un sitio estático puro, lo que reduce drásticamente la superficie de ataque. No hay backend, bases de datos, formularios, cookies de sesión, ni almacenamiento de datos sensibles. Los hallazgos son de **bajo riesgo** y se centran en mejoras defensivas. No hay vulnerabilidades críticas ni altas.

---

## Hallazgos

### ID-01: Falta Content Security Policy (CSP)

| Campo | Valor |
|---|---|
| **Regla** | JS-CSP-001 |
| **Severidad** | Baja (informativa) |
| **Ubicación** | `index.html`, `servicios.html` |
| **Evidencia** | No hay `<meta http-equiv="Content-Security-Policy">` ni cabecera CSP en ningún archivo |
| **Impacto** | Sin CSP, si en el futuro se introduce una vulnerabilidad XSS, no hay capa defensiva adicional |
| **Fix** | Agregar CSP vía `<meta>` en el `<head>` de cada página |

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self'; connect-src 'self';">
```

---

### ID-02: Manejadores de evento inline (`onclick`)

| Campo | Valor |
|---|---|
| **Regla** | JS-CSP-002 |
| **Severidad** | Baja |
| **Ubicación** | `index.html:70-71` |
| **Evidencia** | `<button onclick="imagenAnterior()">` y `<button onclick="imagenSiguiente()">` |
| **Impacto** | Las funciones llamadas (`imagenAnterior`, `imagenSiguiente`) son internas y no reciben datos del usuario. El riesgo real es mínimo, pero impide usar una CSP estricta sin `unsafe-inline` |
| **Fix** | Reemplazar `onclick` por `addEventListener` en `script.js` |

```html
<!-- Antes -->
<button class="flecha flecha-izq" onclick="imagenAnterior()">&#10094;</button>
<button class="flecha flecha-der" onclick="imagenSiguiente()">&#10095;</button>

<!-- Después (en script.js) -->
document.querySelector(".flecha-izq").addEventListener("click", imagenAnterior);
document.querySelector(".flecha-der").addEventListener("click", imagenSiguiente);
```

---

### ID-03: Recurso de terceros sin integridad (SRI)

| Campo | Valor |
|---|---|
| **Regla** | JS-SRI-001 |
| **Severidad** | Informativa |
| **Ubicación** | `index.html:31`, `servicios.html:24` |
| **Evidencia** | Google Fonts se carga desde `https://fonts.googleapis.com` sin atributo `integrity` |
| **Impacto** | Google Fonts es un recurso CSS/font, no JavaScript. Una alteración del CSS podría cambiar la apariencia pero no ejecutar código. Riesgo extremadamente bajo |
| **Fix** | No se recomienda SRI para Google Fonts (los hashes cambian). Dejar como está |

---

### ID-04: No se detectaron issues en JS

| Ítem | Estado |
|---|---|
| `innerHTML` / `outerHTML` / `insertAdjacentHTML` | ✅ No usado |
| `document.write` | ✅ No usado |
| `eval` / `new Function` / string setTimeout | ✅ No usado |
| `localStorage` / `sessionStorage` | ✅ No usado |
| `postMessage` | ✅ No usado |
| Navegación dinámica (`window.location`) | ✅ No usado |
| Clobbering de DOM | ✅ No aplica |

---

## Conclusión

El proyecto es **seguro por su simplicidad**. Las únicas mejoras recomendadas son:

1. **(Opcional)** Agregar CSP vía `<meta>` como defensa preventiva
2. **(Opcional)** Migrar los `onclick` a `addEventListener` para permitir CSP estricta

Ninguna de las dos es urgente para un sitio estático sin formularios ni datos de usuario.
