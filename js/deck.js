/* Reveal init + ambient starfield + constellation SVGs (see brief §2–§3) */

Reveal.initialize({
  hash: true,
  transition: 'fade',      // slow, calm — space, not slideshow
  transitionSpeed: 'slow',
  controls: true,
  progress: false,
  center: true,
  plugins: [ RevealNotes ],
});

/* ---------- Starfield ---------- */

(function starfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let stars = [];
  let drifters = [];
  let parallax = 0, parallaxTarget = 0;

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    seed();
  }

  function seed() {
    const w = canvas.width, h = canvas.height;
    stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.2 + 0.3) * devicePixelRatio,
      a: Math.random() * 0.5 + 0.15,
    }));
    drifters = Array.from({ length: 12 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.4 + 0.6) * devicePixelRatio,
      a: Math.random() * 0.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.06 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.06 * devicePixelRatio,
    }));
  }

  function draw() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    parallax += (parallaxTarget - parallax) * 0.04;

    ctx.fillStyle = '#e8ecf8';
    for (const s of stars) {
      ctx.globalAlpha = s.a;
      ctx.beginPath();
      ctx.arc((s.x + parallax * 0.4 + w) % w, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const d of drifters) {
      if (!reduceMotion) {
        d.x = (d.x + d.vx + w) % w;
        d.y = (d.y + d.vy + h) % h;
      }
      ctx.globalAlpha = d.a;
      ctx.beginPath();
      ctx.arc((d.x + parallax + w) % w, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  // subtle parallax nudge on slide change
  Reveal.on('slidechanged', (e) => {
    if (reduceMotion) return;
    parallaxTarget += (e.indexh >= (e.previousSlide ? 0 : 0) ? -1 : 1) * 30 * devicePixelRatio;
  });

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();

/* ---------- Constellation SVGs (slides 2, 3, 8, 9) ---------- */
/* One shared star layout; "lit" variants draw the connecting lines. */

(function constellations() {
  // Hand-placed stars, loosely evocative of a US map spread
  const STARS = [
    [50, 210], [95, 120], [140, 235], [170, 70], [205, 160],
    [250, 240], [270, 100], [320, 190], [345, 60], [370, 250],
    [120, 175], [300, 140],
  ];
  const LINES = [
    [0, 10], [10, 1], [1, 3], [3, 6], [6, 11], [11, 4], [4, 10],
    [4, 2], [2, 5], [5, 7], [7, 11], [6, 8], [7, 9],
  ];

  const litIds = new Set(['constellation-lit', 'constellation-impact', 'constellation-close']);

  document.querySelectorAll('svg[data-id="constellation"]').forEach((svg) => {
    const lit = litIds.has(svg.id);
    const ns = 'http://www.w3.org/2000/svg';

    if (lit) {
      LINES.forEach(([a, b]) => {
        const line = document.createElementNS(ns, 'line');
        line.setAttribute('x1', STARS[a][0]); line.setAttribute('y1', STARS[a][1]);
        line.setAttribute('x2', STARS[b][0]); line.setAttribute('y2', STARS[b][1]);
        line.setAttribute('stroke', 'rgba(53,224,208,0.55)');
        line.setAttribute('stroke-width', '1.2');
        svg.appendChild(line);
      });
    }

    STARS.forEach(([x, y]) => {
      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', x); c.setAttribute('cy', y);
      c.setAttribute('r', lit ? 4 : 3);
      c.setAttribute('fill', lit ? '#35e0d0' : '#9aa6c8');
      if (!lit) c.setAttribute('opacity', '0.6');
      svg.appendChild(c);
    });
  });
})();
