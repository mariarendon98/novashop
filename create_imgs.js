const fs = require('fs');
const path = require('path');

const imgDir = path.join('C:', 'Users', 'Juan Pinzon', '.gemini', 'antigravity', 'scratch', 'novashop-catalog-modular', 'img');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// Crear un placeholder SVG ligero para cada artículo A01 a A20
for (let i = 1; i <= 20; i++) {
  const id = 'A' + (i < 10 ? '0' + i : i);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
    <rect width="300" height="300" fill="#f1f5f9"/>
    <rect x="20" y="20" width="260" height="260" rx="12" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
    <text x="150" y="140" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#1e3a8a" text-anchor="middle">NovaShop</text>
    <text x="150" y="175" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#475569" text-anchor="middle">${id}</text>
    <text x="150" y="205" font-family="Arial, sans-serif" font-size="13" fill="#64748b" text-anchor="middle">Artículo de Miscelánea</text>
  </svg>`;
  fs.writeFileSync(path.join(imgDir, `${id}.jpg`), svg, 'utf-8');
}

// Crear un .gitkeep para asegurar que la carpeta img se suba a git
fs.writeFileSync(path.join(imgDir, '.gitkeep'), '', 'utf-8');
console.log('Carpeta img y 20 imagenes placeholders creadas exitosamente.');
