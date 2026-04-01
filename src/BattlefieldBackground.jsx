import { useEffect, useRef } from "react";

const COUNTS = {
  stars: 80,
  jets: 7,
  tanks: 4,
  hovers: 4,
  bolts: 32,
  bursts: 14,
  sigils: 10
};

const COLORS = ["#72e7ff", "#ff7af6", "#ffd166", "#c1ff72", "#ff8a5b"];

const randomBetween = (min, max) => min + Math.random() * (max - min);

const wrapPosition = (value, limit, padding) => {
  if (value > limit + padding) return -padding;
  if (value < -padding) return limit + padding;
  return value;
};

export default function BattlefieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return undefined;

    let width = 0;
    let height = 0;
    let frame = 0;
    let last = performance.now();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const state = {};

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      seed();
    };

    const seed = () => {
      state.stars = Array.from({ length: COUNTS.stars }, () => ({
        x: randomBetween(0, width),
        y: randomBetween(0, height * 0.7),
        r: randomBetween(0.8, 2.2),
        a: randomBetween(0.2, 0.9),
        p: randomBetween(0.4, 1.5)
      }));

      state.jets = Array.from({ length: COUNTS.jets }, (_, index) => ({
        x: randomBetween(-140, width + 140),
        y: randomBetween(height * 0.14, height * 0.5),
        s: randomBetween(0.6, 1.3),
        vx: randomBetween(35, 90) * (index % 2 === 0 ? 1 : -1),
        drift: randomBetween(-20, 20),
        color: COLORS[index % COLORS.length]
      }));

      state.tanks = Array.from({ length: COUNTS.tanks }, (_, index) => ({
        x: randomBetween(-120, width + 120),
        y: randomBetween(height * 0.74, height * 0.88),
        s: randomBetween(0.95, 1.35),
        vx: randomBetween(10, 24) * (index % 2 === 0 ? 1 : -1),
        color: index % 2 === 0 ? "#72e7ff" : "#93ff6f",
        turret: randomBetween(0, Math.PI * 2)
      }));

      state.hovers = Array.from({ length: COUNTS.hovers }, (_, index) => ({
        x: randomBetween(-160, width + 160),
        y: randomBetween(height * 0.45, height * 0.72),
        s: randomBetween(0.8, 1.2),
        vx: randomBetween(20, 46) * (index % 2 === 0 ? 1 : -1),
        phase: randomBetween(0, Math.PI * 2)
      }));

      state.bolts = Array.from({ length: COUNTS.bolts }, (_, index) => ({
        x: randomBetween(0, width),
        y: randomBetween(height * 0.22, height * 0.92),
        vx: randomBetween(120, 300) * (index % 2 === 0 ? 1 : -1),
        vy: randomBetween(-40, 40),
        color: COLORS[index % COLORS.length],
        w: randomBetween(1.2, 3.4)
      }));

      state.bursts = Array.from({ length: COUNTS.bursts }, () => ({
        x: randomBetween(0, width),
        y: randomBetween(height * 0.18, height * 0.85),
        r: randomBetween(20, 60),
        speed: randomBetween(7, 18),
        a: randomBetween(0.08, 0.22),
        color: Math.random() > 0.5 ? "114,231,255" : "255,138,91"
      }));

      state.sigils = Array.from({ length: COUNTS.sigils }, (_, index) => ({
        x: randomBetween(width * 0.08, width * 0.92),
        y: randomBetween(height * 0.18, height * 0.78),
        r: randomBetween(20, 48),
        spin: randomBetween(0, Math.PI * 2),
        speed: randomBetween(0.4, 1.1),
        color: COLORS[index % COLORS.length]
      }));
    };

    const drawBackground = (time) => {
      const sky = context.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#040915");
      sky.addColorStop(0.45, "#091529");
      sky.addColorStop(0.8, "#0b1c35");
      sky.addColorStop(1, "#08121f");
      context.fillStyle = sky;
      context.fillRect(0, 0, width, height);

      for (const star of state.stars) {
        context.fillStyle = `rgba(255,255,255,${star.a + Math.sin(time * star.p + star.x * 0.01) * 0.12})`;
        context.beginPath();
        context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        context.fill();
      }

      const haze = context.createRadialGradient(width * 0.5, height * 0.42, 20, width * 0.5, height * 0.42, width * 0.55);
      haze.addColorStop(0, "rgba(117,117,255,0.18)");
      haze.addColorStop(0.45, "rgba(121,63,250,0.08)");
      haze.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = haze;
      context.fillRect(0, 0, width, height);
    };

    const drawCity = (time) => {
      const baseY = height * 0.58;
      const blockWidth = width / 12;
      for (let i = 0; i < 12; i += 1) {
        const towerX = i * blockWidth;
        const towerH = height * (0.14 + ((i % 5) * 0.035));
        const towerW = blockWidth * (0.48 + ((i % 4) * 0.09));
        const glow = 0.5 + Math.sin(time * 1.2 + i) * 0.2;
        context.fillStyle = "rgba(10, 18, 38, 0.94)";
        context.fillRect(towerX, baseY - towerH, towerW, towerH);
        context.fillStyle = `rgba(114,231,255,${0.08 * glow})`;
        context.fillRect(towerX + towerW * 0.18, baseY - towerH, towerW * 0.14, towerH);
        context.fillRect(towerX + towerW * 0.62, baseY - towerH * 0.88, towerW * 0.12, towerH * 0.88);
      }
    };

    const drawTerrain = (time) => {
      const layers = [
        { base: 0.68, amp: 20, speed: 7, fill: "rgba(8,18,38,0.84)" },
        { base: 0.77, amp: 30, speed: 12, fill: "rgba(13,23,49,0.93)" },
        { base: 0.86, amp: 18, speed: 18, fill: "rgba(22,35,71,0.97)" }
      ];

      for (const layer of layers) {
        context.beginPath();
        context.moveTo(-40, height);
        for (let x = -40; x <= width + 40; x += 24) {
          const wave =
            Math.sin((x + time * layer.speed * 35) * 0.012) * layer.amp +
            Math.cos((x - time * layer.speed * 25) * 0.018) * layer.amp * 0.45;
          context.lineTo(x, height * layer.base + wave);
        }
        context.lineTo(width + 40, height);
        context.closePath();
        context.fillStyle = layer.fill;
        context.fill();
      }
    };

    const drawJet = (jet, time) => {
      const bob = Math.sin(time * 2.4 + jet.drift) * 10;
      context.save();
      context.translate(jet.x, jet.y + bob);
      context.scale(Math.sign(jet.vx), 1);
      context.scale(jet.s, jet.s);
      context.shadowBlur = 20;
      context.shadowColor = `${jet.color}88`;
      context.fillStyle = "rgba(220,232,255,0.9)";
      context.beginPath();
      context.moveTo(-34, 6);
      context.lineTo(-10, -8);
      context.lineTo(18, -6);
      context.lineTo(34, 0);
      context.lineTo(18, 8);
      context.lineTo(-8, 10);
      context.closePath();
      context.fill();
      context.fillStyle = jet.color;
      context.fillRect(-2, -4, 18, 3);
      context.fillRect(-24, -10, 12, 3);
      context.restore();
    };

    const drawTank = (tank, time) => {
      context.save();
      context.translate(tank.x, tank.y + Math.sin(time * 2 + tank.x * 0.02) * 3);
      context.scale(Math.sign(tank.vx), 1);
      context.scale(tank.s, tank.s);
      context.fillStyle = "rgba(18,30,56,0.98)";
      context.fillRect(-34, -10, 68, 22);
      context.fillRect(-22, -22, 30, 18);
      context.fillStyle = tank.color;
      context.fillRect(-30, 12, 60, 4);
      context.save();
      context.translate(0, -14);
      context.rotate(Math.sin(time + tank.turret) * 0.18);
      context.fillStyle = "rgba(210,235,255,0.9)";
      context.fillRect(4, -2, 42, 4);
      context.restore();
      context.restore();
    };

    const drawHover = (hover, time) => {
      context.save();
      context.translate(hover.x, hover.y + Math.sin(time * 2.3 + hover.phase) * 12);
      context.scale(hover.s, hover.s);
      context.fillStyle = "rgba(20,34,62,0.88)";
      context.beginPath();
      context.ellipse(0, 0, 42, 15, 0, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "rgba(114,231,255,0.78)";
      context.fillRect(-16, -4, 32, 4);
      const beam = context.createRadialGradient(0, 16, 0, 0, 16, 46);
      beam.addColorStop(0, "rgba(183,255,122,0.22)");
      beam.addColorStop(1, "rgba(183,255,122,0)");
      context.fillStyle = beam;
      context.beginPath();
      context.moveTo(-24, 12);
      context.lineTo(24, 12);
      context.lineTo(44, 56);
      context.lineTo(-44, 56);
      context.closePath();
      context.fill();
      context.restore();
    };

    const drawBolts = () => {
      for (const bolt of state.bolts) {
        context.strokeStyle = bolt.color;
        context.lineWidth = bolt.w;
        context.shadowBlur = 14;
        context.shadowColor = bolt.color;
        context.beginPath();
        context.moveTo(bolt.x, bolt.y);
        context.lineTo(bolt.x - bolt.vx * 0.04, bolt.y - bolt.vy * 0.04);
        context.stroke();
      }
    };

    const drawMagic = (time) => {
      for (const sigil of state.sigils) {
        context.save();
        context.translate(sigil.x, sigil.y);
        context.rotate(sigil.spin + time * sigil.speed);
        context.strokeStyle = `${sigil.color}bb`;
        context.lineWidth = 2;
        context.shadowBlur = 22;
        context.shadowColor = sigil.color;
        context.beginPath();
        context.arc(0, 0, sigil.r, 0, Math.PI * 2);
        context.moveTo(-sigil.r, 0);
        context.lineTo(sigil.r, 0);
        context.moveTo(0, -sigil.r);
        context.lineTo(0, sigil.r);
        context.stroke();
        context.restore();
      }
    };

    const drawBursts = (time) => {
      for (const burst of state.bursts) {
        const radius = burst.r + Math.sin(time * burst.speed + burst.x * 0.01) * 8;
        const gradient = context.createRadialGradient(burst.x, burst.y, 0, burst.x, burst.y, radius);
        gradient.addColorStop(0, `rgba(${burst.color},${burst.a})`);
        gradient.addColorStop(0.4, `rgba(${burst.color},${burst.a * 0.45})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(burst.x, burst.y, radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const drawFog = () => {
      const fog = context.createLinearGradient(0, height * 0.4, 0, height);
      fog.addColorStop(0, "rgba(2,5,10,0)");
      fog.addColorStop(0.55, "rgba(5,12,24,0.18)");
      fog.addColorStop(1, "rgba(2,5,12,0.64)");
      context.fillStyle = fog;
      context.fillRect(0, 0, width, height);
    };

    const tick = (now) => {
      const time = now * 0.001;
      const delta = Math.min((now - last) / 1000, 0.032);
      last = now;
      const speedFactor = reducedMotion.matches ? 0.2 : 1;

      for (const jet of state.jets) jet.x = wrapPosition(jet.x + jet.vx * delta * speedFactor, width, 180);
      for (const tank of state.tanks) tank.x = wrapPosition(tank.x + tank.vx * delta * speedFactor, width, 160);
      for (const hover of state.hovers) hover.x = wrapPosition(hover.x + hover.vx * delta * speedFactor, width, 200);

      for (const bolt of state.bolts) {
        bolt.x += bolt.vx * delta * speedFactor;
        bolt.y += bolt.vy * delta * speedFactor;
        if (bolt.x > width + 80 || bolt.x < -80 || bolt.y > height + 60 || bolt.y < -60) {
          bolt.x = bolt.vx > 0 ? -40 : width + 40;
          bolt.y = randomBetween(height * 0.22, height * 0.92);
        }
      }

      drawBackground(time);
      drawBursts(time);
      drawCity(time);
      for (const jet of state.jets) drawJet(jet, time);
      drawBolts();
      drawTerrain(time);
      for (const hover of state.hovers) drawHover(hover, time);
      for (const tank of state.tanks) drawTank(tank, time);
      drawMagic(time);
      drawFog();

      frame = window.requestAnimationFrame(tick);
    };

    resize();
    frame = window.requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="battlefield-background" aria-hidden="true">
      <canvas ref={canvasRef} className="battlefield-canvas" />
      <div className="battlefield-vignette" />
    </div>
  );
}
