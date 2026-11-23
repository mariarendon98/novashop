const fs = require('fs');
const path = require('path');

const imgDir = path.join('C:', 'Users', 'Juan Pinzon', '.gemini', 'antigravity', 'scratch', 'novashop-catalog-modular', 'img');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// Lista oficial de los 20 artículos de papelería
const itemsVisual = [
  { id: 'A01', name: 'Cuaderno argollado', icon: '📓', bg1: '#dbeafe', bg2: '#eff6ff', color: '#1e40af', desc: '100 Hojas Cuadriculado' },
  { id: 'A02', name: 'Resma Papel Carta', icon: '📄', bg1: '#f1f5f9', bg2: '#ffffff', color: '#334155', desc: '500 Hojas · 75g' },
  { id: 'A03', name: 'Libreta Ejecutiva', icon: '📕', bg1: '#fee2e2', bg2: '#fff1f2', color: '#991b1b', desc: 'Tapa Dura · Elástico' },
  { id: 'A04', name: 'Cartulinas Surtidas', icon: '📑', bg1: '#fef3c7', bg2: '#fffbeb', color: '#92400e', desc: 'x10 Colores Vivos' },
  { id: 'A05', name: 'Bolígrafos x3', icon: '🖊️', bg1: '#e0e7ff', bg2: '#eef2ff', color: '#3730a3', desc: 'Negro, Azul y Rojo' },
  { id: 'A06', name: 'Lápices Grafito x12', icon: '✏️', bg1: '#fef9c3', bg2: '#fefce8', color: '#854d0e', desc: 'Caja x12 HB' },
  { id: 'A07', name: 'Resaltadores Neón x4', icon: '🖍️', bg1: '#ecfdf5', bg2: '#f0fdf4', color: '#065f46', desc: '4 Colores Fluorescentes' },
  { id: 'A08', name: 'Marcadores Tablero', icon: '🖊️', bg1: '#e0f2fe', bg2: '#f0f9ff', color: '#0369a1', desc: 'x4 Borrables en Seco' },
  { id: 'A09', name: 'Borradores de Nata', icon: '🧽', bg1: '#f8fafc', bg2: '#ffffff', color: '#475569', desc: 'x3 Libres de Látex' },
  { id: 'A10', name: 'Cinta Correctora', icon: '📼', bg1: '#fae8ff', bg2: '#fdf4ff', color: '#86198f', desc: 'Cinta en Seco 5mm' },
  { id: 'A11', name: 'Colores Escolares', icon: '🎨', bg1: '#ffedd5', bg2: '#fff7ed', color: '#9a3412', desc: 'Caja x12 de Madera' },
  { id: 'A12', name: 'Tijeras Escolares', icon: '✂️', bg1: '#fee2e2', bg2: '#fef2f2', color: '#b91c1c', desc: 'Punta Roma 13cm' },
  { id: 'A13', name: 'Pegante en Barra', icon: '🧴', bg1: '#ecfdf5', bg2: '#f0fdf4', color: '#047857', desc: 'Barra 40g Lavable' },
  { id: 'A14', name: 'Plastilina x10', icon: '🧱', bg1: '#fdf4ff', bg2: '#faf5ff', color: '#7e22ce', desc: '10 Barras Moldeables' },
  { id: 'A15', name: 'Set de Témperas', icon: '🎨', bg1: '#fef2f2', bg2: '#fff1f2', color: '#dc2626', desc: 'x6 Frascos + Pincel' },
  { id: 'A16', name: 'Cosedora Metálica', icon: '🪛', bg1: '#f1f5f9', bg2: '#f8fafc', color: '#0f172a', desc: 'Estándar + Grapas' },
  { id: 'A17', name: 'Perforadora 2 Huecos', icon: '🔘', bg1: '#e2e8f0', bg2: '#f1f5f9', color: '#1e293b', desc: 'Cuerpo Metálico' },
  { id: 'A18', name: 'Clips Metálicos x100', icon: '📎', bg1: '#f8fafc', bg2: '#ffffff', color: '#334155', desc: 'Caja x100 Galvanizados' },
  { id: 'A19', name: 'Cinta Transparente', icon: '📦', bg1: '#e0f2fe', bg2: '#f0f9ff', color: '#0284c7', desc: 'Con Dispensador' },
  { id: 'A20', name: 'Juego Geométrico', icon: '📐', bg1: '#f0fdf4', bg2: '#f7fee7', color: '#166534', desc: '4 Piezas + Compás' }
];

itemsVisual.forEach(item => {
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="grad-${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.bg1}"/>
      <stop offset="100%" stop-color="${item.bg2}"/>
    </linearGradient>
    <filter id="shadow-${item.id}" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.08"/>
    </filter>
  </defs>
  
  <!-- Fondo degradado suave -->
  <rect width="400" height="300" rx="16" fill="url(#grad-${item.id})"/>
  
  <!-- Tarjeta interna blanca con sombra -->
  <rect x="25" y="25" width="350" height="250" rx="14" fill="#ffffff" filter="url(#shadow-${item.id})"/>

  <!-- Badge de ID -->
  <rect x="40" y="40" width="52" height="24" rx="6" fill="#1e3a8a"/>
  <text x="66" y="56" font-family="'Segoe UI', -apple-system, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">${item.id}</text>
  
  <!-- Icono / Emoji gráfico del producto -->
  <text x="200" y="145" font-family="'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif" font-size="70" text-anchor="middle">${item.icon}</text>
  
  <!-- Nombre oficial del producto -->
  <text x="200" y="205" font-family="'Segoe UI', -apple-system, sans-serif" font-size="17" font-weight="bold" fill="${item.color}" text-anchor="middle">${item.name}</text>
  
  <!-- Especificación técnica -->
  <text x="200" y="232" font-family="'Segoe UI', -apple-system, sans-serif" font-size="13" font-weight="600" fill="#64748b" text-anchor="middle">${item.desc}</text>
</svg>`;

  // Guardar como .svg (formato correcto de vector)
  fs.writeFileSync(path.join(imgDir, `${item.id}.svg`), svgContent, 'utf-8');
});

console.log('20 archivos .svg generados exitosamente en img/');
