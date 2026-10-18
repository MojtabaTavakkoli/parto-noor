"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  tw: number;
  tone: number;
  spike: boolean;
};

type Veil = {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  phase: number;
};

const tones = ["246, 241, 230", "185, 207, 252", "110, 224, 181", "240, 181, 106"];

const veils: Veil[] = [
  { x: 0.16, y: 0.2, radius: 0.46, color: "110, 224, 181", speed: 0.08, phase: 0.4 },
  { x: 0.8, y: 0.16, radius: 0.4, color: "240, 181, 106", speed: 0.06, phase: 2.2 },
  { x: 0.52, y: 0.78, radius: 0.5, color: "120, 156, 220", speed: 0.05, phase: 4.1 },
];

export function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stars: Star[] = Array.from({ length: 200 }, () => {
      const depth = Math.pow(Math.random(), 1.55) * 0.82 + 0.18;
      return {
        x: Math.random(),
        y: Math.random(),
        z: depth,
        r: Math.random() * 1.05 + 0.22,
        tw: Math.random() * Math.PI * 2,
        tone: Math.floor(Math.random() * tones.length),
        spike: depth > 0.8 && Math.random() < 0.5,
      };
    });

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let time = 1.2;
    let hovering = false;
    let pointerX = 0;
    let pointerY = 0;
    let leanX = 0;
    let leanY = 0;
    let meteorLife = 0;
    let meteorWait = 7;
    let meteorX = 0;
    let meteorY = 0;
    let meteorVx = 0;
    let meteorVy = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || width === 0) return;
      hovering = true;
      pointerX = event.clientX / width - 0.5;
      pointerY = event.clientY / height - 0.5;
    };

    const onLeave = () => {
      hovering = false;
    };

    const readRay = () => {
      const style = getComputedStyle(document.documentElement);
      const amount = Number(style.getPropertyValue("--ray")) || 0;
      const originX = Number.parseFloat(style.getPropertyValue("--ray-x"));
      const originY = Number.parseFloat(style.getPropertyValue("--ray-y"));
      return {
        amount: Math.min(Math.max(amount, 0), 1),
        x: Number.isFinite(originX) ? originX : width * 0.5,
        y: Number.isFinite(originY) ? originY : height * 0.78,
      };
    };

    const fan = (originX: number, originY: number, angle: number, length: number, opening: number, strength: number, color: string) => {
      if (strength <= 0.02) return;
      context.save();
      context.translate(originX, originY);
      context.rotate(angle);

      const far = 8 + opening;
      context.beginPath();
      context.moveTo(0, -1.2);
      context.lineTo(length, -far);
      context.lineTo(length, far);
      context.lineTo(0, 1.2);
      context.closePath();
      const cone = context.createLinearGradient(0, 0, length, 0);
      cone.addColorStop(0, `rgba(255, 252, 245, ${0.42 * strength})`);
      cone.addColorStop(0.12, `rgba(${color}, ${0.22 * strength})`);
      cone.addColorStop(0.4, `rgba(${color}, ${0.07 * strength})`);
      cone.addColorStop(1, `rgba(${color}, 0)`);
      context.fillStyle = cone;
      context.fill();

      for (let index = 0; index < 18; index += 1) {
        const n = index / 17 * 2 - 1;
        const flicker = 0.65 + Math.sin(time * 0.7 + index * 1.3) * 0.35;
        const density = Math.exp(-n * n * 4.5);
        context.beginPath();
        context.moveTo(0, n * 0.8);
        context.lineTo(length * (0.72 + density * 0.28), n * far + Math.sin(time * 0.35 + index) * 6);
        context.strokeStyle = `rgba(255, 250, 240, ${0.16 * density * flicker * strength})`;
        context.lineWidth = index % 5 === 0 ? 1.4 : 0.6;
        context.stroke();
      }

      context.restore();
    };

    const draw = () => {
      if (!reduce) time += 0.008;
      const aimX = hovering && !reduce ? pointerX : 0;
      const aimY = hovering && !reduce ? pointerY : 0;
      leanX += (aimX - leanX) * 0.04;
      leanY += (aimY - leanY) * 0.04;

      const flowX = Math.sin(time * 0.2) * 0.55;
      const flowY = Math.cos(time * 0.15) * 0.38;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      for (const veil of veils) {
        const x = (veil.x + Math.sin(time * veil.speed + veil.phase) * 0.07 + (flowX + leanX) * 0.045) * width;
        const y = (veil.y + Math.cos(time * veil.speed * 0.8 + veil.phase) * 0.05 + (flowY + leanY) * 0.035) * height;
        const radius = veil.radius * Math.max(width, height);
        const glow = context.createRadialGradient(x, y, 0, x, y, radius);
        glow.addColorStop(0, `rgba(${veil.color}, 0.18)`);
        glow.addColorStop(0.42, `rgba(${veil.color}, 0.06)`);
        glow.addColorStop(1, `rgba(${veil.color}, 0)`);
        context.fillStyle = glow;
        context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }

      const ray = readRay();
      const gathered = ray.amount <= 0 ? 0 : ray.amount * ray.amount * (3 - 2 * ray.amount);
      const originX = ray.x + Math.sin(time * 0.2) * 6 + leanX * 18;
      const originY = ray.y + leanY * 10;
      const reach = Math.max(height - originY, originY) + height * 0.25;

      fan(originX, originY, -Math.PI / 2, Math.min(originY + 40, height), 46 + gathered * 20, gathered * 0.55, "240, 181, 106");
      fan(originX, originY, Math.PI / 2, Math.max(height - originY, 80), 36 + gathered * 18, gathered * 0.85, "110, 224, 181");

      if (gathered > 0.04) {
        const bloom = context.createRadialGradient(originX, originY, 0, originX, originY, 150);
        bloom.addColorStop(0, `rgba(255, 255, 248, ${0.72 * gathered})`);
        bloom.addColorStop(0.18, `rgba(240, 181, 106, ${0.32 * gathered})`);
        bloom.addColorStop(0.46, `rgba(110, 224, 181, ${0.12 * gathered})`);
        bloom.addColorStop(1, "rgba(110, 224, 181, 0)");
        context.fillStyle = bloom;
        context.beginPath();
        context.arc(originX, originY, 150, 0, Math.PI * 2);
        context.fill();

        const travel = (Math.sin(time * 0.45) * 0.5 + 0.5) * reach * 0.55;
        const pulse = context.createRadialGradient(originX, originY - travel, 0, originX, originY - travel, 70);
        pulse.addColorStop(0, `rgba(255, 252, 245, ${0.35 * gathered})`);
        pulse.addColorStop(1, "rgba(255, 252, 245, 0)");
        context.fillStyle = pulse;
        context.beginPath();
        context.arc(originX, originY - travel, 70, 0, Math.PI * 2);
        context.fill();
      }

      for (const star of stars) {
        const drift = reduce ? 0 : time * (0.0035 + star.z * 0.011);
        const x = wrap(star.x + drift * 0.12 + (flowX + leanX) * star.z * 0.028) * width;
        const y = wrap(star.y + (flowY + leanY) * star.z * 0.022 + Math.sin(time * 0.35 + star.tw) * 0.0025) * height;
        const alpha = 0.22 + star.z * 0.58 + Math.sin(time * 1.05 + star.tw) * (reduce ? 0 : 0.12);
        const radius = star.r * (0.6 + star.z);
        context.beginPath();
        context.fillStyle = `rgba(${tones[star.tone]}, ${Math.max(0.08, alpha)})`;
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        if (star.spike) {
          const arm = radius * 6.5;
          context.strokeStyle = `rgba(${tones[star.tone]}, ${alpha * 0.32})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(x - arm, y);
          context.lineTo(x + arm, y);
          context.moveTo(x, y - arm);
          context.lineTo(x, y + arm);
          context.stroke();
        }
      }

      if (!reduce) {
        if (meteorLife <= 0) {
          meteorWait -= 0.016;
          if (meteorWait <= 0) {
            meteorLife = 1;
            meteorX = width * (0.08 + Math.random() * 0.5);
            meteorY = height * (0.04 + Math.random() * 0.3);
            meteorVx = 6.5 + Math.random() * 4;
            meteorVy = 2.4 + Math.random() * 2.2;
            meteorWait = 11 + Math.random() * 9;
          }
        } else {
          meteorLife -= 0.01;
          meteorX += meteorVx;
          meteorY += meteorVy;
          const trail = context.createLinearGradient(meteorX, meteorY, meteorX - meteorVx * 10, meteorY - meteorVy * 10);
          trail.addColorStop(0, `rgba(246, 241, 230, ${meteorLife * 0.65})`);
          trail.addColorStop(1, "rgba(246, 241, 230, 0)");
          context.strokeStyle = trail;
          context.lineWidth = 1.3;
          context.beginPath();
          context.moveTo(meteorX, meteorY);
          context.lineTo(meteorX - meteorVx * 10, meteorY - meteorVy * 10);
          context.stroke();
        }
      }

      context.globalCompositeOperation = "source-over";
      if (!reduce) frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="stars" aria-hidden="true" />;
}

function wrap(value: number) {
  return value - Math.floor(value);
}
