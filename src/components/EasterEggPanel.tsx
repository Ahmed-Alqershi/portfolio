"use client";

import { useKonamiCode } from "@/hooks/useKonamiCode";

export default function EasterEggPanel() {
  const [open, close] = useKonamiCode();

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-500 ease-out ${
        open ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-4xl m-4 rounded-2xl border border-accent bg-background p-6 shadow-xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              ↑↑↓↓←→←→ B A
            </p>
            <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
              You found it.
            </h3>
            <p className="mt-3 text-muted">
              Since you&apos;re poking around: the Detour puzzle solves two
              NP-hard problems, not one. The same Held–Karp table gives both the
              optimal closed tour and the best value-bounded subset — which is
              why it can tell you exactly how far off you were. Ten cities keeps
              it instant; twenty-five would not.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="shrink-0 rounded-md border border-border px-3 py-1 text-sm transition hover:border-accent"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
