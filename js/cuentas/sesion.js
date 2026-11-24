/**
 * NovaShop - M1 Cuentas de usuario
 * Parte 02: Autenticación y sesión activa (RF02).
 * Responsable: NASV (Support Manager).
 */
(function (ns) {
  'use strict';

  var CLAVE_SESION = 'novashop.sesion';
  var DURACION_MS = 2 * 60 * 60 * 1000; // la sesión vence a las 2 horas

  /**
   * Inicia sesión con correo y contraseña.
   * @returns {{ok:boolean, mensaje:string}}
   */
  ns.iniciarSesion = function (correo, clave) {
    var usuario = ns.buscarUsuario(correo);
    if (!usuario || ns.hashClave(String(clave || ''), usuario.sal) !== usuario.hash) {
      return { ok: false, mensaje: 'Correo o contraseña incorrectos.' };
    }
    var token = ns.sha256(usuario.correo + ':' + Date.now() + ':' + Math.random());
    ns.almacen.guardar(CLAVE_SESION, {
      correo: usuario.correo,
      nombre: usuario.nombre,
      token: token,
      expira: Date.now() + DURACION_MS
    });
    return { ok: true, mensaje: 'Bienvenido(a), ' + usuario.nombre + '.' };
  };

  /** Devuelve la sesión activa o null si no hay sesión o ya venció. */
  ns.sesionActual = function () {
    var sesion = ns.almacen.leer(CLAVE_SESION, null);
    if (!sesion) { return null; }
    if (Date.now() > sesion.expira) {
      ns.cerrarSesion();
      return null;
    }
    return sesion;
  };

  /** Cierra la sesión actual. */
  ns.cerrarSesion = function () {
    ns.almacen.borrar(CLAVE_SESION);
  };
})(window.NovaShop = window.NovaShop || {});
