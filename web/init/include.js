function includeHTML() {
  document.querySelectorAll("[data-include]").forEach(async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Error al cargar ${file}`);
      el.innerHTML = await response.text();
    } catch (error) {
      console.error(error);
    }
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
