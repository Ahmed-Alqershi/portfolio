import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

const DEGREES = [
  {
    title: "Industrial Engineering",
    level: "BSc",
    year: "2022",
    blurb:
      "The foundations — operations research, optimization, and the discipline of making real systems run efficiently.",
    gpa: "3.84 / 4.0",
    honor: "First in class",
  },
  {
    title: "Computer Engineering",
    level: "MSc · AI",
    year: "2025",
    blurb:
      "Specialized in artificial intelligence — with a thesis on drug repositioning using Siamese neural networks.",
    gpa: "3.96 / 4.0",
    honor: "High honors",
  },
];

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
      <SectionLabel number="03" title="Education" />

      <FadeIn>
        <p className="mb-12 max-w-xl text-lg leading-relaxed sm:text-xl">
          My education traces one idea across two fields:{" "}
          <span className="font-serif italic text-accent">optimization</span>,
          then{" "}
          <span className="font-serif italic text-accent">intelligence</span>.
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
              <p className="mt-3 leading-relaxed text-muted">{d.blurb}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm tabular-nums text-accent">
                  GPA {d.gpa}
                </span>
                <span className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                  {d.honor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
