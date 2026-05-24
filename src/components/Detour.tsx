"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import {
  type Point,
  dailySeed,
  puzzleNumber,
  dailyCities,
  dailyValues,
  distanceMatrix,
  tourLength,
  solveTSP,
  solveOrienteering,
} from "@/lib/tsp";

const N_CITIES = 10;
const START = 0;
const BUDGET_FACTOR = 0.68;
const STORAGE_KEY = "detour:v2";
const OPTIMAL_COLOR = "#10b981";
const OVER_COLOR = "#ef4444";

type Puzzle = {
  num: number;
  dateLabel: string;
  cities: Point[];
  values: number[];
  dist: number[][];
  budget: number;
  optimal: { order: number[]; value: number; length: number };
};

type Result = { value: number; pct: number; stars: number };

type Saved = {
  puzzleNum: number;
  route: number[];
  stars: number;
  pct: number;
  value: number;
  streak: number;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

function starsForValue(ratio: number): number {
  if (ratio >= 0.995) return 3;
  if (ratio >= 0.9) return 2;
  if (ratio >= 0.75) return 1;
  return 0;
}

function resultMessage(stars: number, pct: number): string {
  if (stars === 3) return "Optimal — you found the best haul.";
  if (stars === 2) return `Strong haul — ${pct}% of the optimal value.`;
  if (stars === 1) return `Solved it — ${pct}% of the optimal value.`;
  return `${pct}% of the optimal value — there was a richer loop.`;
}

function readColors() {
  const s = getComputedStyle(document.documentElement);
  return {
    surface: s.getPropertyValue("--surface").trim() || "#ffffff",
    border: s.getPropertyValue("--border").trim() || "#e5e5e5",
    fg: s.getPropertyValue("--foreground").trim() || "#0a0a0a",
    accent: s.getPropertyValue("--accent").trim() || "#4338ca",
    muted: s.getPropertyValue("--muted").trim() || "#999999",
  };
}

const scaled = (len: number) => Math.round(len * 100);

function timeToMidnight(): string {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const sec = Math.max(
    0,
    Math.floor((next.getTime() - now.getTime()) / 1000),
  );
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(sec / 3600))}:${pad(
    Math.floor((sec % 3600) / 60),
  )}:${pad(sec % 60)}`;
}

export default function Detour() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [route, setRoute] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [streak, setStreak] = useState(0);
  const [copied, setCopied] = useState(false);
  const [haulCount, setHaulCount] = useState(0);
  const [, setClockTick] = useState(0);

  const routeRef = useRef<number[]>([]);
  const submittedRef = useRef(false);
  const revealRef = useRef(0);
  const submitTimeRef = useRef(0);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const growTimeRef = useRef(0);
  const popRef = useRef<Record<number, number>>({});
  const hoverScaleRef = useRef<number[]>([]);
  const entranceTimeRef = useRef(0);
  const matchedRef = useRef(false);

  useEffect(() => {
    if (route.length > routeRef.current.length) {
      const t = performance.now();
      growTimeRef.current = t;
      popRef.current[route[route.length - 1]] = t;
    }
    routeRef.current = route;
  }, [route]);
  useEffect(() => {
    submittedRef.current = submitted;
  }, [submitted]);

  useEffect(() => {
    const now = new Date();
    const num = puzzleNumber(now);
    const seed = dailySeed(now);
    const cities = dailyCities(seed, N_CITIES);
    const values = dailyValues(seed, N_CITIES);
    const dist = distanceMatrix(cities);
    const budget = solveTSP(dist).length * BUDGET_FACTOR;
    // Date + localStorage are client-only — must populate after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPuzzle({
      num,
      dateLabel: now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      cities,
      values,
      dist,
      budget,
      optimal: solveOrienteering(dist, values, budget),
    });

    let restored = false;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: Saved = JSON.parse(raw);
        if (saved.puzzleNum === num) {
          setRoute(saved.route);
          setResult({
            value: saved.value,
            pct: saved.pct,
            stars: saved.stars,
          });
          setSubmitted(true);
          setStreak(saved.streak);
          submitTimeRef.current = 0;
          matchedRef.current = saved.stars === 3;
          restored = true;
        } else if (saved.puzzleNum === num - 1) {
          setStreak(saved.streak);
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    if (!restored) setRoute([START]);
  }, []);

  // Stagger the cities in when the canvas scrolls into view.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      entranceTimeRef.current = -1;
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          entranceTimeRef.current = performance.now();
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(canvas);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!submitted) return;
    const id = setInterval(() => setClockTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [submitted]);

  // Count the haul number up when the result lands.
  useEffect(() => {
    if (!result) return;
    const target = result.value;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dur = reduce ? 1 : 650;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = clamp01((performance.now() - start) / dur);
      setHaulCount(Math.round(target * easeOut(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [result]);

  useEffect(() => {
    if (!puzzle) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const draw = () => {
      const size = canvas.clientWidth;
      if (size <= 0) return;
      const dpr = window.devicePixelRatio || 1;
      const pxSize = Math.round(size * dpr);
      if (canvas.width !== pxSize) {
        canvas.width = pxSize;
        canvas.height = pxSize;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const S = size;
      const now = performance.now();
      const c = readColors();
      const cities = puzzle.cities;
      const n = cities.length;
      const px = (p: Point) => ({ x: p.x * S, y: p.y * S });
      const route = routeRef.current;
      const done = submittedRef.current;

      ctx.fillStyle = c.surface;
      ctx.fillRect(0, 0, S, S);

      if (hoverScaleRef.current.length !== n) {
        hoverScaleRef.current = new Array(n).fill(1);
      }

      const et = entranceTimeRef.current;
      const entranceOf = (i: number) => {
        if (et === -1) return 1;
        if (et === 0) return 0;
        return easeOut(clamp01((now - et - i * 55) / 320));
      };

      let hovered = -1;
      if (!done && pointerRef.current) {
        let bd = 0.07;
        for (let i = 0; i < n; i++) {
          if (route.includes(i)) continue;
          const d = Math.hypot(
            cities[i].x - pointerRef.current.x,
            cities[i].y - pointerRef.current.y,
          );
          if (d < bd) {
            bd = d;
            hovered = i;
          }
        }
      }
      const lerpK = reduce ? 1 : 0.2;
      for (let i = 0; i < n; i++) {
        const tgt = i === hovered ? 1.12 : 1;
        hoverScaleRef.current[i] += (tgt - hoverScaleRef.current[i]) * lerpK;
      }

      const popOf = (i: number) => {
        if (reduce) return 1;
        const pt = popRef.current[i];
        if (!pt) return 1;
        const t = (now - pt) / 250;
        if (t < 0 || t >= 1) return 1;
        return 1 + 0.2 * Math.sin(t * Math.PI);
      };

      // player route, with the newest segment animating outward.
      // When the player matched the optimal, the two loops are identical —
      // skip the player route and show only the green optimal.
      if (route.length >= 2 && !(done && matchedRef.current)) {
        const gt = growTimeRef.current;
        const growE =
          reduce || gt === 0 ? 1 : easeOut(clamp01((now - gt) / 220));
        ctx.globalAlpha = done ? 1 - 0.55 * revealRef.current : 1;
        ctx.strokeStyle = c.accent;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = "round";
        ctx.beginPath();
        const startP = px(cities[route[0]]);
        ctx.moveTo(startP.x, startP.y);
        for (let i = 1; i <= route.length - 2; i++) {
          const p = px(cities[route[i]]);
          ctx.lineTo(p.x, p.y);
        }
        const tail = px(cities[route[route.length - 1]]);
        ctx.lineTo(
          startP.x + (tail.x - startP.x) * growE,
          startP.y + (tail.y - startP.y) * growE,
        );
        ctx.lineTo(startP.x, startP.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      if (!done && pointerRef.current) {
        const last = px(cities[route[route.length - 1]]);
        ctx.strokeStyle = c.muted;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.6;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(pointerRef.current.x * S, pointerRef.current.y * S);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      if (done && puzzle.optimal.order.length > 1) {
        const order = puzzle.optimal.order;
        const reveal = reduce ? 1 : revealRef.current;
        const edges = order.length;
        const shown = reveal * edges;
        ctx.strokeStyle = OPTIMAL_COLOR;
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        for (let e = 0; e < edges; e++) {
          const a = px(cities[order[e]]);
          const b = px(cities[order[(e + 1) % edges]]);
          if (e + 1 <= shown) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          } else if (e < shown) {
            const f = shown - e;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f);
          }
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      for (let i = 0; i < n; i++) {
        const ep = entranceOf(i);
        if (ep <= 0) continue;
        const p = px(cities[i]);
        const visited = route.includes(i);
        const scale =
          (0.4 + 0.6 * ep) * hoverScaleRef.current[i] * popOf(i);
        const alpha = clamp01(ep * 1.6);
        const r = S * 0.03 * scale;

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        if (visited) {
          ctx.fillStyle = c.accent;
          ctx.fill();
        } else {
          ctx.fillStyle = c.surface;
          ctx.fill();
          ctx.strokeStyle = c.fg;
          ctx.lineWidth = 1.6;
          ctx.stroke();
          const hv = clamp01((hoverScaleRef.current[i] - 1) / 0.12);
          if (hv > 0.01) {
            ctx.globalAlpha = alpha * hv;
            ctx.strokeStyle = c.accent;
            ctx.lineWidth = 1.8;
            ctx.stroke();
            ctx.globalAlpha = alpha;
          }
        }
        if (i === START) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = visited ? c.accent : c.fg;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
        ctx.fillStyle = visited ? c.surface : c.fg;
        ctx.font = `600 ${Math.round(S * 0.025 * scale)}px ui-monospace, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(puzzle.values[i]), p.x, p.y);
        ctx.globalAlpha = 1;
      }
    };

    const loop = () => {
      if (submittedRef.current) {
        const st = submitTimeRef.current;
        revealRef.current =
          st === 0 ? 1 : Math.min(1, (performance.now() - st) / 700);
      } else {
        revealRef.current = 0;
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [puzzle]);

  const pickCity = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!puzzle || submitted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    let best = -1;
    let bestD = 0.07;
    puzzle.cities.forEach((city, i) => {
      const d = Math.hypot(city.x - x, city.y - y);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (best < 0) return;
    setRoute((prev) => (prev.includes(best) ? prev : [...prev, best]));
  };

  const trackPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    pointerRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  const submit = () => {
    if (!puzzle || submitted || route.length < 2) return;
    const distance = tourLength(route, puzzle.dist);
    if (distance > puzzle.budget + 1e-9) return;
    const value = route.reduce((s, i) => s + puzzle.values[i], 0);
    const ratio = value / puzzle.optimal.value;
    const stars = starsForValue(ratio);
    const pct = Math.round(ratio * 100);
    matchedRef.current = stars === 3;

    let newStreak = 1;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: Saved = JSON.parse(raw);
        if (saved.puzzleNum === puzzle.num - 1) newStreak = saved.streak + 1;
      }
    } catch {
      /* ignore */
    }

    setResult({ value, pct, stars });
    setStreak(newStreak);
    setSubmitted(true);
    submitTimeRef.current = performance.now();

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          puzzleNum: puzzle.num,
          route,
          stars,
          pct,
          value,
          streak: newStreak,
        } satisfies Saved),
      );
    } catch {
      /* ignore */
    }
  };

  const share = async () => {
    if (!puzzle || !result) return;
    const starStr =
      "★".repeat(result.stars) + "☆".repeat(3 - result.stars);
    const line =
      result.stars === 3
        ? "found the optimal haul"
        : `${result.pct}% of the optimal haul`;
    const url = window.location.origin + "/#detour";
    const text = `Detour #${puzzle.num}\n${starStr}  ${line}\n${url}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const distance = puzzle ? tourLength(route, puzzle.dist) : 0;
  const collected = puzzle
    ? route.reduce((s, i) => s + puzzle.values[i], 0)
    : 0;
  const over = puzzle ? distance > puzzle.budget + 1e-9 : false;
  const canSubmit = route.length >= 2 && !over;
  const meterPct = puzzle
    ? Math.min(100, (distance / puzzle.budget) * 100)
    : 0;

  return (
    <section id="detour" className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
      <SectionLabel number="06" title="Detour" />

      <FadeIn>
        <div className="mb-8 max-w-xl space-y-3 text-muted">
          <p>
            The{" "}
            <span className="font-serif italic text-accent">
              Traveling Salesman Problem
            </span>{" "}
            asks a deceptively simple question: given a set of cities, what is
            the shortest loop that visits every one and returns home? It is one
            of the classic problems in operations research — easy to state,
            famously hard to solve, and the seed of a whole family of
            optimization algorithms.
          </p>
          <p>
            This is its prize-collecting cousin — what optimization calls the{" "}
            <span className="font-serif italic text-accent">
              Orienteering Problem
            </span>
            . Every city is worth points, but your travel budget won&apos;t
            reach them all. Pick the most valuable loop you can afford, then
            see how close you got to the optimal haul.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1} className="lg:-mx-20">
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
            <div className="flex items-start justify-center">
              <canvas
                ref={canvasRef}
                onPointerDown={pickCity}
                onPointerMove={trackPointer}
                onPointerLeave={() => {
                  pointerRef.current = null;
                }}
                aria-label="Detour puzzle grid"
                className="aspect-square w-full max-w-[560px] cursor-pointer touch-none rounded-lg border border-border"
              />
            </div>

            <div className="flex flex-col">
              {!puzzle ? (
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Loading today&apos;s puzzle…
                </p>
              ) : (
                <>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    Detour #{puzzle.num}
                    <span className="mx-2 text-border">·</span>
                    {puzzle.dateLabel}
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono text-3xl tabular-nums text-foreground">
                      {collected}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                      value collected
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.15em]">
                      <span className="text-muted">Distance</span>
                      <span
                        className="tabular-nums"
                        style={{ color: over ? OVER_COLOR : undefined }}
                      >
                        {scaled(distance)} / {scaled(puzzle.budget)}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-border">
                      <div
                        className={`h-full rounded-full transition-[width] duration-200 ${
                          over ? "budget-pulse" : ""
                        }`}
                        style={{
                          width: `${meterPct}%`,
                          background: over ? OVER_COLOR : "var(--accent)",
                        }}
                      />
                    </div>
                  </div>

                  {!submitted && (
                    <>
                      <p className="mt-5 text-sm text-muted">
                        Your start is the ringed city; the number inside each
                        city is its value. Click the cities worth the detour —
                        the loop closes back to the start. Submit the richest
                        loop you can fit in the budget.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setRoute((p) => (p.length > 1 ? p.slice(0, -1) : p))
                          }
                          disabled={route.length <= 1}
                          className="rounded-md border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] btn-lift hover:border-accent disabled:pointer-events-none disabled:opacity-40"
                        >
                          Undo
                        </button>
                        <button
                          type="button"
                          onClick={() => setRoute([START])}
                          disabled={route.length <= 1}
                          className="rounded-md border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] btn-lift hover:border-accent disabled:pointer-events-none disabled:opacity-40"
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          onClick={submit}
                          disabled={!canSubmit}
                          className="rounded-md bg-accent px-4 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-background btn-lift hover:bg-accent-hover disabled:pointer-events-none disabled:opacity-40"
                        >
                          Submit
                        </button>
                      </div>
                      {over && (
                        <p
                          className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em]"
                          style={{ color: OVER_COLOR }}
                        >
                          Over budget — drop a city to submit.
                        </p>
                      )}
                    </>
                  )}

                  {submitted && result && (
                    <div className="mt-5 animate-fadein">
                      <div className="flex gap-1 text-2xl leading-none">
                        {[0, 1, 2].map((i) =>
                          i < result.stars ? (
                            <motion.span
                              key={i}
                              className="inline-block text-accent"
                              initial={{ opacity: 0, scale: 0.3 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.32,
                                delay: 0.12 + i * 0.13,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              ★
                            </motion.span>
                          ) : (
                            <span key={i} className="text-border">
                              ☆
                            </span>
                          ),
                        )}
                      </div>
                      <p className="mt-2 text-sm">
                        {resultMessage(result.stars, result.pct)}
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-md border border-border p-2.5">
                          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                            Your haul
                          </div>
                          <div className="font-mono text-base tabular-nums text-foreground">
                            {haulCount}
                          </div>
                        </div>
                        <div className="rounded-md border border-border p-2.5">
                          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                            Optimal
                          </div>
                          <div className="font-mono text-base tabular-nums text-foreground">
                            {puzzle.optimal.value}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                        Streak{" "}
                        <span className="text-foreground">{streak}</span>
                      </div>

                      <button
                        type="button"
                        onClick={share}
                        className="mt-4 w-full rounded-md border border-border px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] btn-lift hover:border-accent"
                      >
                        {copied ? "Copied to clipboard" : "Share result"}
                      </button>

                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                        New puzzle in{" "}
                        <span className="tabular-nums text-foreground">
                          {timeToMidnight()}
                        </span>
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
