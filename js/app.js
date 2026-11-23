/**
 * js/app.js
 * Controlador principal de la aplicación y punto de entrada
 * Orquesta los módulos de datos y catálogo
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Iniciando Catálogo NovaShop (Módulo M4 - JDPC)");

  // 1. Renderizar los 20 artículos iniciales
  renderizarCuadricula(productosData);

  // 2. Controladores de eventos para el Modal
  const btnCerrar = document.getElementById("closeModalBtn");
  const btnCerrarFooter = document.getElementById("closeModalFooterBtn");
  const modalFondo = document.getElementById("detailModal");

  if (btnCerrar) btnCerrar.onclick = ocultarModalDetalle;
  if (btnCerrarFooter) btnCerrarFooter.onclick = ocultarModalDetalle;
  if (modalFondo) {
    modalFondo.onclick = (e) => {
      if (e.target.id === "detailModal") ocultarModalDetalle();
    };
  }

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") ocultarModalDetalle();
  });

  // 3. Filtro interactivo por Categoría
  const selectCategoria = document.getElementById("categoryFilter");
  if (selectCategoria) {
    selectCategoria.addEventListener("change", (e) => {
      const catSeleccionada = e.target.value;
      if (catSeleccionada === "ALL") {
        renderizarCuadricula(productosData);
      } else {
        const filtrados = productosData.filter(p => p.categoria === catSeleccionada);
        renderizarCuadricula(filtrados);
      }
    });
  }
});
