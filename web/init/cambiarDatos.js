document.addEventListener("DOMContentLoaded", function () {
  // Primero verificamos que el usuario esté logueado
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (!loggedIn) {
    window.location.href = "registrarse.html";
    return;
  }

  // Cargamos los datos en los campos
  loadFormData();

  const btnGuardar = document.getElementById("btnGuardar");
  const btnVolver = document.getElementById("btnVolver");
  const mensaje = document.getElementById("mensaje");

  btnGuardar.addEventListener("click", function () {
    // Guardamos los cambios en localStorage
    saveFormData();
    // Mostramos mensaje en la página
    mensaje.style.display = "block";
    // Opcional: ocultarlo después de unos segundos
    setTimeout(() => {
      mensaje.style.display = "none";
    }, 3000);
  });

  btnVolver.addEventListener("click", function () {
    window.location.href = "panel.html";
  });
});

/**
 * Carga los datos del formulario desde localStorage
 */
function loadFormData() {
  const dataString = localStorage.getItem("formRegistroData");
  if (dataString) {
    const data = JSON.parse(dataString);
    document.getElementById("usuario").value = data.usuario || "";
    document.getElementById("clave").value = data.clave || "";
    document.getElementById("repetirClave").value = data.repetirClave || "";
    document.getElementById("nombre").value = data.nombre || "";
    document.getElementById("apellidos").value = data.apellidos || "";
    document.getElementById("domicilio").value = data.domicilio || "";
    document.getElementById("poblacion").value = data.poblacion || "";
    document.getElementById("provincia").value = data.provincia || "";
    document.getElementById("cp").value = data.cp || "";
    document.getElementById("nif").value = data.nif || "";
  }
}

/**
 * Guarda en localStorage los datos modificados.
 */
function saveFormData() {
  const data = {
    usuario: document.getElementById("usuario").value,
    clave: document.getElementById("clave").value,
    repetirClave: document.getElementById("repetirClave").value,
    nombre: document.getElementById("nombre").value,
    apellidos: document.getElementById("apellidos").value,
    domicilio: document.getElementById("domicilio").value,
    poblacion: document.getElementById("poblacion").value,
    provincia: document.getElementById("provincia").value,
    cp: document.getElementById("cp").value,
    nif: document.getElementById("nif").value,
  };
  localStorage.setItem("formRegistroData", JSON.stringify(data));
}
