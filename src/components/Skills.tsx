import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import SkillStrip, { type SkillCard } from "./SkillStrip";

const CARDS: SkillCard[] = [
  {
    num: "01",
    title: "Modelling & Optimization",
    caption: "Mathematical models, optimization solvers, and the platforms around them.",
    items: [
      "Mathematical/Economic Modelling",
      "GAMS",
      "Stochastic Optimization",
      "ML in optimization",
    ],
  },
  {
    num: "02",
    title: "Machine Learning & AI",
    caption: "Neural networks, classical ML, and computer vision.",
    items: [
      "PyTorch",
      "scikit-learn",
      "Keras",
      "Computer Vision",
      "Twin NNs",
    ],
  },
  {
    num: "03",
    title: "Software Engineering",
    caption: "Languages, patterns, and tooling I reach for across projects.",
    items: ["Python", "Java", "C#", "Julia", "OOP", "REST APIs", "Testing"],
  },
  {
    num: "04",
    title: "Web Development",
    caption: "Modern full-stack web, used for client-facing platforms.",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Django",
      "PostgreSQL",
      "Tailwind",
    ],
  },
];

const TOOLS = ["Git", "Jira", "Docker"];
const LANGUAGES = ["Arabic", "English", "Turkish"];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
      <SectionLabel number="04" title="Capabilities" />

      <FadeIn>
        <SkillStrip cards={CARDS} />
      </FadeIn>

      <div className="mt-8 space-y-4">
        <FadeIn delay={0.1}>
          <div className="grid gap-3 sm:grid-cols-[140px_1fr] sm:gap-6">
            <span className="pt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Tools &amp; Process
            </span>
            <ul className="flex flex-wrap gap-1.5">
              {TOOLS.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-sm transition-colors hover:border-accent"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="grid gap-3 sm:grid-cols-[140px_1fr] sm:gap-6">
            <span className="pt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Languages
            </span>
            <ul className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((l) => (
                <li
                  key={l}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-sm transition-colors hover:border-accent"
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <p className="mt-10 max-w-xl text-sm text-muted">
          Less interested in the labels than in picking up whatever the problem
          needs. Most of these I&apos;ve shipped to production; a few I&apos;m
          still learning in earnest.
        </p>
      </FadeIn>
    </section>
  );
}
