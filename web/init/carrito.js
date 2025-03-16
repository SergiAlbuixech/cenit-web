document.addEventListener("DOMContentLoaded", function () {
  actualizarCarrito();

  // Selecciona todos los botones "Añadir al carrito"
  const botones = document.querySelectorAll(".btn-panel");
  botones.forEach((boton) => {
    boton.addEventListener("click", function () {
      const fila = boton.closest("tr");
      if (!fila) return;

      const imagen = fila.querySelector("img")?.src || "";
      const descripcion =
        fila.querySelector("td:nth-child(2)")?.innerText || "";
      const precio = fila.querySelector("td:nth-child(3)")?.innerText || "0€";
      if (!descripcion || !precio) return;

      const producto = {
        imagen: imagen,
        descripcion: descripcion,
        precio: precio,
        cantidad: 1,
      };

      agregarAlCarrito(producto);
    });
  });
});

// Vaciar carrito
document
  .getElementById("vaciar-carrito")
  .addEventListener("click", function () {
    localStorage.removeItem("carrito");
    actualizarCarrito();
  });

// Referencias a elementos del DOM (carrito.html)
const comprarCarritoBtn = document.getElementById("comprar-carrito");
const botonesUsuario = document.getElementById("botones-usuario");
const continuarComprandoBtn = document.getElementById("continuar-comprando");
const formalizarPedidoBtn = document.getElementById("formalizar-pedido");
const cerrarSesionBtn = document.getElementById("cerrar-sesion");

const formEnvio = document.getElementById("form-envio");
const finalizarCompraBtn = document.getElementById("finalizar-compra");
const mensajeFinal = document.getElementById("mensaje-final");
const volverInicioBtn = document.getElementById("volver-inicio");

// Guardamos en localStorage si el usuario está "logueado" (falso login)
let loggedIn = localStorage.getItem("loggedIn") === "true";

// Función para mostrar/ocultar elementos según el estado (login o no)
function actualizarVistaCompra() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Si no hay productos, ocultamos todo lo relacionado con la compra
  if (carrito.length === 0) {
    if (comprarCarritoBtn) comprarCarritoBtn.style.display = "none";
    if (botonesUsuario) botonesUsuario.style.display = "none";
    if (formEnvio) formEnvio.style.display = "none";
    if (mensajeFinal) mensajeFinal.style.display = "none";
    return;
  }

  // Si hay productos en el carrito
  if (!loggedIn) {
    // Usuario NO logueado => Mostrar "Comprar Carrito" y ocultar botones de usuario
    if (comprarCarritoBtn) comprarCarritoBtn.style.display = "inline-block";
    if (botonesUsuario) botonesUsuario.style.display = "none";
    if (formEnvio) formEnvio.style.display = "none";
    if (mensajeFinal) mensajeFinal.style.display = "none";
  } else {
    // Usuario logueado => Ocultar "Comprar Carrito" y mostrar botones de usuario
    if (comprarCarritoBtn) comprarCarritoBtn.style.display = "none";
    if (botonesUsuario) botonesUsuario.style.display = "block";
  }
}

// Llamamos a la función al cargar la página
actualizarVistaCompra();

// Evento para el botón "Comprar Carrito"
// (redirige a loginCarrito.html si lo tienes configurado)
if (comprarCarritoBtn) {
  comprarCarritoBtn.addEventListener("click", function () {
    window.location.href = "loginCarrito.html?redirect=carrito";
  });
}

// Evento para "Continuar Comprando"
if (continuarComprandoBtn) {
  continuarComprandoBtn.addEventListener("click", function () {
    loggedIn = false;
    localStorage.setItem("loggedIn", "false");
    window.location.href = "carrito.html";
  });
}

// Evento para "Formalizar Pedido"
if (formalizarPedidoBtn) {
  formalizarPedidoBtn.addEventListener("click", function () {
    if (formEnvio) formEnvio.style.display = "block";
    if (mensajeFinal) mensajeFinal.style.display = "none";
  });
}

// Evento para "Cerrar Sesión"
if (cerrarSesionBtn) {
  cerrarSesionBtn.addEventListener("click", function () {
    loggedIn = false;
    localStorage.setItem("loggedIn", "false");
    if (formEnvio) formEnvio.style.display = "none";
    if (mensajeFinal) mensajeFinal.style.display = "none";
    actualizarVistaCompra();
  });
}

// Evento para "Finalizar Compra"
if (finalizarCompraBtn) {
  finalizarCompraBtn.addEventListener("click", function () {
    if (formEnvio) formEnvio.style.display = "none";
    if (mensajeFinal) mensajeFinal.style.display = "block";
  });
}

// Evento para "Volver al inicio" (botón del mensaje final)
if (volverInicioBtn) {
  volverInicioBtn.addEventListener("click", function () {
    loggedIn = false;
    localStorage.setItem("loggedIn", "false");
    window.location.href = "carrito.html";
  });
}

// Función para agregar producto al carrito
function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const index = carrito.findIndex(
    (item) => item.descripcion === producto.descripcion
  );
  if (index !== -1) {
    carrito[index].cantidad++;
  } else {
    carrito.push(producto);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
  alert("Producto añadido al carrito.");
}

// Función para actualizar la tabla del carrito
function actualizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const tabla = document.querySelector("#tabla-carrito tbody");
  const totalPrecioElemento = document.getElementById("total-precio");
  let total = 0;

  if (!tabla || !totalPrecioElemento) return;
  tabla.innerHTML = ""; // Limpia la tabla antes de llenarla

  carrito.forEach((producto, index) => {
    const precioNumerico =
      parseFloat(producto.precio.replace(/[^0-9,.]/g, "").replace(",", ".")) ||
      0;
    total += precioNumerico * producto.cantidad;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${producto.imagen}" width="100"></td>
      <td>${producto.descripcion}</td>
      <td>${producto.precio}</td>
      <td>
        <button class="restar" data-index="${index}">➖</button>
        ${producto.cantidad}
        <button class="sumar" data-index="${index}">➕</button>
      </td>
      <td><button class="eliminar" data-index="${index}">❌</button></td>
    `;
    tabla.appendChild(fila);
  });

  totalPrecioElemento.textContent = total.toFixed(2) + "€";

  document.querySelectorAll(".sumar").forEach((boton) => {
    boton.addEventListener("click", function () {
      modificarCantidad(this.getAttribute("data-index"), 1);
    });
  });

  document.querySelectorAll(".restar").forEach((boton) => {
    boton.addEventListener("click", function () {
      modificarCantidad(this.getAttribute("data-index"), -1);
    });
  });

  document.querySelectorAll(".eliminar").forEach((boton) => {
    boton.addEventListener("click", function () {
      eliminarProducto(this.getAttribute("data-index"));
    });
  });
}

// Función para modificar cantidad
function modificarCantidad(index, cambio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito[index]) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}
