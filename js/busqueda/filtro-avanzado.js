/**
 * NovaShop - M3 Búsqueda avanzada
 * Parte 04: Filtro multicriterio (RF05) y ordenamiento del catálogo (RF11).
 * Responsable: MSSG (Planning Manager).
 */
(function (ns) {
  'use strict';

  /**
   * Valida el rango de precios. Devuelve un mensaje de error o "" si es válido.
   */
  ns.validarRangoPrecio = function (min, max) {
    if (min !== null && min < 0) { return 'El precio mínimo no puede ser negativo.'; }
    if (max !== null && max < 0) { return 'El precio máximo no puede ser negativo.'; }
    if (min !== null && max !== null && min > max) { return 'El precio mínimo no puede ser mayor que el máximo.'; }
    return '';
  };

  /** Convierte el valor de un campo numérico en número o null si está vacío. */
  ns.leerNumero = function (valor) {
    if (valor === null || valor === undefined || String(valor).trim() === '') { return null; }
    var n = Number(String(valor).replace(/[^\d.-]/g, ''));
    return isNaN(n) ? null : n;
  };

  /**
   * Aplica los criterios combinados. Cada criterio es opcional:
   *   criterios.categoria  -> nombre exacto de la categoría ('' = todas)
   *   criterios.precioMin / precioMax -> números o null
   *   criterios.soloDisponibles -> true para ocultar artículos sin stock
   */
  ns.filtrarAvanzado = function (articulos, criterios) {
    var c = criterios || {};
    return articulos.filter(function (a) {
      if (c.categoria && a.categoria !== c.categoria) { return false; }
      if (c.precioMin !== null && c.precioMin !== undefined && a.precio < c.precioMin) { return false; }
      if (c.precioMax !== null && c.precioMax !== undefined && a.precio > c.precioMax) { return false; }
      if (c.soloDisponibles && a.stock <= 0) { return false; }
      return true;
    });
  };

  /** Cuenta cuántos criterios avanzados están activos (para el aviso de "filtros aplicados"). */
  ns.contarCriterios = function (c) {
    var n = 0;
    if (c.categoria) { n++; }
    if (c.precioMin !== null && c.precioMin !== undefined) { n++; }
    if (c.precioMax !== null && c.precioMax !== undefined) { n++; }
    if (c.soloDisponibles) { n++; }
    return n;
  };

  /** Ordena una copia de la lista: 'precio-asc', 'precio-desc', 'nombre' o '' (orden original). */
  ns.ordenarArticulos = function (articulos, criterio) {
    var copia = articulos.slice();
    if (criterio === 'precio-asc') { copia.sort(function (a, b) { return a.precio - b.precio; }); }
    if (criterio === 'precio-desc') { copia.sort(function (a, b) { return b.precio - a.precio; }); }
    if (criterio === 'nombre') { copia.sort(function (a, b) { return a.nombre.localeCompare(b.nombre, 'es'); }); }
    return copia;
  };
})(window.NovaShop = window.NovaShop || {});
