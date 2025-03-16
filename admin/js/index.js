document.addEventListener("DOMContentLoaded", function () {
  const btnAcceder = document.getElementById("btnAcceder");
  if (!btnAcceder) return;

  btnAcceder.addEventListener("click", function () {
    // Al pulsar "Acceder", redirigimos siempre a usuarios.html
    // (no validamos si usuario o clave están vacíos)
    window.location.href = "usuarios.html";
  });
});
