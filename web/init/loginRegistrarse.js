document.addEventListener("DOMContentLoaded", function () {
  const btnAcceder = document.getElementById("btnAccederRegistrarse");
  if (!btnAcceder) return;

  btnAcceder.addEventListener("click", function () {
    const dataString = localStorage.getItem("formRegistroData");
    if (!dataString) {
      alert("No hay datos registrados. Debes registrarte antes.");
      return;
    }
    const data = JSON.parse(dataString);

    // Obtenemos lo que el usuario introdujo en el formulario
    const usuarioLogin = document.getElementById("usuarioLogin").value.trim();
    const claveLogin = document.getElementById("claveLogin").value.trim();

    // Mismo criterio: ambos vacíos -> OK
    if (usuarioLogin === "" && claveLogin === "") {
      localStorage.setItem("loggedIn", "true");
      alert("Acceso concedido. Bienvenido (campos vacíos).");
      window.location.href = "panel.html";
    }
    // Ambos rellenados -> Comprobar si coinciden con lo guardado
    else if (usuarioLogin !== "" && claveLogin !== "") {
      if (usuarioLogin === data.usuario && claveLogin === data.clave) {
        localStorage.setItem("loggedIn", "true");
        alert("Acceso concedido. Bienvenido.");
        window.location.href = "panel.html";
      } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
      }
    }
    // Uno está vacío y el otro no -> error
    else {
      alert("Debes dejar ambos campos en blanco o rellenarlos ambos.");
    }
  });
});
