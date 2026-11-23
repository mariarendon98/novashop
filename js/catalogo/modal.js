/**
 * js/catalogo/modal.js
 * Lógica del Modal para visualización de descripción ampliada y stock
 * Requerimiento: RF07 (Ampliar la descripción al hacer clic)
 */

function mostrarModalDetalle(productoId) {
  const producto = productosData.find(p => p.id === productoId);
  if (!producto) return;

  const modal = document.getElementById("detailModal");
  const modalImg = document.getElementById("modalImg");
  
  modalImg.src = producto.imagen;
  modalImg.alt = producto.nombre;

  document.getElementById("modalId").textContent = `ID: ${producto.id}`;
  document.getElementById("modalTitle").textContent = producto.nombre;
  document.getElementById("modalDesc").textContent = producto.caracteristicas;
  document.getElementById("modalPrice").textContent = formatearCOP(producto.precio);
  document.getElementById("modalStock").textContent = `${producto.stock} unidades en almacén`;

  const badge = document.getElementById("modalCategoryBadge");
  badge.textContent = producto.categoria;
  badge.className = `absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-xs ${obtenerEstiloBadge(producto.categoria)}`;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function ocultarModalDetalle() {
  const modal = document.getElementById("detailModal");
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}
