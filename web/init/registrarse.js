document.addEventListener("DOMContentLoaded", function () {
  loadFormData();

  const registrarBtn = document.getElementById("btnRegistrar");
  const cancelBtn = document.getElementById("btnCancelar");

  registrarBtn.addEventListener("click", function () {
    // 1) Guardar datos en localStorage
    saveFormData();

    // Obtenemos los datos guardados
    const dataString = localStorage.getItem("formRegistroData");
    if (!dataString) {
      alert("No hay datos registrados. Por favor, rellena el formulario.");
      return;
    }

    // 2) En vez de prompt, redirigimos a una página de login exclusiva
    window.location.href = "loginRegistrarse.html";
  });

  cancelBtn.addEventListener("click", function () {
    // Limpia formulario y localStorage
    localStorage.removeItem("formRegistroData");
    clearForm();
  });
});

/**
 * Guarda en localStorage los datos del formulario.
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

  // (Opcional) Validación: si la clave y repetirClave no coinciden, se detiene
  if (data.clave !== data.repetirClave) {
    alert("Las contraseñas no coinciden. Corrige antes de continuar.");
    return;
  }

  localStorage.setItem("formRegistroData", JSON.stringify(data));
}

/**
 * Carga datos del formulario si existen en localStorage.
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
 * Limpia el formulario en pantalla.
 */
function clearForm() {
  document.getElementById("usuario").value = "";
  document.getElementById("clave").value = "";
  document.getElementById("repetirClave").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("apellidos").value = "";
  document.getElementById("domicilio").value = "";
  document.getElementById("poblacion").value = "";
  document.getElementById("provincia").value = "";
  document.getElementById("cp").value = "";
  document.getElementById("nif").value = "";
}
