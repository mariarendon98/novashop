const fs = require('fs');
const path = require('path');

const imgDir = path.join('C:', 'Users', 'Juan Pinzon', '.gemini', 'antigravity', 'scratch', 'novashop-catalog-modular', 'img');

// Definición visual específica para cada producto con colores y elementos gráficos exactos
const itemsVisual = [
  { id: 'A01', name: 'Cuaderno argollado', icon: '📓', bg: '#dbeafe', color: '#1e40af', desc: '100 Hojas Cuadriculado' },
  { id: 'A02', name: 'Resma Papel Carta', icon: '📄', bg: '#f1f5f9', color: '#334155', desc: '500 Hojas · 75g' },
  { id: 'A03', name: 'Libreta Ejecutiva', icon: '📕', bg: '#fee2e2', color: '#991b1b', desc: 'Tapa Dura · Elástico' },
  { id: 'A04', name: 'Cartulinas Surtidas', icon: '📑', bg: '#fef3c7', color: '#92400e', desc: 'x10 Colores Vivos' },
  { id: 'A05', name: 'Bolígrafos x3', icon: '🖊️', bg: '#e0e7ff', color: '#3730a3', desc: 'Negro, Azul y Rojo' },
  { id: 'A06', name: 'Lápices Grafito x12', icon: '✏️', bg: '#fef9c3', color: '#854d0e', desc: 'Caja x12 HB' },
  { id: 'A07', name: 'Resaltadores Neón x4', icon: '🖍️', bg: '#ecfdf5', color: '#065f46', desc: '4 Colores Fluorescentes' },
  { id: 'A08', name: 'Marcadores Tablero', icon: '🖊️', bg: '#e0f2fe', color: '#0369a1', desc: 'x4 Borrables en Seco' },
  { id: 'A09', name: 'Borradores de Nata', icon: '🧽', bg: '#f8fafc', color: '#475569', desc: 'x3 Libres de Látex' },
  { id: 'A10', name: 'Cinta Correctora', icon: '📼', bg: '#fae8ff', color: '#86198f', desc: 'Cinta en Seco 5mm' },
  { id: 'A11', name: 'Colores Escolares', icon: '🎨', bg: '#ffedd5', color: '#9a3412', desc: 'Caja x12 de Madera' },
  { id: 'A12', name: 'Tijeras Escolares', icon: '✂️', bg: '#fee2e2', color: '#b91c1c', desc: 'Punta Roma 13cm' },
  { id: 'A13', name: 'Pegante en Barra', icon: '🧴', bg: '#ecfdf5', color: '#047857', desc: 'Barra 40g Lavable' },
  { id: 'A14', name: 'Plastilina x10', icon: '🧱', bg: '#fdf4ff', color: '#7e22ce', desc: '10 Barras Moldeables' },
  { id: 'A15', name: 'Set de Témperas', icon: '🎨', bg: '#fef2f2', color: '#dc2626', desc: 'x6 Frascos + Pincel' },
  { id: 'A16', name: 'Cosedora Metálica', icon: '🪛', bg: '#f1f5f9', color: '#0f172a', desc: 'Estándar + Grapas' },
  { id: 'A17', name: 'Perforadora 2 Huecos', icon: '🔘', bg: '#e2e8f0', color: '#1e293b', desc: 'Cuerpo Metálico' },
  { id: 'A18', name: 'Clips Metálicos x100', icon: '📎', bg: '#f8fafc', color: '#334155', desc: 'Caja x100 Galvanizados' },
  { id: 'A19', name: 'Cinta Transparente', icon: '📦', bg: '#e0f2fe', color: '#0284c7', desc: 'Con Dispensador' },
  { id: 'A20', name: 'Juego Geométrico', icon: '📐', bg: '#f0fdf4', color: '#166534', desc: '4 Piezas + Compás' }
];

itemsVisual.forEach(item => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="grad-${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${item.bg}"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#grad-${item.id})"/>
    <rect x="20" y="20" width="360" height="260" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" opacity="0.9"/>
    
    <!-- Badge de ID -->
    <rect x="35" y="35" width="48" height="24" rx="6" fill="#1e3a8a"/>
    <text x="59" y="51" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">${item.id}</text>
    
    <!-- Emoji o Icono central representativo -->
    <text x="200" y="145" font-family="'Segoe UI Emoji', 'Apple Color Emoji', Arial" font-size="75" text-anchor="middle">${item.icon}</text>
    
    <!-- Nombre y detalle exacto del producto -->
    <text x="200" y="210" font-family="'Segoe UI', Arial, sans-serif" font-size="17" font-weight="bold" fill="${item.color}" text-anchor="middle">${item.name}</text>
    <text x="200" y="235" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="600" fill="#64748b" text-anchor="middle">${item.desc}</text>
  </svg>`;

  fs.writeFileSync(path.join(imgDir, `${item.id}.jpg`), svg, 'utf-8');
});

console.log('20 imagenes exactas e ilustradas generadas en img/');
