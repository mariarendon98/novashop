# NovaShop · Catálogo virtual de una miscelánea de barrio

Prototipo web del curso **Desarrollo de Software en Equipos** (Politécnico Grancolombiano), construido por el equipo **Elevate Labs (Subgrupo 4)** con el proceso **TSPi**.

NovaShop muestra en internet el inventario de una miscelánea de barrio: **20 artículos en 5 categorías**, con imagen, nombre, precio en pesos colombianos y unidades disponibles. Los clientes pueden registrarse, iniciar sesión, buscar por nombre y combinar filtros.

## Estado del proyecto (Entrega 2)

| Módulo | Descripción | Requisitos | Estado |
|---|---|---|---|
| M1 · Cuentas de usuario | Registro con validación, contraseñas con hash SHA-256, inicio y cierre de sesión | RF01, RF02, RNF03 | ✅ Terminado |
| M2 · Búsqueda básica | Búsqueda por nombre sin distinguir mayúsculas ni tildes | RF04, RNF02 | ✅ Terminado |
| M3 · Búsqueda avanzada | Filtros combinados de categoría, rango de precio y stock; ordenamiento | RF05, RF11 | ✅ Terminado |
| M4 · Catálogo de artículos | Cuadrícula de 20 artículos y ventana de detalle con ficha técnica | RF06, RF07 | ✅ Terminado |
| M5 · Compra por artículo | Selector de cantidad validado contra el stock | RF08, RNF05 | ⏳ Entrega 3 |
| M6 · Carrito de compras | Agregar, modificar y eliminar ítems; total del pedido | RF03, RF09, RF10 | ⏳ Entrega 3 |

## Cómo ejecutarlo

No necesita instalación ni servidor:

1. Descarga el repositorio (**Code → Download ZIP**) o clónalo:
   ```bash
   git clone https://github.com/USUARIO/novashop.git
   ```
2. Abre `index.html` con Chrome, Edge o Firefox.
3. Para correr las pruebas unitarias, abre `pruebas/pruebas.html`.

> Los usuarios y la sesión se guardan en el `localStorage` del navegador. Para empezar de cero, borra los datos del sitio desde las herramientas del navegador.

## Estructura del proyecto

```
novashop/
├── index.html                    Parte 05 · Estructura y layout principal
├── css/estilos.css               Estilos (diseño adaptable desde 360 px)
├── js/
│   ├── datos/articulos.js        Datos de los 20 artículos y 5 categorías
│   ├── utilidades.js             Formato COP, normalización de texto, almacenamiento
│   ├── cuentas/                  M1 · Cuentas de usuario
│   │   ├── sha256.js             Hash de contraseñas
│   │   ├── registro.js           Parte 01 · Registro y validación de cliente
│   │   └── sesion.js             Parte 02 · Autenticación y sesión activa
│   ├── busqueda/
│   │   ├── motor-texto.js        Parte 03 · M2 · Motor de búsqueda por texto
│   │   └── filtro-avanzado.js    Parte 04 · M3 · Filtro multicriterio y ordenamiento
│   ├── catalogo/
│   │   ├── cuadricula.js         Parte 06 · Cuadrícula responsiva de artículos
│   │   └── modal-detalle.js      Parte 07 · Modal de detalle de producto
│   └── app.js                    Controlador: conecta los módulos y las vistas
├── img/articulos/                Imágenes A01.svg … A20.svg
├── pruebas/                      Pruebas unitarias (29 casos)
└── docs/                         Estándar de código y flujo de trabajo con Git
```

## Equipo y responsables

| Integrante | Iniciales | Rol TSPi | Responsabilidad en el repositorio |
|---|---|---|---|
| Maria Paula Sarrazola Rendón | MPSR | Team Leader | M2 · Búsqueda básica; aprobación de pull requests |
| Juan Diego Pinzón Castillo | JDPC | Development Manager | M4 · Catálogo; integración en `main` |
| Michael Steve Sánchez Galarza | MSSG | Planning Manager | M3 · Búsqueda avanzada |
| Juan Camilo Sepúlveda Sánchez | JSS | Quality/Process Manager | Inspecciones de código y estándar |
| Cristian Camilo Guillen Ariza | CCGA | Quality & Testing Manager | Pruebas unitarias y de sistema |
| Nicoll Andrea Scarpetta Valentín | NASV | Support Manager | M1 · Cuentas; administración del repositorio |

## Cómo trabajamos

- [Estándar de codificación](docs/ESTANDAR_CODIGO.md)
- [Flujo de trabajo con Git y GitHub](docs/FLUJO_GIT.md)

## Tecnologías

HTML5, CSS3 y JavaScript sin librerías externas. Probado en Chrome, Edge y Firefox, en escritorio y en móvil (360 × 640).
