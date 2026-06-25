# AGENTS.md — Proyecto Luxury Cars

## Sobre el proyecto
- Sitio web para un taller de detallado, pintura y restauración automotriz de lujo (NO venta de carros).
- Servicios ofrecidos: pintura automotriz, latonería, polichada, recubrimiento cerámico.
- El usuario es principiante en programación. Cualquier cambio debe explicarse en términos simples (qué hace y por qué), no solo aplicarse en silencio.

## Stack y arquitectura
- HTML + CSS + JavaScript puro. NO usar frameworks (React, Vue, etc.) ni bundlers (Webpack, Vite) salvo que se indique lo contrario explícitamente.
- Sitio MULTI-PÁGINA, no de una sola página con scroll. 4 páginas: `index.html`, `servicios.html`, `inventario.html`, `contacto.html`.
- El header y el menú de navegación se repiten manualmente en cada página HTML (a propósito, por simplicidad pedagógica). No convertirlo en un componente compartido vía JavaScript salvo pedido explícito.
- Tipografía: Google Fonts "Advent Pro", cargada por `<link>` desde Google Fonts CDN. No descargar ni servir los archivos de fuente localmente.
- Paleta de colores: dorado `#d4af37` sobre negro `#0d0d0d`, definida como variables CSS en `:root` dentro de `css/estilos.css`. Cualquier color nuevo debe agregarse como variable ahí, no hardcodeado en otros archivos.

## Estructura de carpetas
luxury-cars/

├── index.html

├── servicios.html

├── inventario.html

├── contacto.html

├── css/estilos.css

├── js/script.js

├── img/

│   ├── logo.png

│   ├── iconos/

│   └── hero/

└── data/

└── servicios.json
- Los archivos `.html` van siempre en la raíz del proyecto.
- CSS compartido va únicamente en `css/estilos.css` (un solo archivo, no fragmentar en varios `.css`).
- Imágenes optimizadas para web: máximo 1920px de ancho, JPEG calidad ~80, antes de agregarlas a `img/`.
- Datos editables (servicios, inventario) se modelan primero como JSON en `data/` antes de pensar en backend.

## Reglas de enseñanza / estilo de trabajo
- Explicar siempre el propósito de cada bloque de código nuevo (qué hace y por qué se eligió esa solución), no solo entregar el código.
- Avanzar de forma incremental: construir una parte pequeña, confirmar que se entendió, y solo entonces continuar con la siguiente.
- Usar el código real del proyecto como ejemplo al explicar conceptos, evitando teoría abstracta separada del proyecto.
- Preferir diagramas/visualizaciones para explicar conceptos cuando sea posible, sobre bloques largos de texto.
- No introducir backend, base de datos, ni frameworks hasta que el frontend (las 4 páginas) esté completo, salvo pedido explícito del usuario.
- Antes de una tarea no trivial, propón plan y espera mi OK.
- Una tarea a la vez; al terminar, dime que cambiaste para yo revisar.
- Si no estas seguro al 80%, pregunta NO inventes.

## Convenciones de código
- Comentarios en español, explicando el "por qué" de bloques no triviales (igual que el código ya existente en el proyecto).
- Nombres de clases CSS y variables JS en español, consistente con el resto del proyecto (ej. `tarjeta-servicio`, `imagenSiguiente`, `indiceActual`).
- Usar variables CSS (`var(--color-dorado)`, etc.) en vez de valores de color hardcodeados.
- JavaScript va en `js/script.js`, enlazado al final del `<body>` de cada página (no en el `<head>`), para evitar errores de elementos que aún no existen en el DOM.
- Mantener el patrón "antes/después" cuando se introduce una técnica más avanzada (ej. mostrar primero HTML estático, luego la versión dinámica con JSON) en lugar de saltar directo a la solución avanzada.

## Pendientes conocidos
- `inventario.html` y `contacto.html` aún no están construidas.
- `data/servicios.json` existe pero todavía no está conectado a `servicios.html` vía JavaScript (la página sigue siendo estática).
- Backend y base de datos (para panel admin y opiniones de clientes) son trabajo futuro, después de completar el frontend.
- avisar cuando el fronted este casi en su totalidad para empezar con el backend.
