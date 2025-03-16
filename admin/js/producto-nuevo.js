document.addEventListener("DOMContentLoaded", function () {
  const categoriaSelect = document.getElementById("categoria");
  const btnExaminar = document.getElementById("btnExaminar");
  const fotoEstado = document.getElementById("foto-estado");
  const btnInsertar = document.getElementById("btnInsertar");
  const btnVolver = document.getElementById("btnVolver");

  // 1) Permitir crear una nueva categoría
  categoriaSelect.addEventListener("change", function () {
    if (this.value === "Nueva") {
      const nuevaCat = prompt("Introduce el nombre de la nueva categoría:");
      if (nuevaCat && nuevaCat.trim() !== "") {
        // Crear una nueva opción en el <select>
        const newOption = document.createElement("option");
        newOption.value = nuevaCat;
        newOption.textContent = nuevaCat;

        // Insertarla antes de la opción "Nueva"
        const opcionNueva = categoriaSelect.querySelector(
          "option[value='Nueva']"
        );
        categoriaSelect.insertBefore(newOption, opcionNueva);

        // Seleccionar la nueva categoría en el <select>
        categoriaSelect.value = nuevaCat;
      } else {
        // Si no escribe nada o cancela, volvemos al valor por defecto
        categoriaSelect.value = "";
      }
    }
  });

  // 2) Simula la subida de foto al pulsar "Examinar"
  btnExaminar.addEventListener("click", function () {
    fotoEstado.textContent = "Foto subida";
  });

  // 3) Al pulsar "Insertar"
  btnInsertar.addEventListener("click", function () {
    const categoria = categoriaSelect.value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const existencias = document.getElementById("existencias").value;

    // Validación básica
    if (!categoria || !descripcion || !precio || !existencias) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Crear objeto para el nuevo producto
    const nuevoProducto = {
      id: Date.now(),
      categoria,
      descripcion,
      precio,
      existencias,
      foto: fotoEstado.textContent === "Foto subida" ? "subida" : "no subida",
    };

    // Guardar en localStorage (array "nuevosProductos")
    let nuevosProductos =
      JSON.parse(localStorage.getItem("nuevosProductos")) || [];
    nuevosProductos.push(nuevoProducto);
    localStorage.setItem("nuevosProductos", JSON.stringify(nuevosProductos));

    alert("Producto insertado correctamente.");
    // Redirigir a la página de productos
    window.location.href = "productos.html";
  });

  // 4) Al pulsar "Volver"
  btnVolver.addEventListener("click", function () {
    window.location.href = "productos.html";
  });
});
