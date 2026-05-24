"use client";

import { useEffect, useRef, useState } from "react";

const EDGE_MASK =
  "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)";

export type SkillCard = {
  num: string;
  title: string;
  caption: string;
  items: string[];
};

export default function SkillStrip({ cards }: { cards: SkillCard[] }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const cardStep = () => {
    const el = stripRef.current;
    if (!el) return 320;
    const first = el.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + 16 : 320;
  };

  const scrollByCards = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  };

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCards(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCards(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      stripRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    } else if (e.key === "End") {
      e.preventDefault();
      const el = stripRef.current;
      el?.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    }
  };

  const onCardFocus = (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };
    update();

    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const goingForward = e.deltaY > 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      const atStart = el.scrollLeft <= 0;
      if (goingForward && atEnd) return;
      if (!goingForward && atStart) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="group/strip relative">
      <div
        ref={stripRef}
        role="region"
        aria-label="Skill groups"
        aria-orientation="horizontal"
        onKeyDown={onKey}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
      >
        {cards.map((card) => (
          <article
            key={card.num}
            tabIndex={0}
            onFocus={onCardFocus}
            className="card-glow flex h-[260px] w-[300px] shrink-0 snap-start flex-col rounded-2xl border border-border bg-surface p-5 sm:w-[320px]"
          >
            <div className="mb-3 flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
              <span className="text-accent">{card.num}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h3 className="text-base font-medium tracking-tight">
              {card.title}
            </h3>
            <p className="mt-1 mb-4 text-sm text-muted">{card.caption}</p>
            <ul className="flex flex-wrap gap-1.5">
              {card.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-[13px] transition-colors hover:border-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByCards(-1)}
        aria-label="Previous skills"
        tabIndex={-1}
        disabled={!canPrev}
        className="absolute -left-16 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-muted opacity-0 transition-all duration-200 hover:bg-foreground/[0.04] hover:text-foreground group-hover/strip:opacity-100 disabled:pointer-events-none disabled:opacity-0 lg:flex"
      >
        <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden>
          <path
            d="M10 3l-5 5 5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scrollByCards(1)}
        aria-label="Next skills"
        tabIndex={-1}
        disabled={!canNext}
        className="absolute -right-16 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-muted opacity-0 transition-all duration-200 hover:bg-foreground/[0.04] hover:text-foreground group-hover/strip:opacity-100 disabled:pointer-events-none disabled:opacity-0 lg:flex"
      >
        <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden>
          <path
            d="M6 3l5 5-5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
