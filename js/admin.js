var API_BASE = window.location.origin + "/api";
var JWT_TOKEN = sessionStorage.getItem("admin-jwt");

var gateEl = document.getElementById("admin-gate");
var panelEl = document.getElementById("admin-panel");
var formGate = document.getElementById("form-gate");
var inputToken = document.getElementById("input-admin-token");
var gateMensaje = document.getElementById("gate-mensaje");
var formTrabajo = document.getElementById("form-trabajo");
var mensajeTrabajo = document.getElementById("form-mensaje-trabajo");
var listaEl = document.getElementById("lista-trabajos");

var modalEditar = document.getElementById("modal-editar");
var formEditar = document.getElementById("form-editar");
var editId = document.getElementById("edit-id");
var editTitulo = document.getElementById("edit-titulo");
var editServicio = document.getElementById("edit-servicio");
var editDescripcion = document.getElementById("edit-descripcion");
var mensajeEditar = document.getElementById("form-mensaje-editar");

var MAPA_ICONOS = {
  "pintura": "pintura.png",
  "latonería": "latoneria.png",
  "latoneria": "latoneria.png",
  "pulido": "polichada.png",
  "restauración": "polichada.png",
  "cerámica": "ceramica.png",
  "ceramica": "ceramica.png",
};

function iconoParaServicio(nombre) {
  var key = nombre.toLowerCase();
  for (var palabra in MAPA_ICONOS) {
    if (key.indexOf(palabra) !== -1) return MAPA_ICONOS[palabra];
  }
  return "pintura.png";
}

var DELAYS = ["fade-in-d1", "fade-in-d2", "fade-in-d3", "fade-in-d4"];

function mostrarPanel() {
  gateEl.style.display = "none";
  panelEl.style.display = "block";
}

if (JWT_TOKEN) {
  mostrarPanel();
}

formGate.addEventListener("submit", function (e) {
  e.preventDefault();
  gateMensaje.textContent = "";
  gateMensaje.className = "form-mensaje";

  var code = inputToken.value.trim();
  if (!code) return;

  fetch(API_BASE + "/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: code }),
  })
    .then(function (r) {
      if (!r.ok) { return r.json().then(function (err) { throw new Error(err.error); }); }
      return r.json();
    })
    .then(function (data) {
      sessionStorage.setItem("admin-jwt", data.token);
      JWT_TOKEN = data.token;
      mostrarPanel();
      cargarTrabajos();
    })
    .catch(function (err) {
      gateMensaje.textContent = err.message || "Error al iniciar sesión.";
      gateMensaje.className = "form-mensaje form-mensaje-error";
    });
});

/* ---- MODAL EDITAR ---- */

document.getElementById("modal-cerrar").addEventListener("click", function () {
  modalEditar.style.display = "none";
});

modalEditar.addEventListener("click", function (e) {
  if (e.target === modalEditar) modalEditar.style.display = "none";
});

function abrirEditar(item) {
  editId.value = item.id;
  editTitulo.value = item.titulo;
  editServicio.value = item.servicio;
  editDescripcion.value = item.descripcion;
  mensajeEditar.textContent = "";
  mensajeEditar.className = "form-mensaje";
  modalEditar.style.display = "flex";
}

formEditar.addEventListener("submit", function (e) {
  e.preventDefault();
  mensajeEditar.textContent = "";
  mensajeEditar.className = "form-mensaje";

  var formData = new FormData(formEditar);

  fetch(API_BASE + "/trabajos/" + editId.value, {
    method: "PUT",
    headers: { "Authorization": "Bearer " + JWT_TOKEN },
    body: formData,
  })
    .then(function (r) {
      if (!r.ok) { return r.json().then(function (err) { throw new Error(err.error); }); }
      return r.json();
    })
    .then(function () {
      modalEditar.style.display = "none";
      cargarTrabajos();
    })
    .catch(function (err) {
      if (err.message && err.message.includes("Sesión")) {
        sessionStorage.removeItem("admin-jwt");
        JWT_TOKEN = null;
        panelEl.style.display = "none";
        gateEl.style.display = "flex";
        gateMensaje.textContent = "Sesión expirada. Ingresa de nuevo.";
        gateMensaje.className = "form-mensaje form-mensaje-error";
        return;
      }
      mensajeEditar.textContent = err.message || "Error al editar.";
      mensajeEditar.className = "form-mensaje form-mensaje-error";
    });
});

