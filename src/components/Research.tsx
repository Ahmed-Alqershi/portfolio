import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

type Entry = {
  id: string;
  /** What kind of output this is — deliberately distinct per entry so a
   *  manuscript, a blog article, software and a thesis don't all read as
   *  peer-reviewed papers. */
  kind: string;
  title: string;
  authors?: string;
  venue: string;
  role: string;
  status?: string;
  blurb: string;
  link?: { href: string; label: string };
  /** Rendered under the link row, for provenance the link can't carry. */
  footnote?: string;
};

const ENTRIES: Entry[] = [
  {
    id: "manuscript",
    kind: "Journal manuscript",
    title:
      "A Siamese Neural Network Framework for Computational Drug Repositioning Using Literature-Derived Biomedical Knowledge",
    authors: "Ahmed Alqershi and Gokhan Bakal",
    venue: "Revised manuscript under review at the Journal of Computational Science",
    role: "First author",
    status: "Under review",
    blurb:
      "Developed from my M.Sc. thesis. I designed the original study, implemented the TensorFlow/Keras pipeline, ran the 576 experimental configurations, analysed the results and wrote the initial manuscript. My co-author and supervisor subsequently helped develop the work into the revised journal manuscript and led substantial parts of the response to peer review.",
  },
  {
    id: "gams-article",
    kind: "Technical article",
    title: "Speed vs. Guarantees: A Practical MIP–NLP Trade-off for NN Robustness",
    authors:
      "Ahmed Alqershi, Burak Usul, Michael Bussieck, Muhammet Soytürk and Steve Dirkse",
    venue: "GAMS Technical Blog · 12 November 2025",
    role: "Lead author",
    blurb:
      "Benchmarked exact big-M MIP and complementarity-based NLP formulations for neural-network robustness across 30 MNIST architectures, then tested Sobol multi-starts as a practical way to improve the faster NLP approach.",
    link: {
      href: "https://www.gams.com/blog/2025/11/speed-vs.-guarantees-a-practical-mipnlp-trade-off-for-nn-robustness/",
      label: "Read the article",
    },
  },
  {
    id: "sddp",
    kind: "Research software",
    title: "SDDP framework for GAMSPy",
    venue: "GAMS Software GmbH · released in GAMSPy 1.25.0",
    role: "Core developer and primary implementer",
    blurb:
      "A reusable framework for multistage stochastic programs with sampled forward passes, backward scenario solves, LP-dual-based value-function cuts, bound tracking and convergence checks. I also developed GAMSPy's GUSS support to batch related scenario solves after profiling showed that repeated Python–GAMS round trips were the main bottleneck.",
    link: {
      href: "https://gamspy.readthedocs.io/en/latest/user/sddp/sddp.html",
      label: "Documentation",
    },
  },
  {
    id: "thesis",
    kind: "Master's thesis",
    title:
      "Neural Insights into Drug Repositioning: A Literature-Based Framework Using Word Embeddings and Siamese Networks",
    venue: "M.Sc. thesis · Abdullah Gül University · 2025 · 45 ECTS",
    role: "Sole author",
    blurb:
      "A literature-based framework for drug repositioning: SemMedDB relations and FastText embeddings feeding a Siamese network that scores how likely a drug treats a given disease, evaluated across 576 experimental configurations.",
    link: {
      href: "https://tez.yok.gov.tr/UlusalTezMerkezi/",
      label: "YÖK National Thesis Centre",
    },
    footnote:
      "Council of Higher Education (YÖK) National Thesis Centre, thesis no. 958165 — the record is retrieved by searching that number.",
  },
];

const ArrowIcon = () => (
  <svg
    width="12"
    height="12"
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
);

export default function Research() {
  return (
    <section id="research" className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
      <SectionLabel number="04" title="Research" />

      <FadeIn>
        <p className="mb-12 max-w-xl text-lg leading-relaxed sm:text-xl">
          A manuscript under review, a published technical article, a thesis,
          and the{" "}
          <span className="font-serif italic text-accent">
            research software
          </span>{" "}
          I am responsible for at work.
        </p>
      </FadeIn>

      <ul className="space-y-px">
        {ENTRIES.map((e, i) => (
          <li key={e.id}>
            <FadeIn delay={i === 0 ? 0 : 0.05}>
              <article className="border-t border-border py-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    {e.kind}
                  </span>
                  {e.status && (
                    <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                      {e.status}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-lg font-medium leading-snug tracking-tight sm:text-xl">
                  {e.title}
                </h3>

                {e.authors && (
                  <p className="mt-2 text-sm text-muted">{e.authors}</p>
                )}
                <p className="mt-1 font-serif text-base italic text-muted">
                  {e.venue}
                </p>

                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                  Role: <span className="text-foreground">{e.role}</span>
                </p>

                <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                  {e.blurb}
                </p>

                {e.link && (
                  <a
                    href={e.link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-colors hover:text-accent"
                  >
                    {e.link.label}
                    <ArrowIcon />
                  </a>
                )}

                {e.footnote && (
                  <p className="mt-3 max-w-2xl text-sm text-muted">
                    {e.footnote}
                  </p>
                )}
              </article>
            </FadeIn>
          </li>
        ))}
      </ul>

      <FadeIn>
        <div className="mt-12 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Teaching
          </p>
          <h3 className="mt-3 text-lg font-medium tracking-tight sm:text-xl">
            Volunteer Teaching Assistant — Stochastic Models
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
            Abdullah Gül University
            <span className="mx-2 text-border">·</span>
            October 2021 – January 2022
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            After earning an A in the course, I volunteered to help the
            following cohort. I joined practical sessions, worked through
            numerical examples, answered questions outside class and recorded
            public tutorials on Markov chains and Poisson processes.
          </p>
          <a
            href="https://www.youtube.com/playlist?list=PLJ9CI6IF2j-E"
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-colors hover:text-accent"
          >
            Watch tutorials
            <ArrowIcon />
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
