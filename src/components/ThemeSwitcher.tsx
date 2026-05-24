"use client";

import { useEffect, useRef, useState } from "react";

type Palette = "indigo" | "forest" | "copper" | "plum";
type ColorMode = "light" | "dark" | "system";

const PALETTES: {
  id: Palette;
  label: string;
  light: string;
  dark: string;
}[] = [
  { id: "indigo", label: "Indigo", light: "#4338ca", dark: "#a5b4fc" },
  { id: "forest", label: "Forest", light: "#2d5a4f", dark: "#7fb89b" },
  { id: "copper", label: "Copper", light: "#b85c2c", dark: "#d68957" },
  { id: "plum", label: "Plum", light: "#5b3a5c", dark: "#c9a6c9" },
];

const MODES: { id: ColorMode; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

function resolveSystem(pref: ColorMode): "light" | "dark" {
  if (pref !== "system") return pref;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeSwitcher() {
  const [palette, setPalette] = useState<Palette>("indigo");
  const [colorMode, setColorMode] = useState<ColorMode>("system");
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved =
      (localStorage.getItem("theme") as Palette | null) ?? "indigo";
    const savedMode =
      (localStorage.getItem("colorMode") as ColorMode | null) ?? "system";
    setPalette(saved);
    setColorMode(savedMode);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute("data-theme", palette);
    localStorage.setItem("theme", palette);
  }, [palette, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("colorMode", colorMode);
    document.documentElement.setAttribute(
      "data-mode",
      resolveSystem(colorMode),
    );
    if (colorMode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () =>
      document.documentElement.setAttribute(
        "data-mode",
        mq.matches ? "dark" : "light",
      );
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [colorMode, hydrated]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (buttonRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!hydrated) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Appearance settings"
        aria-expanded={open}
        className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/90 shadow-sm backdrop-blur-xl transition hover:border-foreground/30"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="text-muted transition group-hover:text-foreground"
        >
          <path
            d="M8 1.5a6.5 6.5 0 1 0 0 13 1 1 0 0 0 1-1c0-.6-.5-1.1-.5-1.7 0-.6.5-1.1 1.1-1.1H11a3 3 0 0 0 3-3A6.5 6.5 0 0 0 8 1.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <circle cx="4.5" cy="7" r="0.9" fill="currentColor" />
          <circle cx="7" cy="4.5" r="0.9" fill="currentColor" />
          <circle cx="10.5" cy="5.5" r="0.9" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Appearance settings"
          className="absolute bottom-full right-0 mb-3 w-72 origin-bottom-right rounded-2xl border border-border bg-surface/95 p-5 shadow-2xl backdrop-blur-xl animate-fadein"
        >
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Appearance
            </h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-muted hover:text-foreground"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 3l8 8M11 3l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="mb-5">
            <p className="mb-2 text-[11px] font-medium text-muted">Palette</p>
            <div className="grid grid-cols-4 gap-2">
              {PALETTES.map((p) => {
                const active = p.id === palette;
                const swatch =
                  resolveSystem(colorMode) === "dark" ? p.dark : p.light;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPalette(p.id)}
                    aria-label={p.label}
                    aria-pressed={active}
                    title={p.label}
                    className={`group relative flex aspect-square items-center justify-center rounded-lg border transition ${
                      active
                        ? "border-foreground"
                        : "border-border hover:border-muted"
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full"
                      style={{ background: swatch }}
                    />
                    {active && (
                      <span className="absolute inset-x-0 -bottom-4 text-center font-mono text-[9px] uppercase tracking-[0.15em] text-foreground">
                        {p.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-6" />
          </div>

          <div>
            <p className="mb-2 text-[11px] font-medium text-muted">Mode</p>
            <div className="grid grid-cols-3 gap-1.5 rounded-lg border border-border p-1">
              {MODES.map((m) => {
                const active = m.id === colorMode;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setColorMode(m.id)}
                    aria-pressed={active}
                    className={`rounded-md py-1.5 text-xs transition ${
                      active
                        ? "bg-foreground text-background"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
