document.addEventListener("DOMContentLoaded", function () {
  // Verificamos login (simulado)
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (!loggedIn) {
    window.location.href = "registrarse.html";
    return;
  }

  // 1) Dos pedidos fijos (antiguos)
  let pedidos = [
    {
      id: "001",
      fecha: "10/01/2023",
      importe: 99.95,
      estado: "Entregado",
      productos: [
        {
          descripcion: "Curso de anillas avanzado",
          precio: "50€",
          cantidad: 1,
        },
        { descripcion: "Gomas de resistencia", precio: "49.95€", cantidad: 1 },
      ],
    },
    {
      id: "002",
      fecha: "15/02/2023",
      importe: 149.99,
      estado: "Entregado",
      productos: [
        { descripcion: "Barra de dominadas", precio: "60€", cantidad: 1 },
        { descripcion: "Anillas de madera", precio: "89.99€", cantidad: 1 },
      ],
    },
  ];

  // 2) Revisamos si hay algo en el carrito
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length > 0) {
    // Calculamos el importe total del carrito
    let total = 0;
    carrito.forEach((item) => {
      const numericPrice = parseFloat(
        item.precio.replace(/[^0-9,.]/g, "").replace(",", ".")
      );
      total += numericPrice * item.cantidad;
    });

    // Creamos un nuevo pedido con fecha de hoy
    const nuevoPedido = {
      id: String(Math.floor(Math.random() * 10000)), // ID aleatorio
      fecha: obtenerFechaHoy(),
      importe: parseFloat(total.toFixed(2)),
      estado: "Pendiente",
      productos: carrito.map((item) => ({
        descripcion: item.descripcion,
        precio: item.precio,
        cantidad: item.cantidad,
      })),
    };

    // Agregamos el pedido actual a la lista
    pedidos.push(nuevoPedido);
  }

  // 3) Renderizamos los pedidos en la página
  const pedidosContainer = document.getElementById("pedidos-container");
  const btnVolver = document.getElementById("btnVolver");

  renderPedidos();

  // Botón para volver al panel
  btnVolver.addEventListener("click", function () {
    window.location.href = "panel.html";
  });

  /**
   * Dibuja la lista de pedidos en pantalla.
   */
  function renderPedidos() {
    let html = "";

    pedidos.forEach((pedido, index) => {
      html += `
        <div style="background: #f2f2f2; padding: 15px; margin-bottom: 15px; border-radius: 5px; color: #000;">
          <strong>Identificador del pedido:</strong> ${pedido.id}<br/>
          <strong>Fecha:</strong> ${pedido.fecha}<br/>
          <strong>Importe:</strong> ${pedido.importe}€<br/>
          <strong>Estado:</strong> <span id="estado-${index}">${
        pedido.estado
      }</span>
          <br/><br/>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
            <thead>
              <tr style="background: #ddd;">
                <th>Descripción</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              ${pedido.productos
                .map(
                  (prod) => `
                <tr>
                  <td>${prod.descripcion}</td>
                  <td>${prod.precio}</td>
                  <td>${prod.cantidad}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <button class="btnCancelarPedido" data-index="${index}">Cancelar</button>
        </div>
      `;
    });

    pedidosContainer.innerHTML = html;

    // Evento para los botones "Cancelar"
    document.querySelectorAll(".btnCancelarPedido").forEach((btn) => {
      btn.addEventListener("click", function () {
        const idx = this.getAttribute("data-index");
        cancelarPedido(idx);
      });
    });
  }

  /**
   * Cambia el estado del pedido a "Cancelado" (no persiste en recargas).
   */
  function cancelarPedido(index) {
    pedidos[index].estado = "Cancelado";
    renderPedidos();
  }

  /**
   * Retorna la fecha actual formateada DD/MM/YYYY.
   */
  function obtenerFechaHoy() {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, "0");
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const yyyy = hoy.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  }
});
