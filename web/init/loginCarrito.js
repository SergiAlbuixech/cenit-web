document.addEventListener("DOMContentLoaded", function () {
  const btnAcceder = document.getElementById("btnAccederCarrito");
  if (!btnAcceder) return;

  btnAcceder.addEventListener("click", function () {
    const dataString = localStorage.getItem("formRegistroData");
    if (!dataString) {
      alert("No hay datos registrados. Por favor, regístrate primero.");
      return;
    }
    const data = JSON.parse(dataString);

    // Obtenemos los datos introducidos
    const usuarioInput = document.getElementById("usuarioCarrito").value.trim();
    const claveInput = document.getElementById("claveCarrito").value.trim();

    // Criterio de validación:
    // Si ambos campos están vacíos, se permite el acceso.
    if (usuarioInput === "" && claveInput === "") {
      localStorage.setItem("loggedIn", "true");
      alert("Acceso concedido (campos vacíos).");
      window.location.href = "carrito.html";
    }
    // Si ambos se han rellenado, se comparan con los datos registrados.
    else if (usuarioInput !== "" && claveInput !== "") {
      if (usuarioInput === data.usuario && claveInput === data.clave) {
        localStorage.setItem("loggedIn", "true");
        alert("Acceso concedido. Bienvenido.");
        window.location.href = "carrito.html";
      } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
      }
    } else {
      // Si uno está vacío y el otro no, se muestra error.
      alert("Debes dejar ambos campos en blanco o rellenarlos ambos.");
    }
  });
});
