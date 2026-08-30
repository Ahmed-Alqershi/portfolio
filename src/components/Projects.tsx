import Image from "next/image";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import ProjectMotif, { type MotifVariant } from "./ProjectMotif";

type Project = {
  id: string;
  kind: string;
  title: string;
  /** Screenshot, where one exists that is cleared for public display. */
  image?: string;
  /** Drawn stand-in for projects with no publishable screenshot. */
  motif?: MotifVariant;
  blurb: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    id: "gamspy-sddp",
    kind: "Research software · GAMS Software GmbH",
    title: "SDDP Framework for GAMSPy",
    image: "/projects/gamspy.png",
    blurb:
      "The starting point was a multistage hydrothermal power-planning example based on Vattenfall Energy Trading data, reproduced first and then generalized into a reusable SDDP framework for GAMSPy: sampled forward passes, backward scenario solves, LP-dual-based value-function cuts, bound tracking, convergence checks, and an interface for user-defined stages, states and discrete uncertainty. When the first general version proved too slow, profiling put the bottleneck in repeated Python–GAMS round trips, so I added GUSS support to batch related scenario solves. Released in GAMSPy 1.25.0 with tests, examples and documentation.",
    tags: [
      "SDDP",
      "Stochastic Programming",
      "GAMSPy",
      "Python",
      "Decomposition",
    ],
  },
  {
    id: "cge",
    kind: "Platform · Kaizen Consulting",
    title: "Dynamic CGE Modelling Platform",
    image: "/projects/cge.png",
    blurb:
      "A reusable dynamic computable general equilibrium platform — the economic models that simulate how an entire economy responds to a policy change or shock, sector by sector. It covers formulation, calibration, solver integration, data workflows and the analyst-facing software, and was validated on a 10-year Saudi-economy case with 20 sectors and 84 commodities. I was project manager and lead developer, coordinating a six-person team of three senior economists and three developers.",
    tags: [
      "CGE Modelling",
      "Economic Modelling",
      "Calibration",
      "Platform",
      "Team Lead",
    ],
  },
  {
    id: "stryker-simopt",
    kind: "Applied OR · Stryker Corporation",
    title: "Hybrid Simulation–Optimization",
    motif: "simopt",
    blurb:
      "A plant-wide value-stream map identified the plastic-injection station as the main source of lead time. We built a Simio discrete-event model covering 90 parts, 72 molds and three machines, and used OptQuest to tune a pull-based (Q,R) policy under a 90% service-level requirement. My main contribution was integrating Simio with a Python/Gurobi production scheduler through C# and a database. Year-long 20-ECTS capstone.",
    tags: [
      "Simio",
      "OptQuest",
      "Discrete-event Simulation",
      "Gurobi",
      "Simulation–Optimization",
    ],
  },
  {
    id: "hes-scheduling",
    kind: "Applied OR · HES Kablo",
    title: "Production Scheduling",
    motif: "scheduling",
    blurb:
      "Full-line simulation identified three machines at approximately 98% utilization; the resulting flow shop was then formulated as a makespan-minimizing MILP. I developed a sub-second heuristic extending Johnson's rule — across 30 demand samples it matched the proven optimum 19 times, with a mean deviation of 2.6 minutes — and helped deliver the scheduling application. The plant study estimated a 32% increase in effective production capacity.",
    tags: ["MILP", "Flow Shop", "Scheduling Heuristics", "Simulation", "Python"],
  },
  {
    id: "drug-repositioning",
    kind: "M.Sc. Thesis · Abdullah Gül University",
    title: "Drug Repositioning with Siamese Neural Networks",
    image: "/projects/thesis.png",
    blurb:
      "Drug repositioning looks for new therapeutic uses of already-approved drugs — far faster and cheaper than developing one from scratch. My thesis framed it as a similarity problem: FastText embeddings over biomedical literature relations (SemMedDB) and known drug–disease pairs (RepoDB), fed into a Siamese neural network that scores how likely a drug treats a given disease. Built in TensorFlow/Keras and evaluated across 576 experimental configurations.",
    tags: [
      "TensorFlow/Keras",
      "Siamese Networks",
      "FastText",
      "Biomedical NLP",
      "Drug Repositioning",
    ],
  },
  {
    id: "tsa",
    kind: "Platform · Kaizen Consulting",
    title: "Tourism Satellite Account Toolkit",
    image: "/projects/tsa.png",
    blurb:
      "A toolkit built for a national Ministry of Tourism to compile its Tourism Satellite Account — the international standard for measuring what tourism contributes to an economy. It assembles the TSA tables, validates them for consistency, and publishes the resulting indicators with full traceability.",
    tags: [
      "Tourism Satellite Account",
      "Data Validation",
      "Full-stack",
      "Government",
    ],
  },
  {
    id: "pricing",
    kind: "Platform · Kaizen Consulting",
    title: "Integrated Pricing Platform",
    motif: "pricing",
    blurb:
      "A platform for the firm's pricing committee — the team that prices project bids. Instead of ad-hoc spreadsheets, they enter the project's scope, the resources it needs, discount rules and more; the platform structures the pricing decision and generates the final bid report, end to end.",
    tags: ["Internal Tooling", "Full-stack", "Reporting", "Platform"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
      <SectionLabel number="06" title="Projects" />

      <FadeIn>
        <p className="mb-14 max-w-xl text-lg leading-relaxed sm:text-xl">
          Research software, applied operations research on real production
          lines, and the platforms built around{" "}
          <span className="font-serif italic text-accent">
            models other people have to use
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
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-border ${
                    p.image ? "bg-white" : ""
                  }`}
                >
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 640px) 320px, 100vw"
                      className="object-contain"
                    />
                  ) : (
                    <ProjectMotif
                      variant={p.motif!}
                      label={`${p.title} — schematic illustration`}
                    />
                  )}
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
          Two more pieces of software are live on this page — the site itself,
          and the{" "}
          <a href="#detour" className="link-underline text-foreground">
            Detour game
          </a>{" "}
          just below, whose solver is exact. Both were built from scratch and
          are open for you to poke at.
        </p>
      </FadeIn>
    </section>
  );
}
