document.addEventListener("DOMContentLoaded", function () {
  // Comprobamos si está logueado
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (!loggedIn) {
    // Si no está logueado, volvemos a registrarse.html
    window.location.href = "registrarse.html";
    return;
  }

  // Referencias a los botones
  const btnCambiarDatos = document.getElementById("btnCambiarDatos");
  const btnGestionarPedidos = document.getElementById("btnGestionarPedidos");
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");

  btnCambiarDatos.addEventListener("click", function () {
    window.location.href = "cambiarDatos.html";
  });

  btnGestionarPedidos.addEventListener("click", function () {
    window.location.href = "gestionarPedidos.html";
  });

  btnCerrarSesion.addEventListener("click", function () {
    localStorage.setItem("loggedIn", "false");
    window.location.href = "registrarse.html";
  });
});
