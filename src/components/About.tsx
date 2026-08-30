import Image from "next/image";
import FadeIn from "./FadeIn";
import SectionLabel from "./SectionLabel";

// Each separator lives inside the item that follows it, so wrapping can never
// strand a "·" at the end of a line.
const FOCUS = [
  "Stochastic decomposition",
  "Energy-system modelling",
  "Scientific software",
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
      <SectionLabel number="01" title="About" />
      <FadeIn delay={0.1}>
        <div className="card-glow rounded-2xl border border-border bg-surface p-6 sm:p-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
            <div className="flex-none">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border border-border ring-1 ring-accent-soft sm:h-28 sm:w-28">
                <Image
                  src="/profile.jpeg"
                  alt="Ahmed Alqershi"
                  fill
                  sizes="(min-width: 640px) 112px, 96px"
                  className="object-cover"
                  priority
                />
                <span className="absolute -bottom-px left-1/2 h-px w-8 -translate-x-1/2 bg-accent" />
              </div>
            </div>

            <div className="max-w-2xl flex-1">
              <p className="text-xl leading-snug sm:text-2xl">
                Building a model is one job; building the software it lives
                inside is another. I work across{" "}
                <span className="font-serif italic text-accent">both</span>.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                My main work is in mathematical optimization and scientific
                software. At GAMS Software GmbH, I am a core developer of
                GAMSPy and the primary implementer of its SDDP framework for
                multistage stochastic programs. I also work on economic
                modelling and applied simulation–optimization projects.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                I studied Industrial Engineering before completing a
                thesis-based M.Sc. in Electrical and Computer Engineering. That
                route gave me an operations-research foundation together with
                experience in computational modelling, experimentation and
                software development. My current research interests include
                stochastic decomposition, multiscale energy-system planning and
                the computational choices that decide whether large models can
                actually be solved.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Everything below is real work — the research, the projects, the
                experience, even the puzzle a few screens down, which is a
                genuine optimization solver rather than a decoration.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {FOCUS.map((item, i) => (
                  <span key={item} className="whitespace-nowrap">
                    {i > 0 && (
                      <span aria-hidden className="mr-3 text-border">
                        ·
                      </span>
                    )}
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
