/* ============================================
   CARRUSEL DEL HERO (página Inicio)
   ============================================ */

// 1) Buscamos en el HTML todos los elementos que tengan
//    la clase "slide" y los guardamos en una lista.
//    document.querySelectorAll() devuelve TODOS los que coincidan.
const slides = document.querySelectorAll(".slide");

// 2) Esta variable recuerda CUÁL imagen está activa ahora.
//    Empieza en 0 porque en programación las listas se cuentan
//    desde 0, no desde 1. slides[0] = la primera imagen.
let indiceActual = 0;

/* ----------------------------------------------
   mostrarSlide(indice)
   Quita la clase "activa" de TODAS las imágenes,
   y se la pone solo a la que corresponde al índice
   que recibimos.
   ---------------------------------------------- */
function mostrarSlide(indice) {
  slides.forEach(function (slide) {
    slide.classList.remove("activa");
  });
  slides[indice].classList.add("activa");
}

/* ----------------------------------------------
   imagenSiguiente()
   Conectada al botón de la flecha derecha (>)
   ---------------------------------------------- */
function imagenSiguiente() {
  // Si estamos en la última imagen, el "+1" la lleva
  // de vuelta a la primera, usando el operador módulo (%).
  // Ejemplo con 5 imágenes: (4 + 1) % 5 = 0 (vuelve al inicio)
  indiceActual = (indiceActual + 1) % slides.length;
  mostrarSlide(indiceActual);
}

/* ----------------------------------------------
   imagenAnterior()
   Conectada al botón de la flecha izquierda (<)
   ---------------------------------------------- */
function imagenAnterior() {
  // Restamos 1, pero si quedamos en negativo,
  // sumamos slides.length para "envolver" hacia el final.
  indiceActual = (indiceActual - 1 + slides.length) % slides.length;
  mostrarSlide(indiceActual);
}

/* ----------------------------------------------
   Avance automático cada 5 segundos (5000 ms).
   setInterval ejecuta la función que le pasamos
   una y otra vez, cada X milisegundos, para siempre.
   ---------------------------------------------- */
setInterval(imagenSiguiente, 5000);
