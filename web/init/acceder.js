document.addEventListener("DOMContentLoaded", function () {
  const btnAcceder = document.getElementById("btnAcceder");

  if (btnAcceder) {
    btnAcceder.addEventListener("click", function () {
      // (Opcional) Simulamos login: localStorage.setItem("loggedIn", "true");
      // Redirigir al panel de usuario
      window.location.href = "panel.html";
    });
  }
});
