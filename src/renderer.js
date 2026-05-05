/**
 * renderer.js
 * Renderizador de cenários em pixel art via Canvas 2D.
 * Cada bgType recebe uma paleta de cores e elementos únicos.
 */

const PALETTES = {
  night_rain:     { sky: ['#070714','#0d0d1a','#111122'], ground: '#0d0a04', accent: '#1a2d3d', hasRain: true  },
  inside_dark:    { sky: ['#0a0808','#120c0c','#1a1010'], ground: '#0f0a06', accent: '#1a1010', hasRain: false },
  street_gray:    { sky: ['#1a1e22','#222630','#2a2e38'], ground: '#1a1814', accent: '#2a2820', hasRain: false },
  school_gate:    { sky: ['#151c24','#1e2832','#26343e'], ground: '#16140e', accent: '#222820', hasRain: false },
  alley:          { sky: ['#0e0c10','#141016','#1a141e'], ground: '#100c08', accent: '#1e1418', hasRain: false },
  community_dusk: { sky: ['#1a100a','#261608','#341c06'], ground: '#180e06', accent: '#2a1a08', hasRain: false },
  school_inside:  { sky: ['#0a1018','#10181e','#162028'], ground: '#12100c', accent: '#1a2018', hasRain: false },
  schoolyard:     { sky: ['#12161c','#181e28','#1e2630'], ground: '#141210', accent: '#1e1e14', hasRain: false },
  city_day:       { sky: ['#0c1824','#14263a','#1c3450'], ground: '#18160e', accent: '#203040', hasRain: false },
  police:         { sky: ['#100808','#1a1010','#221414'], ground: '#0c0a08', accent: '#1a1010', hasRain: false },
  port_gray:      { sky: ['#14181c','#1c2228','#242a30'], ground: '#181614', accent: '#202228', hasRain: false },
  sunrise:        { sky: ['#0e1820','#162838','#1e3850'], ground: '#141210', accent: '#1a2c1a', hasSun: true  }
};

const BUILDING_COLORS = ['#1a1814','#161210','#1e1c18','#141210','#201e1a'];

/**
 * drawPixelBackground — renderiza cenário no canvas
 * @param {string} type - chave do PALETTES
 */
function drawPixelBackground(type) {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // resolução interna baixa para o efeito pixelado
  canvas.width  = 320;
  canvas.height = 80;

  const p = PALETTES[type] || PALETTES.night_rain;

  // Gradiente de céu
  const grad = ctx.createLinearGradient(0, 0, 0, 55);
  p.sky.forEach((color, i) => {
    grad.addColorStop(i / (p.sky.length - 1), color);
  });
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 320, 55);

  // Nuvens pixeladas
  ctx.fillStyle = p.accent;
  const clouds = [[20,12,40,8],[80,8,60,10],[160,14,50,8],[240,10,70,9],[290,6,40,7]];
  clouds.forEach(([x, y, w, h]) => {
    ctx.fillRect(x, y, w, h);
    ctx.fillRect(x + 4, y - 4, w - 10, h);
  });

  // Estrelas
  for (let i = 0; i < 18; i++) {
    const sx = Math.floor(Math.random() * 318);
    const sy = Math.floor(Math.random() * 40);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillRect(sx, sy, 1, 1);
  }

  // Solo / chão
  ctx.fillStyle = '#1a1410';
  ctx.fillRect(0, 52, 320, 28);
  ctx.fillStyle = p.ground;
  ctx.fillRect(0, 60, 320, 20);

  // Prédios / barracos pixelados
  let bx = 0;
  while (bx < 320) {
    const bw = 16 + Math.floor(Math.random() * 24);
    const bh = 16 + Math.floor(Math.random() * 28);
    ctx.fillStyle = BUILDING_COLORS[Math.floor(Math.random() * BUILDING_COLORS.length)];
    ctx.fillRect(bx, 55 - bh, bw, bh);

    // Janela acesa (aleatória)
    if (Math.random() > 0.5) {
      ctx.fillStyle = 'rgba(255,220,100,0.15)';
      ctx.fillRect(bx + 3, 55 - bh + 4, 3, 3);
    }
    bx += bw + 1;
  }

  // Efeito de chuva
  if (p.hasRain) {
    ctx.strokeStyle = 'rgba(80,120,160,0.25)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 30; i++) {
      const rx = Math.random() * 320;
      const ry = Math.random() * 80;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 1, ry + 6);
      ctx.stroke();
    }
  }

  // Efeito de sol nascente
  if (p.hasSun) {
    const sunX = 250, sunY = 30;
    for (let r = 30; r > 0; r -= 5) {
      ctx.fillStyle = `rgba(255,160,60,${0.04 + (30 - r) * 0.003})`;
      ctx.beginPath();
      ctx.arc(sunX, sunY, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,200,80,0.3)';
    ctx.fillRect(sunX - 2, 2, 4, 56);
  }

  // Poças d'água (cenas de chuva)
  if (type === 'night_rain' || type === 'street_gray') {
    ctx.fillStyle = 'rgba(20,40,60,0.5)';
    [[30,70,20,4],[140,72,28,4],[260,68,18,4]].forEach(([x,y,w,h]) => {
      ctx.fillRect(x, y, w, h);
    });
  }
}
