"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── Plain object factory (avoids Turbopack class-field crash) ──────────────
interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  vx: number;
  vy: number;
  size: number;
  friction: number;
  ease: number;
  angle: number;
  bobSpeed: number;
  bobRadius: number;
}

function createParticle(originX: number, originY: number, color: string): Particle {
  return {
    originX,
    originY,
    // start scattered for fly-in entry
    x: originX + (Math.random() - 0.5) * 280,
    y: originY + (Math.random() - 0.5) * 280,
    color,
    vx: 0,
    vy: 0,
    size: 3.2,
    friction: 0.85,
    ease: 0.06,
    angle: Math.random() * Math.PI * 2,
    bobSpeed: 0.005 + Math.random() * 0.01,
    bobRadius: 1.5 + Math.random() * 2.5,
  };
}

function updateParticle(
  p: Particle,
  mouseX: number,
  mouseY: number,
  mouseRadius: number,
  mouseActive: boolean
) {
  // zero-gravity idle drift
  p.angle += p.bobSpeed;
  const driftX = Math.sin(p.angle) * p.bobRadius * 0.15;
  const driftY = Math.cos(p.angle) * p.bobRadius * 0.15;

  // mouse repulsion inside radius
  if (mouseActive) {
    const dx = mouseX - p.x;
    const dy = mouseY - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < mouseRadius) {
      const force = (mouseRadius - dist) / mouseRadius;
      const ang = Math.atan2(dy, dx);
      p.vx -= Math.cos(ang) * force * 9;
      p.vy -= Math.sin(ang) * force * 9;
    }
  }

  // spring toward origin + drift
  p.vx += (p.originX + driftX - p.x) * p.ease;
  p.vy += (p.originY + driftY - p.y) * p.ease;

  // damping
  p.vx *= p.friction;
  p.vy *= p.friction;

  p.x += p.vx;
  p.y += p.vy;
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.fillStyle = p.color;
  ctx.fillRect(p.x, p.y, p.size, p.size);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function MagneticPixelImage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 90, active: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const INTERNAL = 500;
    canvas.width = INTERNAL;
    canvas.height = INTERNAL;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "/arivu_profile.png";

    img.onload = () => {
      // Higher SAMPLE = more pixels sampled → denser image
      const SAMPLE = 200;
      const tmp = document.createElement("canvas");
      tmp.width = SAMPLE;
      tmp.height = SAMPLE;
      const tc = tmp.getContext("2d");
      if (!tc) return;

      tc.drawImage(img, 0, 0, SAMPLE, SAMPLE);
      const data = tc.getImageData(0, 0, SAMPLE, SAMPLE).data;

      // scale: 200 * 2.4 = 480, fits inside 500px canvas
      const scale = 2.4;
      const startX = (INTERNAL - SAMPLE * scale) / 2;
      const startY = (INTERNAL - SAMPLE * scale) / 2;
      const list: Particle[] = [];
      // STEP = 1 → every pixel is sampled (maximum density)
      const STEP = 1;

      for (let y = 0; y < SAMPLE; y += STEP) {
        for (let x = 0; x < SAMPLE; x += STEP) {
          const i = (y * SAMPLE + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          // lower threshold = more semi-transparent edge pixels included
          if (a > 30) {
            list.push(
              createParticle(
                startX + x * scale,
                startY + y * scale,
                `rgba(${r},${g},${b},${(a / 255).toFixed(2)})`
              )
            );
          }
        }
      }
      particlesRef.current = list;
      setLoading(false);
    };

    let raf: number;
    const render = () => {
      ctx.clearRect(0, 0, INTERNAL, INTERNAL);
      const { x, y, radius, active } = mouseRef.current;
      for (const p of particlesRef.current) {
        updateParticle(p, x, y, radius, active);
        drawParticle(ctx, p);
      }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(raf);
  }, []);

  const toCanvas = (
    e: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    const c = canvasRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - r.left) / r.width) * 500;
    mouseRef.current.y = ((e.clientY - r.top) / r.height) * 500;
    mouseRef.current.active = true;
  };

  const toCanvasTouch = (e: React.TouchEvent<HTMLCanvasElement>): void => {
    const c = canvasRef.current;
    if (!c || !e.touches.length) return;
    const r = c.getBoundingClientRect();
    const t = e.touches[0];
    mouseRef.current.x = ((t.clientX - r.left) / r.width) * 500;
    mouseRef.current.y = ((t.clientY - r.top) / r.height) * 500;
    mouseRef.current.active = true;
  };

  return (
    <div
      className="relative flex items-center justify-center w-full max-w-[480px] aspect-square rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(112,66,248,0.10) 0%, transparent 70%)",
      }}
    >
      {/* glow ring */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow:
            "0 0 60px 8px rgba(112,66,248,0.18), 0 0 120px 24px rgba(80,200,220,0.08)",
        }}
      />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <canvas
        ref={canvasRef}
        onMouseMove={toCanvas}
        onMouseLeave={() => { mouseRef.current.active = false; }}
        onTouchMove={toCanvasTouch}
        onTouchStart={toCanvasTouch}
        onTouchEnd={() => { mouseRef.current.active = false; }}
        className="w-full h-full max-w-[450px] aspect-square select-none cursor-crosshair rounded-full transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(112,66,248,0.3)]"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.6s ease" }}
      />
    </div>
  );
}
