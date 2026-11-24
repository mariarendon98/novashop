/**
 * NovaShop - Pruebas unitarias (29 casos)
 * Cubren M1 Cuentas, M2 Búsqueda básica, M3 Búsqueda avanzada y M4 Catálogo.
 * Responsable: CCGA (Quality & Testing Manager).
 */
(function (ns) {
  'use strict';

  var resultados = [];

  function prueba(id, modulo, descripcion, fn) {
    try {
      fn();
      resultados.push({ id: id, modulo: modulo, descripcion: descripcion, ok: true, detalle: '' });
    } catch (e) {
      resultados.push({ id: id, modulo: modulo, descripcion: descripcion, ok: false, detalle: e.message });
    }
  }

  function esperar(condicion, mensaje) {
    if (!condicion) { throw new Error(mensaje || 'La condición no se cumplió.'); }
  }

  function igual(obtenido, esperado, mensaje) {
    if (obtenido !== esperado) {
      throw new Error((mensaje || 'Valor distinto') + ': se esperaba ' + JSON.stringify(esperado) +
        ' y se obtuvo ' + JSON.stringify(obtenido));
    }
  }

  // Almacén en memoria para no tocar el localStorage real del navegador.
  function usarAlmacenEnMemoria() {
    var memoria = {};
    ns.almacen = {
      leer: function (clave, porDefecto) {
        return Object.prototype.hasOwnProperty.call(memoria, clave) ? JSON.parse(memoria[clave]) : porDefecto;
      },
      guardar: function (clave, valor) { memoria[clave] = JSON.stringify(valor); return true; },
      borrar: function (clave) { delete memoria[clave]; }
    };
  }

  // Datos de prueba pequeños y controlados.
  var muestra = [
    { id: 'T1', nombre: 'Lápiz grafito HB', categoria: 'Escritura', precio: 1200, stock: 10 },
    { id: 'T2', nombre: 'Cuaderno argollado', categoria: 'Cuadernos', precio: 8500, stock: 0 },
    { id: 'T3', nombre: 'Borrador de nata', categoria: 'Escritura', precio: 800, stock: 5 },
    { id: 'T4', nombre: 'Cuaderno cosido', categoria: 'Cuadernos', precio: 5000, stock: 3 }
  ];

  var valido = { nombre: 'Ana Pérez', correo: 'ana@correo.com', clave: 'clave123', confirmacion: 'clave123' };
  function copiar(extra) {
    var d = {};
    Object.keys(valido).forEach(function (k) { d[k] = valido[k]; });
    Object.keys(extra || {}).forEach(function (k) { d[k] = extra[k]; });
    return d;
  }

  ns.ejecutarPruebas = function () {
    resultados = [];
    usarAlmacenEnMemoria();

    // ---------- Utilidades ----------
    prueba('P01', 'Utilidades', 'normalizarTexto quita tildes y mayúsculas', function () {
      igual(ns.normalizarTexto('  LÁPIZ Ñandú '), 'lapiz nandu');
    });
    prueba('P02', 'Utilidades', 'formatoCOP usa separador de miles sin decimales', function () {
      var t = ns.formatoCOP(8500);
      esperar(t.indexOf('8.500') !== -1, 'Se obtuvo "' + t + '"');
      esperar(t.indexOf(',') === -1, 'No debe mostrar decimales');
    });
    prueba('P03', 'Utilidades', 'escaparHTML neutraliza etiquetas', function () {
      igual(ns.escaparHTML('<b>"x"</b>'), '&lt;b&gt;&quot;x&quot;&lt;/b&gt;');
    });

    // ---------- M1 · Cuentas ----------
    prueba('P04', 'M1', 'SHA-256 de "abc" coincide con el valor estándar', function () {
      igual(ns.sha256('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    });
    prueba('P05', 'M1', 'Registro válido no devuelve errores', function () {
      igual(ns.validarRegistro(valido).length, 0);
    });
    prueba('P06', 'M1', 'Rechaza nombre de menos de 3 caracteres', function () {
      igual(ns.validarRegistro(copiar({ nombre: 'Al' })).length, 1);
    });
    prueba('P07', 'M1', 'Rechaza nombre con números', function () {
      igual(ns.validarRegistro(copiar({ nombre: 'Ana 123' })).length, 1);
    });
    prueba('P08', 'M1', 'Rechaza correo sin dominio', function () {
      igual(ns.validarRegistro(copiar({ correo: 'ana@correo' })).length, 1);
    });
    prueba('P09', 'M1', 'Rechaza contraseña sin números', function () {
      igual(ns.validarRegistro(copiar({ clave: 'soloLetras', confirmacion: 'soloLetras' })).length, 1);
    });
    prueba('P10', 'M1', 'Rechaza contraseña de menos de 8 caracteres', function () {
      igual(ns.validarRegistro(copiar({ clave: 'ab12', confirmacion: 'ab12' })).length, 1);
    });
    prueba('P11', 'M1', 'Rechaza confirmación distinta', function () {
      igual(ns.validarRegistro(copiar({ confirmacion: 'otra1234' })).length, 1);
    });
    prueba('P12', 'M1', 'Registra un usuario y guarda el correo en minúsculas', function () {
      var r = ns.registrarUsuario(copiar({ correo: 'ANA@Correo.com' }));
      esperar(r.ok, 'El registro falló: ' + r.errores.join(' '));
      igual(ns.obtenerUsuarios()[0].correo, 'ana@correo.com');
    });
    prueba('P13', 'M1', 'No guarda la contraseña en texto plano', function () {
      var u = ns.obtenerUsuarios()[0];
      esperar(JSON.stringify(u).indexOf('clave123') === -1, 'La contraseña aparece en claro');
      igual(u.hash.length, 64, 'Longitud del hash');
    });
    prueba('P14', 'M1', 'No permite registrar dos veces el mismo correo', function () {
      var r = ns.registrarUsuario(valido);
      esperar(!r.ok, 'Debió rechazar el correo duplicado');
    });
    prueba('P15', 'M1', 'Inicia sesión con datos correctos', function () {
      esperar(ns.iniciarSesion('ana@correo.com', 'clave123').ok, 'No inició sesión');
      igual(ns.sesionActual().correo, 'ana@correo.com');
    });
    prueba('P16', 'M1', 'Rechaza contraseña incorrecta', function () {
      esperar(!ns.iniciarSesion('ana@correo.com', 'mala1234').ok, 'Aceptó una clave incorrecta');
    });
    prueba('P17', 'M1', 'Cerrar sesión deja la sesión en null', function () {
      ns.cerrarSesion();
      igual(ns.sesionActual(), null);
    });
    prueba('P18', 'M1', 'Una sesión vencida se descarta', function () {
      ns.almacen.guardar('novashop.sesion', { correo: 'ana@correo.com', expira: Date.now() - 1000 });
      igual(ns.sesionActual(), null);
    });

    // ---------- M2 · Búsqueda básica ----------
    prueba('P19', 'M2', 'Encuentra "lapiz" sin tilde ni mayúsculas', function () {
      var r = ns.buscarPorTexto(muestra, 'LAPIZ');
      igual(r.length, 1);
      igual(r[0].id, 'T1');
    });
    prueba('P20', 'M2', 'Texto vacío devuelve todos los artículos', function () {
      igual(ns.buscarPorTexto(muestra, '   ').length, muestra.length);
    });
    prueba('P21', 'M2', 'Varias palabras deben aparecer todas', function () {
      var r = ns.buscarPorTexto(muestra, 'cuaderno cosido');
      igual(r.length, 1);
      igual(r[0].id, 'T4');
    });
    prueba('P22', 'M2', 'Sin coincidencias devuelve lista vacía', function () {
      igual(ns.buscarPorTexto(muestra, 'tijeras').length, 0);
    });

    // ---------- M3 · Búsqueda avanzada ----------
    prueba('P23', 'M3', 'Filtra por categoría', function () {
      igual(ns.filtrarAvanzado(muestra, { categoria: 'Cuadernos' }).length, 2);
    });
    prueba('P24', 'M3', 'Filtra por rango de precio (inclusivo)', function () {
      var r = ns.filtrarAvanzado(muestra, { precioMin: 800, precioMax: 5000 });
      igual(r.length, 3);
    });
    prueba('P25', 'M3', 'Combina categoría y solo disponibles', function () {
      var r = ns.filtrarAvanzado(muestra, { categoria: 'Cuadernos', soloDisponibles: true });
      igual(r.length, 1);
      igual(r[0].id, 'T4');
    });
    prueba('P26', 'M3', 'Valida rango de precio inválido', function () {
      esperar(ns.validarRangoPrecio(5000, 1000) !== '', 'Mínimo > máximo debe dar error');
      esperar(ns.validarRangoPrecio(-1, null) !== '', 'Precio negativo debe dar error');
      igual(ns.validarRangoPrecio(null, null), '');
    });
    prueba('P27', 'M3', 'Ordena por precio ascendente y descendente sin alterar el original', function () {
      igual(ns.ordenarArticulos(muestra, 'precio-asc')[0].id, 'T3');
      igual(ns.ordenarArticulos(muestra, 'precio-desc')[0].id, 'T2');
      igual(muestra[0].id, 'T1', 'La lista original cambió');
    });

    // ---------- M4 · Catálogo ----------
    var catalogo = (typeof productosData !== 'undefined') ? productosData : null;
    prueba('P28', 'M4', 'El catálogo tiene 20 artículos en 5 categorías', function () {
      esperar(catalogo, 'No se cargó js/datos/productos.js');
      igual(catalogo.length, 20, 'Cantidad de artículos');
      var cats = {};
      catalogo.forEach(function (a) { cats[a.categoria] = true; });
      igual(Object.keys(cats).length, 5, 'Cantidad de categorías');
    });
    prueba('P29', 'M4', 'Cada artículo tiene id único, nombre, precio > 0, stock >= 0 e imagen', function () {
      esperar(catalogo, 'No se cargó js/datos/productos.js');
      var ids = {};
      catalogo.forEach(function (a) {
        esperar(!ids[a.id], 'id repetido: ' + a.id);
        ids[a.id] = true;
        esperar(a.nombre && a.precio > 0 && a.stock >= 0 && a.imagen, 'Datos incompletos en ' + a.id);
      });
    });

    return resultados;
  };
})(window.NovaShop = window.NovaShop || {});
