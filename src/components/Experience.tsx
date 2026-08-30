"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

type Role = {
  title: string;
  /** Employment status. Omitted where no verified label applies. */
  type?: string;
  period: string;
  location: string;
  /** Optional description attached to this role rather than the company. */
  note?: string;
};
type Company = {
  id: string;
  name: string;
  short: string;
  logo: string;
  logoClass?: string;
  /** "earlier" roles render in a smaller, visually secondary row. */
  tier: "primary" | "earlier";
  roles: Role[];
  blurb: ReactNode;
};

const COMPANIES: Company[] = [
  {
    id: "gams",
    name: "GAMS Software GmbH",
    short: "GAMS",
    logo: "/logos/gams.png",
    tier: "primary",
    roles: [
      {
        title: "Operations Research Analyst",
        period: "January 2023 – Present",
        location: "Remote",
      },
      {
        title: "Operations Research Analyst",
        type: "Erasmus Trainee",
        period: "September – December 2022",
        location: "Braunschweig, Germany",
        note: "Researched multi-objective optimization and implemented an initial executable example based on the sandwich algorithm, together with technical presentations and documentation.",
      },
    ],
    blurb: (
      <>
        I work on GAMSPy, GAMS&apos;s Python modelling library. I am the core
        developer and primary implementer of its{" "}
        <a
          href="https://gamspy.readthedocs.io/en/latest/user/sddp/sddp.html"
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline text-foreground"
        >
          SDDP framework
        </a>{" "}
        for multistage stochastic programs. I have also contributed
        neural-network and ReLU formulations, bound propagation and
        piecewise-linear APIs, the{" "}
        <a
          href="https://github.com/GAMS-dev/gamspy-examples/tree/master/models"
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline text-foreground"
        >
          model library
        </a>
        ,{" "}
        <a
          href="https://www.gams.com/latest/docs/UG_GAMSCONNECT.html"
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline text-foreground"
        >
          Connect
        </a>{" "}
        data-integration work, tests, documentation and bug fixes.
      </>
    ),
  },
  {
    id: "kaizen",
    name: "Kaizen Consulting",
    short: "Kaizen",
    logo: "/logos/kaizen.svg",
    tier: "primary",
    roles: [
      {
        title: "Economic Modelling and Software Development Consultant",
        type: "Project-based, part-time",
        period: "July 2025 – Present",
        location: "Remote",
      },
    ],
    blurb:
      "I develop mathematical and economic models together with the software used to calibrate them, manage data, configure scenarios and inspect results. My projects include a dynamic CGE modelling platform, a Tourism Satellite Account toolkit for a national Ministry of Tourism and a structured tender-pricing platform. I have also managed products and led development work on two projects.",
  },
  {
    id: "stryker",
    name: "Stryker Corporation",
    short: "Stryker",
    logo: "/logos/stryker.svg",
    tier: "primary",
    roles: [
      {
        title: "Continuous Improvement Intern",
        type: "Internship",
        period: "June 2021 – May 2022",
        location: "Kayseri, Türkiye",
      },
    ],
    blurb:
      "During a year-long, 20-ECTS capstone, our plant-wide value-stream map identified the plastic-injection station as the main source of lead time. We built a Simio discrete-event model and used simulation–optimization for inventory and production decisions. My main contribution was integrating Simio with a Python/Gurobi scheduler through C# and a database.",
  },
  {
    id: "hes-kablo",
    name: "HES Kablo",
    short: "HES Kablo",
    logo: "/logos/hes-kablo.png",
    tier: "primary",
    roles: [
      {
        title: "Production Planning Intern",
        type: "Internship",
        period: "November 2020 – May 2021",
        location: "Kayseri, Türkiye",
      },
    ],
    blurb:
      "Led a three-person production-scheduling project. A simulation of the full line identified three machines at approximately 98% utilization; we then modelled the resulting three-machine flow shop as a MILP. I developed a sub-second heuristic extending Johnson's rule and helped deliver the scheduling application. The plant study estimated a 32% increase in effective production capacity.",
  },
  {
    id: "femas",
    name: "Femas Metal",
    short: "Femas",
    logo: "/logos/femas.jpeg",
    tier: "primary",
    roles: [
      {
        title: "Project Lead",
        type: "Part-time",
        period: "February – May 2020",
        location: "Kayseri, Türkiye",
      },
    ],
    blurb:
      "Led a three-person cutting-stock project. I enumerated feasible cutting patterns in Java and optimized their selection in GAMS, reducing trim loss by more than 80% compared with the previous cutting strategy.",
  },
  {
    id: "proceedit",
    name: "proceedit",
    short: "proceedit",
    logo: "/logos/proceedit.avif",
    tier: "earlier",
    roles: [
      {
        title: "Operations Branch Head",
        type: "Freelance",
        period: "Sep 2020 – Jan 2021",
        location: "Barcelona, Spain",
      },
      {
        title: "Opex Unit Manager",
        type: "Full-time",
        period: "Jun 2020 – Sep 2020",
        location: "Barcelona, Spain",
      },
    ],
    blurb:
      "Optimized business operations using Six Sigma techniques and simulation modelling.",
  },
  {
    id: "merkez-celik",
    name: "Merkez Çelik",
    short: "Merkez Çelik",
    logo: "/logos/merkez-celik.png",
    logoClass: "scale-[1.45]",
    tier: "earlier",
    roles: [
      {
        title: "Engineer Intern",
        type: "Internship",
        period: "Jul – Aug 2019",
        location: "Kayseri, Türkiye",
      },
    ],
    blurb:
      "My first internship — in the continuous improvement department. Picked up the fundamentals of structured, efficient problem-solving and delivered a project focused on 5S.",
  },
];

