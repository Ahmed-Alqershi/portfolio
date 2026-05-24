"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 70;
const REPEL_RADIUS = 130;
const REPEL_STRENGTH = 0.6;
const SPRING = 0.012;
const FRICTION = 0.92;
const PARTICLE_OPACITY = 0.3;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  r: number;
  phase: number;
  freq: number;
};

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    const accentColor = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#4f46e5";

    // Half-width of the central content column. Particles mostly avoid this
    // band; a fraction (CENTRE_SHARE) is sprinkled across it so it isn't empty.
    const CONTENT_HALF = 460;
    const CENTRE_SHARE = 0.2;

    const seed = () => {
      const cx = width / 2;
      const sideMax = Math.max(0, cx - CONTENT_HALF);
      const useSideBands = sideMax > 80;
      const band = sideMax + 40; // small overlap into the content edge — soft boundary
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        let x: number;
        if (!useSideBands) {
          x = Math.random() * width;
        } else if (Math.random() < CENTRE_SHARE) {
          // a sparse fraction in the central content column
          x = cx - CONTENT_HALF + Math.random() * (2 * CONTENT_HALF);
        } else {
          // the rest packed into the side bands
          x =
            Math.random() < 0.5
              ? Math.random() * band
              : width - Math.random() * band;
        }
        const y = Math.random() * height;
        return {
          x,
          y,
          vx: 0,
          vy: 0,
          baseX: x,
          baseY: y,
          r: 0.8 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
          freq: 0.6 + Math.random() * 1.0,
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const color = accentColor();
      const now = performance.now() / 1000;

      // Glow around each particle gives the star-like shine.
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.fillStyle = color;

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx += (p.baseX - p.x) * SPRING;
        p.vy += (p.baseY - p.y) * SPRING;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        // Per-particle twinkle, phase-offset so they don't sync.
        const twinkle = 0.65 + 0.35 * Math.sin(now * p.freq + p.phase);
        ctx.globalAlpha = PARTICLE_OPACITY * twinkle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
