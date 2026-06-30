var API_URL = window.location.origin + "/api/comentarios";

var listaEl = document.getElementById("lista-comentarios");
var formEl = document.getElementById("form-comentario");
var inputNombre = document.getElementById("input-nombre");
var inputAuto = document.getElementById("input-auto");
var inputComentario = document.getElementById("input-comentario");
var mensajeEl = document.getElementById("form-mensaje");

function crearTarjetaComentario(item) {
  var card = document.createElement("div");
  card.className = "comentario-card fade-in visible";

  var header = document.createElement("div");
  header.className = "comentario-header";

  var nombre = document.createElement("span");
  nombre.className = "comentario-nombre";
  nombre.textContent = item.nombre;
  header.appendChild(nombre);

  if (item.auto) {
    var auto = document.createElement("span");
    auto.className = "comentario-auto";
    auto.textContent = item.auto;
    header.appendChild(auto);
  }

  card.appendChild(header);

  var texto = document.createElement("p");
  texto.className = "comentario-texto";
  texto.textContent = item.comentario;
  card.appendChild(texto);

  var fecha = document.createElement("span");
  fecha.className = "comentario-fecha";
  fecha.textContent = new Date(item.fecha).toLocaleDateString("es-CO");
  card.appendChild(fecha);

  return card;
}

function cargarComentarios() {
  fetch(API_URL)
    .then(function (r) { return r.json(); })
    .then(function (lista) {
      listaEl.innerHTML = "";
      if (!lista.length) {
        var vacio = document.createElement("p");
        vacio.className = "comentarios-vacio";
        vacio.textContent = "Sé el primero en dejar un comentario.";
        listaEl.appendChild(vacio);
        return;
      }
      lista.forEach(function (item) {
        listaEl.appendChild(crearTarjetaComentario(item));
      });
    })
    .catch(function () {
      listaEl.innerHTML = "";
      var error = document.createElement("p");
      error.className = "comentarios-vacio";
      error.textContent = "No se pudieron cargar los comentarios.";
      listaEl.appendChild(error);
    });
}

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  mensajeEl.textContent = "";
  mensajeEl.className = "form-mensaje";

  var payload = {
    nombre: inputNombre.value,
    comentario: inputComentario.value,
    auto: inputAuto.value,
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(function (r) {
      if (!r.ok) { return r.json().then(function (err) { throw new Error(err.error); }); }
      return r.json();
    })
    .then(function () {
      formEl.reset();
      mensajeEl.textContent = "Gracias por tu comentario.";
      mensajeEl.className = "form-mensaje form-mensaje-exito";
      cargarComentarios();
    })
    .catch(function (err) {
      mensajeEl.textContent = err.message || "Error al enviar el comentario.";
      mensajeEl.className = "form-mensaje form-mensaje-error";
    });
});

cargarComentarios();
