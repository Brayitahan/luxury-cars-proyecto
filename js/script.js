const slides = document.querySelectorAll(".slide");
let indiceActual = 0;

function mostrarSlide(indice) {
  slides.forEach(function (slide) {
    slide.classList.remove("activa");
  });
  slides[indice].classList.add("activa");

  const dots = document.querySelectorAll("#hero-indicadores span");
  if (dots.length) {
    dots.forEach(function (d) { d.classList.remove("activo"); });
    dots[indice].classList.add("activo");
  }
}

function imagenSiguiente() {
  indiceActual = (indiceActual + 1) % slides.length;
  mostrarSlide(indiceActual);
}

function imagenAnterior() {
  indiceActual = (indiceActual - 1 + slides.length) % slides.length;
  mostrarSlide(indiceActual);
}

var btnAnt = document.getElementById("btn-anterior");
var btnSig = document.getElementById("btn-siguiente");
if (btnAnt) btnAnt.addEventListener("click", imagenAnterior);
if (btnSig) btnSig.addEventListener("click", imagenSiguiente);

var indicadores = document.getElementById("hero-indicadores");
if (indicadores && slides.length) {
  for (var i = 0; i < slides.length; i++) {
    var dot = document.createElement("span");
    dot.setAttribute("data-indice", i);
    dot.addEventListener("click", function () {
      var idx = parseInt(this.getAttribute("data-indice"));
      indiceActual = idx;
      mostrarSlide(indiceActual);
    });
    indicadores.appendChild(dot);
  }
  indicadores.children[0].classList.add("activo");
}

if (slides.length > 1) {
  setInterval(imagenSiguiente, 5000);
}

var elementosFade = document.querySelectorAll(".fade-in");
if (elementosFade.length) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });

  elementosFade.forEach(function (el) {
    observer.observe(el);
  });
}
