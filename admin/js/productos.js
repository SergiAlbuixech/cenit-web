document.addEventListener("DOMContentLoaded", function () {
  // 1. Datos de los productos existentes (categorías, descripciones, imágenes...)
  const productData = {
    magnesio: {
      "Magnesio en polvo": {
        description: "Magnesio ideal para el parque",
        price: "10€",
        existences: "12",
        img: "../images/magnesio-polvo-routsetter.jpg",
      },
      "Magnesio liquido": {
        description: "Magnesio ideal Escalada",
        price: "16€",
        existences: "8",
        img: "../images/magnesioliquido.jpg",
      },
      "Magnesio en bloque": {
        description: "Magnesio ideal GYM",
        price: "5€",
        existences: "20",
        img: "../images/magnesiobloque.webp",
      },
    },
    goma: {
      "Goma 35kg": {
        description: "Goma con resistencia de 35kg",
        price: "14€",
        existences: "12",
        img: "../images/gomaNaranja.avif",
      },
      "Goma 25kg": {
        description: "Goma con resistencia de 25kg",
        price: "10€",
        existences: "8",
        img: "../images/gomaAmarilla.jpg",
      },
      "Goma 15kg": {
        description: "Goma con resistencia de 15kg",
        price: "8€",
        existences: "20",
        img: "../images/gomaTurquesa.avif",
      },
      "Goma 5kg": {
        description: "Goma con resistencia de 5kg",
        price: "5€",
        existences: "5",
        img: "../images/gomaAzul.jpg",
      },
    },
    paralelas: {
      ParalelasAltas: {
        description: "Paralelas Altas",
        price: "55€",
        existences: "2",
        img: "../images/paralelas fondos.jpg",
      },
      ParalelasPlatico: {
        description: "Paralelas Plastico",
        price: "10€",
        existences: "28",
        img: "../images/paralelasPlastico.avif",
      },
      ParaleasMadera: {
        description: "Paralelas Madera",
        price: "100€",
        existences: "13",
        img: "../images/paralelas100.jpg",
      },
      ParalelasHierro: {
        description: "Paralelas Hierro",
        price: "5€",
        existences: "5",
        img: "../images/paralelashierro.webp",
      },
    },
    anillas: {
      Anillas: {
        description: "Anillas Madera",
        price: "60€",
        existences: "4",
        img: "../images/Anillas-Ignittion-Rings-10.jpg",
      },
    },
  };

  // 2. Referencias al modal
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalOk = document.getElementById("modal-ok");

  modalOk.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  // 3. Actualizar fila al cambiar la categoría (select)
  const selects = document.querySelectorAll(".select-product");
  selects.forEach((select) => {
    updateRow(select); // Inicializa al cargar
    select.addEventListener("change", function () {
      updateRow(select);
    });
  });

  function updateRow(select) {
    const family = select.dataset.family; // "magnesio", "goma", etc.
    const subproduct = select.value;
    const row = select.closest("tr");

    const descInput = row.querySelector(".descripcion");
    const priceInput = row.querySelector(".precio");
    const existInput = row.querySelector(".existencias");
    const imgElement = row.querySelector(".product-img");

    // Datos del objeto productData
    const data = productData[family][subproduct];
    descInput.value = data.description;
    priceInput.value = data.price;
    existInput.value = data.existences;

    if (data.img) {
      imgElement.src = data.img;
    }
  }

  // 4. Simular subida de foto al hacer clic en "Examinar"
  const examinarButtons = document.querySelectorAll(".btn-examinar");
  examinarButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = btn.closest("tr");
      const fotoEstado = row.querySelector(".foto-estado");
      fotoEstado.textContent = "Foto subida";
    });
  });

  // 5. Mostrar modal al pulsar "Modificar"
  const modificarButtons = document.querySelectorAll(".btn-modificar");
  modificarButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      modalMessage.textContent = "Producto modificado";
      modal.classList.remove("hidden");
    });
  });

  // 6. Botón “Insertar nuevo producto” (lleva a otra página, p.ej. producto-nuevo.html)
  const btnInsertarNuevo = document.querySelector(".btn-insertar-nuevo");
  if (btnInsertarNuevo) {
    btnInsertarNuevo.addEventListener("click", function () {
      window.location.href = "producto-nuevo.html";
    });
  }

  // 7. Cargar productos de localStorage (si existen) y añadirlos a la tabla
  const nuevosProductos =
    JSON.parse(localStorage.getItem("nuevosProductos")) || [];
  const tbody = document.getElementById("productos-tbody"); // <tbody id="productos-tbody">

  nuevosProductos.forEach((producto) => {
    // Creamos una nueva fila
    const newRow = document.createElement("tr");
    newRow.dataset.id = producto.id; // Para identificarlo al eliminar

    newRow.innerHTML = `
      <td>
        <img
          src="../images/placeholder.jpg"
          class="product-img"
          alt="Nuevo Producto"
        />
      </td>
      <td>${producto.categoria}</td>
      <td>
        <button class="btn-examinar">Examinar</button>
        <span class="foto-estado">No se ha seleccionado ninguna foto</span>
      </td>
      <td>
        <input
          type="text"
          class="descripcion"
          readonly
          value="${producto.descripcion}"
        />
      </td>
      <td>
        <input
          type="text"
          class="precio"
          readonly
          value="${producto.precio}"
        />
      </td>
      <td>
        <input
          type="text"
          class="existencias"
          readonly
          value="${producto.existencias}"
        />
      </td>
      <td>
        <button class="btn-modificar">Modificar</button>
        <button class="btn-eliminar">Eliminar</button>
      </td>
    `;

    // Añadimos la fila al <tbody>
    tbody.appendChild(newRow);

    // Listener para "Examinar" (subida de foto)
    const examinarBtn = newRow.querySelector(".btn-examinar");
    examinarBtn.addEventListener("click", function () {
      const row = examinarBtn.closest("tr");
      const fotoEstado = row.querySelector(".foto-estado");
      fotoEstado.textContent = "Foto subida";
    });

    // Listener para "Modificar"
    const modificarBtn = newRow.querySelector(".btn-modificar");
    modificarBtn.addEventListener("click", function () {
      modalMessage.textContent = "Producto modificado";
      modal.classList.remove("hidden");
    });

    // 8. Botón "Eliminar" para quitar el producto de la tabla y de localStorage
    const eliminarBtn = newRow.querySelector(".btn-eliminar");
    eliminarBtn.addEventListener("click", function () {
      // 1) Eliminar la fila de la tabla
      newRow.remove();

      // 2) Quitar del array en localStorage
      let arr = JSON.parse(localStorage.getItem("nuevosProductos")) || [];
      // Filtramos para sacar este producto
      arr = arr.filter((item) => item.id !== producto.id);
      // Guardamos de nuevo
      localStorage.setItem("nuevosProductos", JSON.stringify(arr));
    });
  });
});
