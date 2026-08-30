import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import SkillStrip, { type SkillCard } from "./SkillStrip";

const CARDS: SkillCard[] = [
  {
    num: "01",
    title: "Stochastic Optimization & Decomposition",
    caption: "Decisions made now against a branching, uncertain future.",
    items: [
      "SDDP",
      "Benders decomposition",
      "Multistage stochastic programming",
      "LP / MILP / NLP",
    ],
  },
  {
    num: "02",
    title: "Mathematical Modelling & Scientific Software",
    caption: "The models, and the libraries other people build models with.",
    items: [
      "GAMS",
      "GAMSPy",
      "Python",
      "Model/solver interfaces",
      "API design",
      "Unit testing",
      "Profiling",
      "Documentation",
    ],
    note: "GAMS / GAMSPy: professional modelling and development experience.",
  },
  {
    num: "03",
    title: "Optimization Solvers",
    caption: "What the formulations are actually handed to.",
    items: ["CPLEX", "Gurobi", "HiGHS", "CONOPT"],
  },
  {
    num: "04",
    title: "Simulation & Applied Modelling",
    caption: "Where the model has to meet a real plant or a real economy.",
    items: [
      "Simio",
      "OptQuest",
      "Discrete-event simulation",
      "Simulation–optimization",
      "CGE modelling",
    ],
  },
  {
    num: "05",
    title: "Programming & Data",
    caption: "The languages and tooling the research work runs on.",
    items: [
      "Python",
      "Julia",
      "SQL / PostgreSQL",
      "C#",
      "Java",
      "Git",
      "Docker",
    ],
    note: "Python: primary language, used professionally for scientific-library and API development. Julia: working knowledge — I studied SDDP.jl's API and architecture while designing GAMSPy's SDDP interface.",
  },
  {
    num: "06",
    title: "Machine Learning",
    caption: "From the thesis, and from ML formulations inside GAMSPy.",
    items: [
      "TensorFlow/Keras",
      "PyTorch",
      "scikit-learn",
      "FastText",
      "Siamese neural networks",
    ],
  },
  {
    num: "07",
    title: "Web Development",
    caption: "Supporting skill — how a model reaches the people using it.",
    items: ["TypeScript", "React", "Next.js", "Django", "PostgreSQL", "Tailwind"],
    note: "Supports building analyst-facing platforms. Not my primary research identity.",
    secondary: true,
  },
];

const LANGUAGES = ["Arabic — Native", "English — Fluent", "Turkish — Good"];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
      <SectionLabel number="05" title="Skills" />

      <FadeIn>
        <SkillStrip cards={CARDS} />
      </FadeIn>

      <div className="mt-8">
        <FadeIn delay={0.1}>
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
          Ordered by how central each one is to my work, not by how long the
          list is. The first four are where I spend my time.
        </p>
      </FadeIn>
    </section>
  );
}
