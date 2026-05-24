import Image from "next/image";
import FadeIn from "./FadeIn";
import SectionLabel from "./SectionLabel";

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
                inside is another — and they usually belong to two different
                people. I&apos;m{" "}
                <span className="font-serif italic text-accent">both</span>.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                I work across mathematical and economic modelling, machine
                learning, and the platforms that put them to work. Recently
                that&apos;s meant operations research at GAMS — on the team
                behind GAMSPy, their Python optimization library — and
                economic-modelling platforms, one built for a Ministry of
                Tourism.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Earlier: a master&apos;s thesis using neural networks to find
                new uses for approved drugs, and a run of roles turning messy
                industrial problems into working systems. Different fields; the
                same shape of problem each time.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Everything below is real work — the projects, the experience,
                even the puzzle a few screens down, which is a genuine
                optimization solver, not a decoration. If you&apos;ve got a
                problem that needs the modelling and the engineering in one
                head, the form at the bottom reaches me directly.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                <span>Based remote</span>
                <span className="text-border">·</span>
                <span>Open to roles &amp; projects</span>
                <span className="text-border">·</span>
                <span>Building models &amp; platforms</span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
