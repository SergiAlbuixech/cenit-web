document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario-contacto");
  const mensajeEnviado = document.getElementById("mensaje-enviado");
  const btnAceptar = document.getElementById("btn-aceptar");

  // Interceptamos el envío del formulario
  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita el envío real y la recarga de la página
    // Aquí puedes agregar la lógica de envío via AJAX si lo deseas

    // Ocultamos el formulario y mostramos el mensaje de confirmación
    formulario.style.display = "none";
    mensajeEnviado.style.display = "block";
  });

  // Al pulsar "Aceptar", recargamos la página o redirigimos a otra
  btnAceptar.addEventListener("click", function () {
    // Por ejemplo, recargamos la página:
    window.location.reload();
    // O redirigir a otra página:
    // window.location.href = "inicio.html";
  });
});
