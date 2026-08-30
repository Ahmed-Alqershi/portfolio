"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#research", label: "Research" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#detour", label: "Detour" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

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
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    // Active section = the last one whose top has scrolled above a marker
    // line at 30% from the viewport top. Walking in document order picks it
    // deterministically regardless of section height — IntersectionObserver
    // with a narrow rootMargin couldn't, which caused some sections to skip.
    const onScroll = () => {
      const marker = window.innerHeight * 0.3;
      let currentId: string | null = null;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= marker) currentId = s.id;
        else break;
      }
      setActive(currentId ? `#${currentId}` : "");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
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

          <ul className="hidden items-center gap-0.5 md:flex lg:gap-1">
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
                    className={`relative flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-xs uppercase tracking-[0.1em] transition-colors lg:px-2.5 lg:tracking-[0.15em] ${
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

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-7 w-7 items-center justify-center text-foreground md:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {mobileOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6l-12 12" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.ul
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-2 backdrop-blur-xl md:hidden"
            >
              {LINKS.map((l) => {
                const isContact = l.href === "#contact";
                const isDetour = l.href === "#detour";
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => scrollTo(e, l.href)}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                        isContact
                          ? "bg-accent text-background"
                          : "text-foreground hover:bg-foreground/[0.06]"
                      }`}
                    >
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
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
