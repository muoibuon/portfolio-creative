import { useEffect, useRef } from 'react';

export default function HologramBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const STAR_COUNT = 220;
    const GLOW_COUNT = 18;
    const INFLUENCE = 130;   // pixel radius chuột ảnh hưởng
    const REPEL    = 55;     // lực đẩy tối đa (px)

    // Stars — lưu tọa độ tuyệt đối để dễ tính toán chuột
    const stars = Array.from({ length: STAR_COUNT }, () => {
      const ox = Math.random();
      const oy = Math.random();
      return {
        ox, oy,           // vị trí gốc (0-1)
        dx: 0, dy: 0,     // offset hiện tại do chuột
        r: Math.random() * 1.4 + 0.2,
        base: 0.4 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.4,
        color: Math.random() < 0.15 ? 'rgba(180,200,255,' : 'rgba(255,255,255,',
      };
    });

    const glowStars = Array.from({ length: GLOW_COUNT }, () => {
      const ox = Math.random();
      const oy = Math.random();
      return {
        ox, oy, dx: 0, dy: 0,
        r: 1.8 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.6,
      };
    });

    // ── Binary rain — particle system ────────────────────────
    const FONT_SIZE = 18;
    const BH_RADIUS = 200;   // black hole attraction radius (px)
    const BH_GRAVITY = 0.55; // acceleration strength
    const BH_ABSORB  = 28;   // distance at which char is absorbed
    const MAX_SPEED  = 14;   // velocity cap

    const rainParticles = [];

    function spawnDrop(col) {
      const len   = 8 + Math.floor(Math.random() * 10);
      const vy0   = 1.8 + Math.random() * 2.0;
      const baseA = (0.13 + Math.random() * 0.15) * 0.5;
      for (let i = 0; i < len; i++) {
        rainParticles.push({
          x:     col * FONT_SIZE,
          y:     -i * FONT_SIZE,
          vx:    0,
          vy:    vy0,
          char:  Math.random() < 0.5 ? '0' : '1',
          alpha: baseA * Math.pow(1 - i / len, 0.7),
          isHead: i === 0,
          absorbed: false,
          absorbFlash: 0,
          flipTimer: Math.floor(Math.random() * 40),
        });
      }
    }

    const COLS = Math.floor(window.innerWidth / FONT_SIZE);
    const colTimers = Array.from({ length: COLS }, () => Math.random() * 100);

    // seed initial drops
    for (let c = 0; c < COLS; c++) spawnDrop(c);

    const SIGIL_COUNT = 9;
    const sigils = Array.from({ length: SIGIL_COUNT }, (_, i) => ({
      x: (0.08 + (i % 3) * 0.42) * window.innerWidth  + (Math.random() - 0.5) * 80,
      y: (0.12 + Math.floor(i / 3) * 0.38) * window.innerHeight + (Math.random() - 0.5) * 60,
      r: 40 + Math.random() * 50,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.003,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.2 + Math.random() * 0.5,
      type: i % 5,   // 5 sigil shapes
      color: [
        '0,255,255',     // cyan
        '124,58,237',    // purple
        '236,72,153',    // pink
        '103,232,249',   // light cyan
        '167,139,250',   // lavender
      ][i % 5],
    }));

    function drawSigil(cx, cy, r, rot, alpha, color, type) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = `rgba(${color},${alpha.toFixed(3)})`;
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(${color},${(alpha * 0.6).toFixed(3)})`;

      if (type === 0) {
        // Outer circle + inner triangle + cross lines
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2); ctx.stroke();
        for (let k = 0; k < 3; k++) {
          const a = (k / 3) * Math.PI * 2;
          ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55);
          ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); ctx.stroke();
        }
        ctx.beginPath();
        for (let k = 0; k < 3; k++) {
          const a = (k / 3) * Math.PI * 2 + Math.PI / 6;
          k === 0 ? ctx.moveTo(Math.cos(a) * r * 0.9, Math.sin(a) * r * 0.9)
                  : ctx.lineTo(Math.cos(a) * r * 0.9, Math.sin(a) * r * 0.9);
        }
        ctx.closePath(); ctx.stroke();

      } else if (type === 1) {
        // Hexagon + inner star lines
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = (k / 6) * Math.PI * 2;
          k === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
                  : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath(); ctx.stroke();
        // inner diamond
        ctx.beginPath();
        for (let k = 0; k < 4; k++) {
          const a = (k / 4) * Math.PI * 2 + Math.PI / 4;
          k === 0 ? ctx.moveTo(Math.cos(a) * r * 0.5, Math.sin(a) * r * 0.5)
                  : ctx.lineTo(Math.cos(a) * r * 0.5, Math.sin(a) * r * 0.5);
        }
        ctx.closePath(); ctx.stroke();
        // spokes
        for (let k = 0; k < 6; k += 2) {
          const a = (k / 6) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * r * 0.5, Math.sin(a) * r * 0.5);
          ctx.lineTo(Math.cos(a + Math.PI) * r * 0.5, Math.sin(a + Math.PI) * r * 0.5);
          ctx.stroke();
        }

      } else if (type === 2) {
        // Double circle + 8-point starburst
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, r * 0.7, 0, Math.PI * 2); ctx.stroke();
        for (let k = 0; k < 8; k++) {
          const a = (k / 8) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          ctx.stroke();
        }

      } else if (type === 3) {
        // Overlapping triangles (Star of David style) + outer ring
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
        for (let tri = 0; tri < 2; tri++) {
          ctx.beginPath();
          for (let k = 0; k < 3; k++) {
            const a = (k / 3) * Math.PI * 2 + tri * (Math.PI / 3);
            k === 0 ? ctx.moveTo(Math.cos(a) * r * 0.85, Math.sin(a) * r * 0.85)
                    : ctx.lineTo(Math.cos(a) * r * 0.85, Math.sin(a) * r * 0.85);
          }
          ctx.closePath(); ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2); ctx.stroke();

      } else {
        // Rune-like angular sigil: square + crossing diagonals + arc segments
        const s = r * 0.7;
        ctx.beginPath();
        ctx.moveTo(-s, -s); ctx.lineTo(s, -s);
        ctx.lineTo(s, s); ctx.lineTo(-s, s);
        ctx.closePath(); ctx.stroke();
        // Diagonals
        ctx.beginPath(); ctx.moveTo(-s, -s); ctx.lineTo(s, s); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(s, -s); ctx.lineTo(-s, s); ctx.stroke();
        // Outer arc segments (4 corners)
        for (let k = 0; k < 4; k++) {
          const a = (k / 4) * Math.PI * 2 + Math.PI / 4;
          ctx.beginPath();
          ctx.arc(0, 0, r, a, a + Math.PI * 0.35);
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    const onMouseMove = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousemove', onMouseMove);

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      sigils.forEach((s, i) => {
        s.x = (0.08 + (i % 3) * 0.42) * canvas.width  + (Math.random() - 0.5) * 80;
        s.y = (0.12 + Math.floor(i / 3) * 0.38) * canvas.height + (Math.random() - 0.5) * 60;
      });
      const newCols = Math.floor(canvas.width / FONT_SIZE);
      colTimers.length = newCols;
      for (let i = colTimers.length; i < newCols; i++) colTimers.push(Math.random() * 60);
    };
    resize();
    window.addEventListener('resize', resize);

    const updateStar = (s) => {
      const sx = s.ox * canvas.width  + s.dx;
      const sy = s.oy * canvas.height + s.dy;
      const mdx = sx - mouse.x;
      const mdy = sy - mouse.y;
      const dist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (dist < INFLUENCE && dist > 0.1) {
        const force = (1 - dist / INFLUENCE) * REPEL;
        const tx = (mdx / dist) * force;
        const ty = (mdy / dist) * force;
        s.dx += (tx - s.dx) * 0.12;
        s.dy += (ty - s.dy) * 0.12;
      } else {
        // Spring back to origin
        s.dx += (0 - s.dx) * 0.06;
        s.dy += (0 - s.dy) * 0.06;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Binary rain — particle physics ────────────────────
      ctx.font = `${FONT_SIZE}px monospace`;

      // Spawn new drops per column
      for (let c = 0; c < colTimers.length; c++) {
        colTimers[c]--;
        if (colTimers[c] <= 0) {
          spawnDrop(c);
          colTimers[c] = 50 + Math.random() * 80;
        }
      }

      // Update & draw each particle
      for (let i = rainParticles.length - 1; i >= 0; i--) {
        const p = rainParticles[i];

        if (p.absorbed) {
          p.absorbFlash--;
          if (p.absorbFlash <= 0) { rainParticles.splice(i, 1); continue; }
          const fa = (p.absorbFlash / 10) * 0.9;
          ctx.fillStyle = `rgba(200,255,255,${fa.toFixed(3)})`;
          ctx.fillText(p.char, p.x, p.y);
          continue;
        }

        // Remove if below screen
        if (p.y > canvas.height + FONT_SIZE) { rainParticles.splice(i, 1); continue; }

        // Black-hole gravity
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < BH_ABSORB) {
          p.absorbed = true;
          p.absorbFlash = 10;
          continue;
        }

        if (dist < BH_RADIUS && mouse.active) {
          const f = BH_GRAVITY * (1 - dist / BH_RADIUS) * (BH_RADIUS / (dist + 10));
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
          const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (spd > MAX_SPEED) { p.vx = p.vx / spd * MAX_SPEED; p.vy = p.vy / spd * MAX_SPEED; }
        } else {
          // Drift back toward vertical fall
          p.vx *= 0.88;
          p.vy  = p.vy * 0.96 + 2.0 * 0.04;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Random bit flip
        p.flipTimer++;
        if (p.flipTimer > 25 + Math.floor(Math.random() * 35)) {
          p.char = p.char === '0' ? '1' : '0';
          p.flipTimer = 0;
        }

        // Draw — dim to 5% when near cursor, normal otherwise
        const pullRatio = dist < BH_RADIUS ? 1 - dist / BH_RADIUS : 0;
        const dimAlpha = p.alpha * (1 - pullRatio) + 0.05 * pullRatio;
        const headAlpha = p.isHead ? Math.min(dimAlpha * 2.5, 0.28) : dimAlpha;
        if (p.isHead) {
          const r = Math.round(103 + pullRatio * 152);
          const g = Math.round(232 + pullRatio * 23);
          const b = 249;
          ctx.fillStyle = `rgba(${r},${g},${b},${headAlpha.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(6,182,212,${dimAlpha.toFixed(3)})`;
        }
        ctx.fillText(p.char, p.x, p.y);
      }

      // ── Stars ──────────────────────────────────────────────
      stars.forEach(s => {
        updateStar(s);
        const cx = s.ox * canvas.width  + s.dx;
        const cy = s.oy * canvas.height + s.dy;
        const twinkle = s.base * 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
        const alpha = Math.max(0, Math.min(1, twinkle));
        ctx.beginPath();
        ctx.arc(cx, cy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color + alpha.toFixed(3) + ')';
        ctx.fill();
      });

      // Glow stars
      glowStars.forEach(s => {
        updateStar(s);
        const cx = s.ox * canvas.width  + s.dx;
        const cy = s.oy * canvas.height + s.dy;
        const pulse = 0.35 + 0.35 * Math.sin(t * s.speed + s.phase);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, s.r * 5);
        grad.addColorStop(0, `rgba(200,220,255,${(pulse * 0.9).toFixed(3)})`);
        grad.addColorStop(0.4, `rgba(180,200,255,${(pulse * 0.25).toFixed(3)})`);
        grad.addColorStop(1, 'rgba(180,200,255,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, s.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, cy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${pulse.toFixed(3)})`;
        ctx.fill();
      });

      // ── Hologram orbs ───────────────────────────────────────
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width * (i / 5)) + Math.sin(t * 0.3 + i) * 80;
        const y = canvas.height * 0.5 + Math.cos(t * 0.2 + i * 1.3) * (canvas.height * 0.4);
        const r = 350 + Math.sin(t * 0.4 + i) * 80;
        const colors = [
          ['rgba(0,255,255,0.04)',   'rgba(0,255,255,0)'],
          ['rgba(124,58,237,0.05)', 'rgba(124,58,237,0)'],
          ['rgba(192,192,255,0.04)','rgba(192,192,255,0)'],
          ['rgba(0,200,255,0.04)',  'rgba(0,200,255,0)'],
          ['rgba(180,100,255,0.05)','rgba(180,100,255,0)'],
        ];
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, colors[i][0]);
        grad.addColorStop(1, colors[i][1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // ── Cybersigilism ───────────────────────────────────────
      sigils.forEach(s => {
        s.rot += s.rotSpeed;
        const pulse = 0.04 + 0.04 * Math.sin(t * s.pulseSpeed + s.phase);
        drawSigil(s.x, s.y, s.r, s.rot, pulse, s.color, s.type);
      });

      // ── Scan lines ──────────────────────────────────────────
      for (let y = 0; y < canvas.height; y += 120) {
        const yPos = (y + t * 15) % canvas.height;
        const g2 = ctx.createLinearGradient(0, yPos, 0, yPos + 2);
        g2.addColorStop(0, 'rgba(0,255,255,0.015)');
        g2.addColorStop(1, 'rgba(0,255,255,0)');
        ctx.fillStyle = g2;
        ctx.fillRect(0, yPos, canvas.width, 2);
      }

      t += 0.005;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 1,
      }}
    />
  );
}
