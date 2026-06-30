var API_TRABAJOS = window.location.origin + "/api/trabajos";
var listaEl = document.getElementById("lista-trabajos");
var DELAYS = ["fade-in-d1", "fade-in-d2", "fade-in-d3", "fade-in-d4"];

var MAPA_ICONOS = {
  "pintura": "pintura.png",
  "latonería": "latoneria.png",
  "latoneria": "latoneria.png",
  "pulido": "polichada.png",
  "restauración": "polichada.png",
  "cerámica": "ceramica.png",
  "ceramica": "ceramica.png",
};

var lightbox = null;

function iconoParaServicio(nombre) {
  var key = nombre.toLowerCase();
  for (var palabra in MAPA_ICONOS) {
    if (key.indexOf(palabra) !== -1) return MAPA_ICONOS[palabra];
  }
  return "pintura.png";
}

function abrirLightbox(item) {
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) cerrarLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") cerrarLightbox();
    });
    document.body.appendChild(lightbox);
  }

  var html = '<button class="lightbox-cerrar" id="lb-cerrar">&times;</button>';
  html += '<div class="lightbox-contenido">';
  html += '<div class="lightbox-grid">';
  html += '<div class="lightbox-col"><span class="etiqueta">Antes</span><img src="' + item.before + '" alt="Antes" loading="lazy"></div>';
  html += '<div class="lightbox-col"><span class="etiqueta">Después</span><img src="' + item.after + '" alt="Después" loading="lazy"></div>';
  html += '</div>';

  if (item.proceso && item.proceso.length) {
    html += '<div class="lightbox-proceso">';
    html += '<p class="proceso-label">Proceso</p><div class="lightbox-proceso-grid">';
    item.proceso.forEach(function (src) {
      html += '<img src="' + src + '" alt="Proceso" loading="lazy">';
    });
    html += '</div></div>';
  }

  html += '<div class="lightbox-info">';
  html += '<h3>' + item.titulo + '</h3>';
  html += '<p class="lightbox-servicio">' + item.servicio + '</p>';
  html += '<p class="lightbox-descripcion">' + item.descripcion + '</p>';
  html += '</div></div>';

  lightbox.innerHTML = html;
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";

  document.getElementById("lb-cerrar").addEventListener("click", cerrarLightbox);

  requestAnimationFrame(function () {
    lightbox.classList.add("activo");
  });
}

function cerrarLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("activo");
  lightbox.style.display = "none";
  document.body.style.overflow = "";
}

function crearTarjetaTrabajo(item, idx) {
  var card = document.createElement("div");
  card.className = "trabajo-card fade-in " + (DELAYS[idx % DELAYS.length] || "");

  card.addEventListener("click", function () { abrirLightbox(item); });

  var titulo = document.createElement("h3");
  titulo.className = "trabajo-titulo";
  titulo.textContent = item.titulo;
  card.appendChild(titulo);

  var servicio = document.createElement("p");
  servicio.className = "trabajo-servicio";

  var badge = document.createElement("img");
  badge.className = "servicio-badge";
  badge.src = "img/iconos/" + iconoParaServicio(item.servicio);
  badge.alt = item.servicio;
  badge.loading = "lazy";
  servicio.appendChild(badge);
  servicio.appendChild(document.createTextNode(" " + item.servicio));
  card.appendChild(servicio);

  var comparacion = document.createElement("div");
  comparacion.className = "comparacion";

  var antes = document.createElement("div");
  antes.className = "foto before";
  var etiquetaAntes = document.createElement("span");
  etiquetaAntes.className = "etiqueta";
  etiquetaAntes.textContent = "Antes";
  var imgAntes = document.createElement("img");
  imgAntes.src = item.before;
  imgAntes.alt = item.titulo + " antes";
  imgAntes.loading = "lazy";
  antes.appendChild(etiquetaAntes);
  antes.appendChild(imgAntes);
  comparacion.appendChild(antes);

  var despues = document.createElement("div");
  despues.className = "foto after";
  var etiquetaDespues = document.createElement("span");
  etiquetaDespues.className = "etiqueta";
  etiquetaDespues.textContent = "Después";
  var imgDespues = document.createElement("img");
  imgDespues.src = item.after;
  imgDespues.alt = item.titulo + " después";
  imgDespues.loading = "lazy";
  despues.appendChild(etiquetaDespues);
  despues.appendChild(imgDespues);
  comparacion.appendChild(despues);

  card.appendChild(comparacion);

  if (item.proceso && item.proceso.length) {
    var masFotos = document.createElement("span");
    masFotos.className = "mas-fotos";
    masFotos.textContent = "+" + item.proceso.length + " fotos del proceso";
    card.appendChild(masFotos);
  }

  var descripcion = document.createElement("p");
  descripcion.className = "trabajo-descripcion";
  descripcion.textContent = item.descripcion;
  card.appendChild(descripcion);

  return card;
}

function cargarTrabajos() {
  fetch(API_TRABAJOS)
    .then(function (r) { return r.json(); })
    .then(function (lista) {
      listaEl.innerHTML = "";
      if (!lista.length) {
        var vacio = document.createElement("p");
        vacio.className = "comentarios-vacio";
        vacio.textContent = "No hay trabajos registrados todavía.";
        listaEl.appendChild(vacio);
        return;
      }
      lista.forEach(function (item, idx) {
        listaEl.appendChild(crearTarjetaTrabajo(item, idx));
      });

      setTimeout(function () {
        var visibles = listaEl.querySelectorAll(".fade-in");
        visibles.forEach(function (el) { el.classList.add("visible"); });
      }, 100);
    })
    .catch(function () {
      listaEl.innerHTML = "";
      var error = document.createElement("p");
      error.className = "comentarios-vacio";
      error.textContent = "No se pudieron cargar los trabajos.";
      listaEl.appendChild(error);
    });
}

cargarTrabajos();

/* ---- PARALLAX HERO ---- */

var heroInventario = document.querySelector(".hero-inventario");
var heroGrid = document.querySelector(".hero-inventario-grid");

if (heroInventario && heroGrid) {
  var ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        var rect = heroInventario.getBoundingClientRect();
        var offset = rect.top;
        var altura = rect.height;

        if (offset < window.innerHeight && offset > -altura) {
          var factor = offset * 0.6;
          heroGrid.style.transform = "translateY(" + factor + "px)";
        }

        ticking = false;
      });

      ticking = true;
    }
  });
}
