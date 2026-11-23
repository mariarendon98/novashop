/**
 * js/datos/productos.js
 * Base de datos oficial de los 20 artículos del Catálogo NovaShop (Papelería y Oficina)
 * Responsable: Juan Diego Pinzón Castillo (Development Manager - JDPC)
 * Formato de imágenes: Archivos .svg limpios y nativos
 */

const productosData = [
  // --- Categoría 1: Cuadernos y Papelería ---
  {
    id: "A01",
    nombre: "Cuaderno argollado 100 hojas",
    categoria: "Cuadernos y Papelería",
    caracteristicas: "100 hojas cuadriculadas de 75g, pasta dura plastificada, espiral metálico doble.",
    precio: 8500,
    stock: 45,
    imagen: "img/A01.svg"
  },
  {
    id: "A02",
    nombre: "Resma de papel carta 75g",
    categoria: "Cuadernos y Papelería",
    caracteristicas: "500 hojas tamaño carta (21.6 x 27.9 cm), blancura 95% para fotocopiado e impresión.",
    precio: 22000,
    stock: 25,
    imagen: "img/A02.svg"
  },
  {
    id: "A03",
    nombre: "Libreta de notas ejecutiva",
    categoria: "Cuadernos y Papelería",
    caracteristicas: "80 hojas rayadas color crema, cubierta en cuerina con banda elástica y cinta separadora.",
    precio: 14000,
    stock: 30,
    imagen: "img/A03.svg"
  },
  {
    id: "A04",
    nombre: "Paquete de cartulinas surtidas",
    categoria: "Cuadernos y Papelería",
    caracteristicas: "Paquete x10 pliegos de cartulina plana de 180g en colores vivos surtidos para carteleras.",
    precio: 6000,
    stock: 40,
    imagen: "img/A04.svg"
  },

  // --- Categoría 2: Escritura y Corrección ---
  {
    id: "A05",
    nombre: "Bolígrafos tinta seca x3",
    categoria: "Escritura y Corrección",
    caracteristicas: "Paquete con 3 bolígrafos (negro, azul y rojo), punta fina 0.7mm, secado ultra rápido.",
    precio: 4500,
    stock: 60,
    imagen: "img/A05.svg"
  },
  {
    id: "A06",
    nombre: "Lápices de grafito HB x12",
    categoria: "Escritura y Corrección",
    caracteristicas: "Caja x12 unidades con mina de grafito resistente 2mm, madera reforestada con borrador.",
    precio: 12000,
    stock: 35,
    imagen: "img/A06.svg"
  },
  {
    id: "A07",
    nombre: "Resaltadores fluorescentes x4",
    categoria: "Escritura y Corrección",
    caracteristicas: "Set x4 colores neón (amarillo, verde, rosa y naranja), punta biselada para trazo fino y grueso.",
    precio: 9500,
    stock: 40,
    imagen: "img/A07.svg"
  },
  {
    id: "A08",
    nombre: "Marcadores para tablero x4",
    categoria: "Escritura y Corrección",
    caracteristicas: "Set de marcadores borrables en seco (negro, azul, rojo y verde), tinta de bajo olor sin manchas.",
    precio: 13500,
    stock: 30,
    imagen: "img/A08.svg"
  },
  {
    id: "A09",
    nombre: "Borradores de nata libre de látex",
    categoria: "Escritura y Corrección",
    caracteristicas: "Paquete x3 borradores blancos de miga suave, borrado limpio sin desgarrar el papel.",
    precio: 3500,
    stock: 70,
    imagen: "img/A09.svg"
  },
  {
    id: "A10",
    nombre: "Cinta correctora en seco",
    categoria: "Escritura y Corrección",
    caracteristicas: "Dispensador ergonómico de 5mm x 6m, cobertura instantánea y escritura inmediata sobre la cinta.",
    precio: 5000,
    stock: 45,
    imagen: "img/A10.svg"
  },

  // --- Categoría 3: Útiles y Manualidades ---
  {
    id: "A11",
    nombre: "Caja de colores escolares x12",
    categoria: "Útiles y Manualidades",
    caracteristicas: "12 lápices de colores vivos de mina blanda y resistente de 3.3mm, incluye sacapuntas.",
    precio: 9000,
    stock: 50,
    imagen: "img/A11.svg"
  },
  {
    id: "A12",
    nombre: "Tijeras escolares punta roma",
    categoria: "Útiles y Manualidades",
    caracteristicas: "Hojas de acero inoxidable de 13 cm, punta redondeada de seguridad para niños y mango ergonómico.",
    precio: 4500,
    stock: 40,
    imagen: "img/A12.svg"
  },
  {
    id: "A13",
    nombre: "Pegante en barra 40g lavable",
    categoria: "Útiles y Manualidades",
    caracteristicas: "Barra adhesiva libre de solventes, secado transparente y lavable en agua, seguro y no tóxico.",
    precio: 3800,
    stock: 55,
    imagen: "img/A13.svg"
  },
  {
    id: "A14",
    nombre: "Caja de plastilina x10 barras",
    categoria: "Útiles y Manualidades",
    caracteristicas: "10 barras de plastilina moldeable de 150g en colores surtidos, no endurece ni mancha las manos.",
    precio: 6500,
    stock: 35,
    imagen: "img/A14.svg"
  },
  {
    id: "A15",
    nombre: "Set de témperas escolares x6",
    categoria: "Útiles y Manualidades",
    caracteristicas: "6 frascos de pintura lavable de 25ml en colores primarios y secundarios, incluye pincel.",
    precio: 8000,
    stock: 30,
    imagen: "img/A15.svg"
  },

  // --- Categoría 4: Artículos de Oficina ---
  {
    id: "A16",
    nombre: "Cosedora metálica estándar",
    categoria: "Artículos de Oficina",
    caracteristicas: "Estructura metálica resistente con capacidad para 20 hojas, incluye caja de 1000 grapas estándar 26/6.",
    precio: 16500,
    stock: 20,
    imagen: "img/A16.svg"
  },
  {
    id: "A17",
    nombre: "Perforadora de papel 2 huecos",
    categoria: "Artículos de Oficina",
    caracteristicas: "Cuerpo metálico con guía de alineación de papel y bandeja para desperdicios, perfora hasta 15 hojas.",
    precio: 15000,
    stock: 25,
    imagen: "img/A17.svg"
  },
  {
    id: "A18",
    nombre: "Caja de clips metálicos x100",
    categoria: "Artículos de Oficina",
    caracteristicas: "Clips galvanizados n.º 2 resistentes a la oxidación, presentados en caja dispensadora acrílica.",
    precio: 3200,
    stock: 80,
    imagen: "img/A18.svg"
  },
  {
    id: "A19",
    nombre: "Cinta adhesiva con dispensador",
    categoria: "Artículos de Oficina",
    caracteristicas: "Rollo de cinta transparente de 18mm x 30m con base dispensadora de corte metálico dentado.",
    precio: 4000,
    stock: 50,
    imagen: "img/A19.svg"
  },

  // --- Categoría 5: Geometría y Medición ---
  {
    id: "A20",
    nombre: "Juego geométrico con compás",
    categoria: "Geometría y Medición",
    caracteristicas: "Set acrílico transparente: regla 30cm, escuadra 45°, escuadra 60°, transportador y compás metálico.",
    precio: 7500,
    stock: 40,
    imagen: "img/A20.svg"
  }
];
