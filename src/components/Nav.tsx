"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#detour", label: "Detour" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio,
          )[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -32 });
    } else {
      (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto mt-4 max-w-4xl px-4">
        <nav
          className="flex items-center justify-between rounded-full border border-border/80 bg-background/60 px-5 py-2.5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40"
          aria-label="Section navigation"
        >
          <a
            href="#hero"
            onClick={(e) => scrollTo(e, "#hero")}
            aria-label="Home"
            className="flex h-6 w-6 items-center justify-center"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
          </a>
          <ul className="hidden items-center gap-1 sm:flex">
            {LINKS.map((l) => {
              const isActive = active === l.href;
              const isContact = l.href === "#contact";
              const isDetour = l.href === "#detour";
              return (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    onClick={(e) => scrollTo(e, l.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                      isContact
                        ? "bg-accent text-background hover:bg-accent-hover"
                        : isActive
                          ? "text-foreground"
                          : "text-muted hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.06]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {isDetour && (
                      <span aria-hidden className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>
                    )}
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            className="rounded-full bg-foreground px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-background btn-lift sm:hidden"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
