/**
 * NovaShop - M1 Cuentas de usuario
 * Parte 01: Registro y validación de cliente (RF01, RNF03).
 * Responsable: NASV (Support Manager).
 */
(function (ns) {
  'use strict';

  var CLAVE_USUARIOS = 'novashop.usuarios';
  var REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /**
   * Valida los datos del formulario de registro.
   * Reglas: nombre de 3 a 60 letras; correo con formato válido;
   * contraseña de al menos 8 caracteres con una letra y un número; confirmación igual.
   * @returns {string[]} lista de errores (vacía si todo es válido).
   */
  ns.validarRegistro = function (datos) {
    var errores = [];
    var nombre = String(datos.nombre || '').trim();
    var correo = String(datos.correo || '').trim();
    var clave = String(datos.clave || '');

    if (nombre.length < 3 || nombre.length > 60) {
      errores.push('El nombre debe tener entre 3 y 60 caracteres.');
    } else if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/.test(nombre)) {
      errores.push('El nombre solo puede contener letras y espacios.');
    }
    if (!REGEX_CORREO.test(correo)) {
      errores.push('Ingresa un correo electrónico válido (ej. nombre@correo.com).');
    }
    if (clave.length < 8 || !/[A-Za-z]/.test(clave) || !/\d/.test(clave)) {
      errores.push('La contraseña debe tener mínimo 8 caracteres, con al menos una letra y un número.');
    }
    if (clave !== String(datos.confirmacion || '')) {
      errores.push('Las contraseñas no coinciden.');
    }
    return errores;
  };

  /** Obtiene la lista de usuarios guardados. */
  ns.obtenerUsuarios = function () {
    return ns.almacen.leer(CLAVE_USUARIOS, []);
  };

  /** Busca un usuario por correo (sin distinguir mayúsculas). */
  ns.buscarUsuario = function (correo) {
    var c = String(correo || '').trim().toLowerCase();
    return ns.obtenerUsuarios().find(function (u) { return u.correo === c; }) || null;
  };

  /** Genera el hash de la contraseña con una "sal" propia del usuario. */
  ns.hashClave = function (clave, sal) {
    return ns.sha256(sal + ':' + clave);
  };

  /**
   * Registra un cliente nuevo.
   * @returns {{ok:boolean, errores:string[]}}
   */
  ns.registrarUsuario = function (datos) {
    var errores = ns.validarRegistro(datos);
    if (errores.length === 0 && ns.buscarUsuario(datos.correo)) {
      errores.push('Ya existe una cuenta registrada con ese correo.');
    }
    if (errores.length > 0) { return { ok: false, errores: errores }; }

    var sal = Math.random().toString(36).slice(2, 12);
    var usuarios = ns.obtenerUsuarios();
    usuarios.push({
      nombre: String(datos.nombre).trim(),
      correo: String(datos.correo).trim().toLowerCase(),
      sal: sal,
      hash: ns.hashClave(String(datos.clave), sal),
      creado: new Date().toISOString()
    });
    ns.almacen.guardar(CLAVE_USUARIOS, usuarios);
    return { ok: true, errores: [] };
  };
})(window.NovaShop = window.NovaShop || {});
