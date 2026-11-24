/**
 * NovaShop - Utilidades compartidas por todos los módulos.
 */
(function (ns) {
  'use strict';

  var formateador = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

  /** Formatea un número como pesos colombianos (RNF07). Ej.: 8500 -> "$ 8.500". */
  ns.formatoCOP = function (valor) {
    return formateador.format(valor);
  };

  /** Pasa a minúsculas y quita tildes para comparar textos sin distinguir acentos. */
  ns.normalizarTexto = function (texto) {
    return String(texto || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  };

  /** Escapa caracteres HTML para evitar inyección al pintar datos del usuario. */
  ns.escaparHTML = function (texto) {
    return String(texto).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /** Acceso seguro a localStorage (en pruebas se puede reemplazar por un objeto en memoria). */
  ns.almacen = {
    leer: function (clave, porDefecto) {
      try {
        var v = window.localStorage.getItem(clave);
        return v === null ? porDefecto : JSON.parse(v);
      } catch (e) { return porDefecto; }
    },
    guardar: function (clave, valor) {
      try { window.localStorage.setItem(clave, JSON.stringify(valor)); return true; } catch (e) { return false; }
    },
    borrar: function (clave) {
      try { window.localStorage.removeItem(clave); } catch (e) { /* sin almacenamiento */ }
    }
  };
})(window.NovaShop = window.NovaShop || {});
