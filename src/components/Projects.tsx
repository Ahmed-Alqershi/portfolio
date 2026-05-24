import Image from "next/image";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

type Project = {
  id: string;
  kind: string;
  title: string;
  image: string;
  blurb: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    id: "drug-repositioning",
    kind: "Master's Thesis",
    title: "Drug Repositioning with Siamese Neural Networks",
    image: "/projects/thesis.png",
    blurb:
      "Drug repositioning looks for new therapeutic uses of already-approved drugs — far faster and cheaper than developing one from scratch. My master's thesis framed it as a similarity problem: FastText word embeddings trained on biomedical literature (SemMedDB) and known drug–disease pairs (RepoDB), fed into a Siamese neural network that scores how likely a drug treats a given disease — validated against held-out approved and terminated cases.",
    tags: ["PyTorch", "Siamese Networks", "FastText", "NLP", "Drug Discovery"],
  },
  {
    id: "cge",
    kind: "Platform · Kaizen Consulting",
    title: "CGE Modelling Platform",
    image: "/projects/cge.png",
    blurb:
      "A web platform for computable general equilibrium (CGE) modelling — the economic models that simulate how an entire economy responds to a policy change or shock, sector by sector. Analysts set up scenarios, run them, and compare outcomes through the interface, instead of hand-coding and re-running models for every question.",
    tags: ["CGE Modelling", "Economic Modelling", "Full-stack", "Platform"],
  },
  {
    id: "tsa",
    kind: "Platform · Kaizen Consulting",
    title: "TSA Toolkit",
    image: "/projects/tsa.png",
    blurb:
      "A toolkit built for a Ministry of Tourism to compile its Tourism Satellite Account — the international standard for measuring what tourism contributes to an economy. It assembles the TSA tables, validates them for consistency, and publishes the resulting indicators with full traceability.",
    tags: ["Tourism Satellite Account", "Data Validation", "Full-stack", "Government"],
  },
  {
    id: "pricing",
    kind: "Platform · Kaizen Consulting",
    title: "Integrated Pricing Platform",
    image: "/projects/pricing.png",
    blurb:
      "A platform for the firm's pricing committee — the team that prices project bids. Instead of ad-hoc spreadsheets, they enter the project's scope, the resources it needs, discount rules and more; the platform structures the pricing decision and generates the final bid report, end to end.",
    tags: ["Internal Tooling", "Full-stack", "Reporting", "Platform"],
  },
  {
    id: "gamspy",
    kind: "Open-source library · GAMS",
    title: "GAMSPy",
    image: "/projects/gamspy.png",
    blurb:
      "GAMSPy is GAMS's Python library for building large-scale optimization models. As part of the team, I contribute across the library and built SDDP — its stochastic optimization framework, inspired by the Stochastic Dual Dynamic Programming algorithm. It's the tooling for optimizing decisions under uncertainty, where the future branches into many possible scenarios (the tree on the left) and the policy must hedge across all of them.",
    tags: ["Python", "Optimization", "Stochastic Programming", "SDDP", "Open-source"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
      <SectionLabel number="05" title="Projects" />

      <FadeIn>
        <p className="mb-14 max-w-xl text-lg leading-relaxed sm:text-xl">
          A master&apos;s thesis, platforms built for real clients, and an
          open-source library — a cross-section of{" "}
          <span className="font-serif italic text-accent">
            modelling, machine learning, and software
          </span>
          .
        </p>
      </FadeIn>

      <div className="space-y-16">
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.id}>
            <div
              className={`flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8 ${
                i % 2 === 1 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <div className="sm:w-[44%]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-white">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 640px) 320px, 100vw"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="sm:flex-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {p.kind}
                </p>
                <h3 className="mt-2 text-xl font-medium tracking-tight sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{p.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <p className="mt-16 max-w-xl leading-relaxed text-muted">
          Two more are live on this page — this site itself, and the{" "}
          <a href="#detour" className="link-underline text-foreground">
            Detour game
          </a>{" "}
          just below. Both built from scratch, and open for you to explore.
        </p>
      </FadeIn>
    </section>
  );
}
