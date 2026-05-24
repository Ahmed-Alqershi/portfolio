"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

const NAME = "Ahmed Alqershi";
const ROTATING = ["clean", "honest", "careful", "rigorous", "useful", "clear", "quiet"];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.15 },
  },
};

const letter = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const LONGEST = ROTATING.reduce((a, b) => (a.length >= b.length ? a : b));

function CyclingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setI((p) => (p + 1) % ROTATING.length),
      2400,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-grid align-baseline">
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1 font-serif italic"
      >
        {LONGEST}
      </span>
      <span className="col-start-1 row-start-1 inline-block text-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={ROTATING[i]}
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block font-serif italic text-foreground"
          >
            {ROTATING[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

function scrollTo(e: React.MouseEvent, href: string) {
  e.preventDefault();
  const el = document.querySelector(href);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -32 });
  else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const { scrollY } = useScroll();
  const arrowOpacity = useTransform(scrollY, [0, 220], [1, 0]);

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6"
    >
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for work
          <span className="text-border">·</span>
          Open to remote
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          aria-label={NAME}
          className="font-mono text-5xl font-medium tracking-[-0.04em] sm:text-7xl"
        >
          {NAME.split("").map((ch, i) => (
            <motion.span
              key={i}
              variants={letter}
              className="inline-block whitespace-pre"
            >
              {ch}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-2xl"
        >
          I build <CyclingWord /> things.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
        >
          <span>Modelling</span>
          <span className="text-border">·</span>
          <span>Machine Learning</span>
          <span className="text-border">·</span>
          <span>Software</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            onClick={(e) => scrollTo(e, "#projects")}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-background btn-lift"
          >
            See my work
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            >
              <path
                d="M2.5 7h9m-3.5-3.5L11.5 7 8 10.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] btn-lift hover:border-foreground"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.a
          href="/ahmed-alqershi-cv.pdf"
          download
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9 }}
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
          Download CV
        </motion.a>
      </div>

      <motion.div
        style={{ opacity: arrowOpacity }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
      <motion.a
        href="#about"
        onClick={(e) => scrollTo(e, "#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        aria-label="Scroll to about"
        className="block"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block text-muted hover:text-foreground transition-colors"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden
          >
            <path
              d="M5 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </motion.a>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_50%_30%,var(--accent-soft),transparent_70%)]" />
    </section>
  );
}
