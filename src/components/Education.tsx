import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

type Degree = {
  title: string;
  level: string;
  year: string;
  institution: string;
  period: string;
  facts: string[];
  blurb: string;
  gpa: string;
  honors: string[];
};

const DEGREES: Degree[] = [
  {
    title: "Industrial Engineering",
    level: "B.Sc.",
    year: "2022",
    institution: "Abdullah Gül University",
    period: "August 2018 – June 2022",
    facts: ["245 ECTS", "Taught and examined entirely in English"],
    blurb:
      "Completed 57 ECTS in operations research and optimization, including Stochastic Models, Deterministic Optimization, Mathematical Modeling, System Simulation and Decision and Risk Analysis; also completed 32 ECTS of supervised industrial work.",
    gpa: "3.84 / 4.00",
    honors: ["High Honour", "First-ranked graduate, 2022"],
  },
  {
    title: "Electrical and Computer Engineering",
    level: "M.Sc.",
    year: "2025",
    institution: "Abdullah Gül University",
    period: "September 2023 – May 2025",
    facts: [
      "120 ECTS",
      "Thesis-based degree, taught and examined entirely in English",
    ],
    blurb:
      "Designed a TensorFlow/Keras pipeline combining SemMedDB relations, FastText embeddings and Siamese neural networks. Evaluated 576 experimental configurations; the selected model reached 87.66% validation accuracy and 83.2% test accuracy.",
    gpa: "3.96 / 4.00",
    honors: [],
  },
];

const THESIS =
  "Neural Insights into Drug Repositioning: A Literature-Based Framework Using Word Embeddings and Siamese Networks";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
      <SectionLabel number="03" title="Education" />

      <FadeIn>
        <p className="mb-12 max-w-xl text-lg leading-relaxed sm:text-xl">
          An operations-research foundation, then the{" "}
          <span className="font-serif italic text-accent">computational</span>{" "}
          side of it — both degrees taught and examined in English.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid gap-10 sm:grid-cols-2">
          {DEGREES.map((d, i) => (
            <div key={d.title} className="relative">
              {i === 0 && (
                <div
                  aria-hidden
                  className="absolute left-[5px] top-[33px] hidden h-px w-[calc(100%+2.5rem)] bg-border sm:block"
                />
              )}
              <span
                aria-hidden
                className="absolute left-0 top-7 hidden h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background sm:block"
              />
              <div className="font-mono text-sm tracking-[0.1em] tabular-nums text-foreground">
                {d.year}
              </div>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:mt-10">
                <h3 className="text-xl font-medium tracking-tight">
                  {d.title}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {d.level}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-x-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                <span>{d.institution}</span>
                {/* Separator travels with the period, and the period never
                    splits across lines mid-range. */}
                <span className="whitespace-nowrap">
                  <span aria-hidden className="mr-2 text-border">
                    ·
                  </span>
                  {d.period}
                </span>
              </div>

              <ul className="mt-3 space-y-1 text-sm text-muted">
                {d.facts.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden className="text-border">
                      —
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {d.level === "M.Sc." && (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Thesis (45 ECTS):{" "}
                  <span className="font-serif italic text-foreground">
                    {THESIS}
                  </span>
                </p>
              )}

              <p className="mt-3 leading-relaxed text-muted">{d.blurb}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm tabular-nums text-accent">
                  GPA {d.gpa}
                </span>
                {d.honors.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
