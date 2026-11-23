/**
 * js/catalogo/render.js
 * Funciones de renderizado del catálogo en cuadrícula y formato de moneda
 * Requerimiento: RF06 (Mostrar los 20 artículos con sus 4 atributos)
 */

function formatearCOP(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor);
}

function obtenerEstiloBadge(categoria) {
  switch (categoria) {
    case "Cuadernos y Papelería": 
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Escritura y Corrección": 
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Útiles y Manualidades": 
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Artículos de Oficina": 
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Geometría y Medición": 
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    default: 
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
}

function renderizarCuadricula(listaArticulos) {
  const contenedor = document.getElementById("catalogGrid");
  const contador = document.getElementById("productCount");

  contenedor.innerHTML = "";
  contador.textContent = listaArticulos.length;

  if (listaArticulos.length === 0) {
    contenedor.innerHTML = `
      <div class="col-span-full text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
        <i class="fa-solid fa-box-open text-4xl text-slate-300 mb-3"></i>
        <p class="text-slate-500 font-medium">No se encontraron artículos en esta categoría.</p>
      </div>
    `;
    return;
  }

  listaArticulos.forEach(art => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-0.5";
    tarjeta.onclick = () => mostrarModalDetalle(art.id);

    tarjeta.innerHTML = `
      <div class="relative bg-slate-100 h-44 overflow-hidden flex items-center justify-center p-2">
        <img src="${art.imagen}" alt="${art.nombre}" class="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300">
        <span class="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full border shadow-xs ${obtenerEstiloBadge(art.categoria)}">
          ${art.categoria}
        </span>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 class="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors line-clamp-1 mb-1">
            ${art.nombre}
          </h4>
          <p class="text-xs text-slate-500 line-clamp-2 mb-3">
            ${art.caracteristicas}
          </p>
        </div>
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[10px] text-slate-400 block -mb-0.5">Precio</span>
            <span class="text-base font-extrabold text-blue-800">${formatearCOP(art.precio)}</span>
          </div>
          <div class="text-right">
            <span class="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
              ${art.stock} disp.
            </span>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  });
}