function LogoTile({
  company,
  selected,
  onSelect,
}: {
  company: Company;
  selected: boolean;
  onSelect: () => void;
}) {
  // "earlier" roles stay in the same grid at the same size — keeping the
  // 4-then-3 pyramid intact — and read as secondary through opacity alone.
  const earlier = company.tier === "earlier";
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={company.name}
      className="group flex w-[calc(50%-6.5px)] flex-col items-center gap-2 outline-none sm:w-[calc(25%-9.5px)]"
    >
      <span
        className={`flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border bg-white p-4 transition-all duration-200 ${
          selected
            ? "border-accent ring-2 ring-accent ring-offset-2 ring-offset-background"
            : `border-border group-hover:opacity-100 ${earlier ? "opacity-40" : "opacity-70"}`
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={company.logo}
          alt={company.name}
          className={`h-full w-full object-contain ${company.logoClass ?? ""}`}
        />
      </span>
      <span
        className={`text-center font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
          selected
            ? "text-foreground"
            : `group-hover:text-foreground ${earlier ? "text-muted/60" : "text-muted"}`
        }`}
      >
        {company.short}
      </span>
    </button>
  );
}

export default function Experience() {
  const [activeId, setActiveId] = useState(COMPANIES[0].id);
  const company = COMPANIES.find((c) => c.id === activeId) ?? COMPANIES[0];

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
      <SectionLabel number="02" title="Experience" />

      <FadeIn>
        <p className="mb-10 max-w-xl text-lg leading-relaxed sm:text-xl">
          Research, consulting, and the factory floor — every role has circled
          the same question:{" "}
          <span className="font-serif italic text-accent">
            how do you make a system run better?
          </span>
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="mb-5 font-mono text-sm uppercase tracking-[0.2em] text-accent">
          I work(ed) with
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {COMPANIES.map((c) => (
            <LogoTile
              key={c.id}
              company={c}
              selected={c.id === activeId}
              onSelect={() => setActiveId(c.id)}
            />
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-8 min-h-[15rem] rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                {company.name}
              </h3>

              <div className="mt-4 space-y-3">
                {company.roles.map((r, idx) => (
                  <div key={`${r.title}-${idx}`}>
                    <div className="font-medium">{r.title}</div>
                    <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                      {r.type && (
                        <>
                          {r.type}
                          <span className="mx-2 text-border">·</span>
                        </>
                      )}
                      {r.period}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                      {r.location}
                    </div>
                    {r.note && (
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {r.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-5 leading-relaxed text-muted">{company.blurb}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </FadeIn>
    </section>
  );
}
