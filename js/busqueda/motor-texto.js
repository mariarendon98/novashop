/**
 * NovaShop - M2 Búsqueda básica
 * Parte 03: Motor de búsqueda por texto (RF04, RNF02).
 * Responsable: MPSR (Team Leader).
 */
(function (ns) {
  'use strict';

  /**
   * Filtra los artículos cuyo nombre contiene el texto buscado.
   * No distingue mayúsculas ni tildes ("lapiz" encuentra "Lápices"... por "lapic").
   * Un texto vacío devuelve todos los artículos.
   */
  ns.buscarPorTexto = function (articulos, texto) {
    var consulta = ns.normalizarTexto(texto);
    if (consulta === '') { return articulos.slice(); }
    var palabras = consulta.split(/\s+/);
    return articulos.filter(function (a) {
      var nombre = ns.normalizarTexto(a.nombre);
      return palabras.every(function (p) { return nombre.indexOf(p) !== -1; });
    });
  };

  /**
   * Devuelve una función que espera "ms" milisegundos sin cambios antes de ejecutar.
   * Se usa para que la búsqueda responda al escribir sin recalcular en cada tecla.
   */
  ns.retrasar = function (fn, ms) {
    var temporizador = null;
    return function () {
      var args = arguments;
      clearTimeout(temporizador);
      temporizador = setTimeout(function () { fn.apply(null, args); }, ms);
    };
  };
})(window.NovaShop = window.NovaShop || {});
