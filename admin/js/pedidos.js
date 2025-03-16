document.addEventListener("DOMContentLoaded", function () {
  // Referencias al modal
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalOk = document.getElementById("modal-ok");

  // Función para mostrar el modal con un mensaje
  function showModal(msg) {
    modalMessage.textContent = msg;
    modal.classList.remove("hidden");
  }

  // Cerrar el modal al hacer clic en "Aceptar"
  modalOk.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  // Cuando cambie el estado de un pedido, mostramos "Estado cambiado"
  const estadoSelects = document.querySelectorAll(".estado-select");
  estadoSelects.forEach((select) => {
    select.addEventListener("change", function () {
      showModal("Estado cambiado");
    });
  });

  // Cuando se pulsa "Filtrar", mostramos "Búsqueda filtrada" (no hace nada real)
  const btnFiltrar = document.getElementById("btnFiltrar");
  if (btnFiltrar) {
    btnFiltrar.addEventListener("click", function () {
      showModal("Búsqueda filtrada");
    });
  }
});
