# Estándar de codificación · NovaShop

Responsable: **JSS** (Quality/Process Manager). Se revisa en cada revisión de código (CR) e inspección (CODEINSP).

## Generales
1. Todo el código, los comentarios y los textos de la interfaz van en **español neutro** (RNF07).
2. Indentación de **2 espacios**, sin tabuladores. Máximo 120 caracteres por línea.
3. Cada archivo JavaScript empieza con un comentario que indica el **módulo**, la **parte conceptual** y el **responsable**.
4. Cada archivo se envuelve en una función autoejecutable que recibe el espacio de nombres `NovaShop`, para no crear variables globales:
   ```js
   (function (ns) {
     'use strict';
     // ...
   })(window.NovaShop = window.NovaShop || {});
   ```

## Nombres
| Elemento | Convención | Ejemplo |
|---|---|---|
| Funciones | camelCase, empiezan con verbo | `buscarPorTexto`, `validarRegistro` |
| Variables | camelCase, sustantivos | `precioMin`, `articulos` |
| Constantes | MAYÚSCULAS_CON_GUION | `CLAVE_SESION` |
| Clases CSS | estilo BEM en español | `.tarjeta__precio`, `.stock--agotado` |
| Archivos | minúsculas con guion | `filtro-avanzado.js` |

## Reglas de calidad
- Toda función pública lleva un comentario `/** ... */` que explica qué hace y qué devuelve.
- Todo texto que venga del usuario o de los datos se pinta con `ns.escaparHTML` (evita inyección de HTML).
- Las contraseñas nunca se guardan en texto plano: se usa `ns.hashClave` (RNF03).
- Los precios se muestran siempre con `ns.formatoCOP` (RNF07).
- No se deja código comentado ni `console.log` en `main`.

## Lista de verificación de la revisión de código (CR)
- [ ] El archivo tiene el encabezado con módulo, parte y responsable.
- [ ] Los nombres siguen la convención.
- [ ] Las entradas del usuario se validan y se escapan.
- [ ] Hay pruebas unitarias para la función nueva o modificada.
- [ ] `pruebas/pruebas.html` muestra todas las pruebas aprobadas.
- [ ] Los defectos encontrados se registraron en la hoja LOGD del TSPi Workbook.