function eliminarTrabajo(id) {
  if (!confirm("¿Eliminar este trabajo? Esta acción no se puede deshacer.")) return;

  fetch(API_BASE + "/trabajos/" + id, {
    method: "DELETE",
    headers: { "Authorization": "Bearer " + JWT_TOKEN },
  })
    .then(function (r) {
      if (!r.ok) { return r.json().then(function (err) { throw new Error(err.error); }); }
      return r.json();
    })
    .then(function () {
      cargarTrabajos();
    })
    .catch(function (err) {
      if (err.message && err.message.includes("Sesión")) {
        sessionStorage.removeItem("admin-jwt");
        JWT_TOKEN = null;
        panelEl.style.display = "none";
        gateEl.style.display = "flex";
        gateMensaje.textContent = "Sesión expirada. Ingresa de nuevo.";
        gateMensaje.className = "form-mensaje form-mensaje-error";
        return;
      }
      alert(err.message || "Error al eliminar.");
    });
}

/* ---- ---- */

function crearTarjetaTrabajo(item, idx) {
  var card = document.createElement("div");
  card.className = "trabajo-card fade-in " + (DELAYS[idx % DELAYS.length] || "");

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

  var acciones = document.createElement("div");
  acciones.className = "trabajo-acciones";

  var btnEditar = document.createElement("button");
  btnEditar.className = "btn btn-secundario";
  btnEditar.textContent = "Editar";
  btnEditar.addEventListener("click", function () { abrirEditar(item); });
  acciones.appendChild(btnEditar);

  var btnEliminar = document.createElement("button");
  btnEliminar.className = "btn btn-peligro";
  btnEliminar.textContent = "Eliminar";
  btnEliminar.addEventListener("click", function () { eliminarTrabajo(item.id); });
  acciones.appendChild(btnEliminar);

  card.appendChild(acciones);

  return card;
}

function cargarTrabajos() {
  fetch(API_BASE + "/trabajos")
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

formTrabajo.addEventListener("submit", function (e) {
  e.preventDefault();
  mensajeTrabajo.textContent = "";
  mensajeTrabajo.className = "form-mensaje";

  var formData = new FormData(formTrabajo);

  fetch(API_BASE + "/trabajos", {
    method: "POST",
    headers: { "Authorization": "Bearer " + JWT_TOKEN },
    body: formData,
  })
    .then(function (r) {
      if (!r.ok) { return r.json().then(function (err) { throw new Error(err.error); }); }
      return r.json();
    })
    .then(function () {
      formTrabajo.reset();
      mensajeTrabajo.textContent = "Trabajo agregado correctamente.";
      mensajeTrabajo.className = "form-mensaje form-mensaje-exito";
      cargarTrabajos();
    })
    .catch(function (err) {
      if (err.message && err.message.includes("Sesión")) {
        sessionStorage.removeItem("admin-jwt");
        JWT_TOKEN = null;
        panelEl.style.display = "none";
        gateEl.style.display = "flex";
        gateMensaje.textContent = "Sesión expirada. Ingresa de nuevo.";
        gateMensaje.className = "form-mensaje form-mensaje-error";
        return;
      }
      mensajeTrabajo.textContent = err.message || "Error al subir el trabajo.";
      mensajeTrabajo.className = "form-mensaje form-mensaje-error";
    });
});

if (JWT_TOKEN) {
  cargarTrabajos();
}
