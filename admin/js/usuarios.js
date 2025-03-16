document.addEventListener("DOMContentLoaded", function () {
  const botonesBaja = document.querySelectorAll(".btn-baja");
  // Obtenemos referencias al modal y sus elementos
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalOk = document.getElementById("modal-ok");

  // Función para mostrar el modal con el mensaje
  function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.remove("hidden"); // mostramos el modal
  }

  // Al hacer clic en "Aceptar" dentro del modal, lo ocultamos
  modalOk.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  // Asignamos el evento a cada botón "Dar de baja" (o "Dar de alta")
  botonesBaja.forEach((boton) => {
    boton.addEventListener("click", function () {
      if (this.textContent === "Dar de baja") {
        // Mostramos modal con el mensaje de baja
        showModal("El usuario ha sido dado de baja");
        // Cambiamos el texto del botón a "Dar de alta"
        this.textContent = "Dar de alta";
      } else {
        // Mostramos modal con el mensaje de alta
        showModal("El usuario ha sido dado de alta");
        // Cambiamos el texto del botón a "Dar de baja"
        this.textContent = "Dar de baja";
      }
    });
  });
});
