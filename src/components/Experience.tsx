"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

type Role = {
  title: string;
  type: string;
  period: string;
  location: string;
};
type Company = {
  id: string;
  name: string;
  short: string;
  logo: string;
  logoClass?: string;
  roles: Role[];
  blurb: ReactNode;
};

const COMPANIES: Company[] = [
  {
    id: "kaizen",
    name: "Kaizen Consulting",
    short: "Kaizen",
    logo: "/logos/kaizen.svg",
    roles: [
      {
        title: "Technical Consultant",
        type: "Full-time",
        period: "2025 – Present",
        location: "Riyadh, Saudi Arabia · Remote",
      },
    ],
    blurb:
      "Economic modelling and platform development. Built a CGE — computable general equilibrium — modelling platform, a Tourism Satellite Account toolkit for a Ministry of Tourism, and a structured tender-pricing platform for the firm's pricing team. Also ran product management across several products and led the team on two of them.",
  },
  {
    id: "gams",
    name: "GAMS Development Corporation",
    short: "GAMS",
    logo: "/logos/gams.png",
    roles: [
      {
        title: "Operations Research Analyst",
        type: "Freelance",
        period: "2023 – Present",
        location: "Remote",
      },
      {
        title: "Operations Research Analyst",
        type: "Internship",
        period: "Sep – Dec 2022",
        location: "Braunschweig, Germany",
      },
    ],
    blurb: (
      <>
        I&apos;m part of the team behind GAMSPy, GAMS&apos;s Python
        optimization library. There I built SDDP — GAMSPy&apos;s stochastic
        optimization framework, inspired by{" "}
        <a
          href="https://en.wikipedia.org/wiki/Stochastic_dynamic_programming"
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline text-foreground"
        >
          Stochastic Dual Dynamic Programming
        </a>
        {" "}— extended its machine-learning framework with new features, and
        contributed to its{" "}
        <a
          href="https://github.com/GAMS-dev/gamspy-examples/tree/master/models"
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline text-foreground"
        >
          models and examples
        </a>
        . I also work on{" "}
        <a
          href="https://www.gams.com/latest/docs/UG_GAMSCONNECT.html"
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline text-foreground"
        >
          Connect
        </a>
        , GAMS&apos;s data-integration framework, adding new agents and
        enhancing existing ones. Around that: new multi-objective optimization
        algorithms and unit-test suites for the Python and C# APIs.
      </>
    ),
  },
  {
    id: "stryker",
    name: "Stryker",
    short: "Stryker",
    logo: "/logos/stryker.svg",
    roles: [
      {
        title: "Continuous Improvement Intern",
        type: "Internship",
        period: "2021 – 2022",
        location: "Kayseri, Türkiye",
      },
    ],
    blurb:
      "Led a Value Stream Mapping project, built a simulation model to test a Pull System, mined data with Excel and Python, shipped a web app for weekly demand scheduling, and automated 5S audit reporting.",
  },
  {
    id: "hes-kablo",
    name: "HES Kablo",
    short: "HES Kablo",
    logo: "/logos/hes-kablo.png",
    roles: [
      {
        title: "Planning Intern",
        type: "Internship",
        period: "2020 – 2021",
        location: "Kayseri, Türkiye",
      },
    ],
    blurb:
      "Built a simulation model of the production line and used mathematical optimization for scheduling — including a novel algorithm that produces a near-optimal schedule in seconds. Built a Python UI for production planning; achieved a ~32% increase in production capacity.",
  },
  {
    id: "proceedit",
    name: "proceedit",
    short: "proceedit",
    logo: "/logos/proceedit.avif",
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
    id: "femas",
    name: "Femas Metal",
    short: "Femas",
    logo: "/logos/femas.jpeg",
    roles: [
      {
        title: "Project Lead",
        type: "Part-time",
        period: "Feb – May 2020",
        location: "Kayseri, Türkiye",
      },
    ],
    blurb:
      "Femas manufactures kitchen appliances — ovens, microwaves, and the like. Cutting their large steel rolls, an unoptimized process was bleeding material to trim loss. I led a team of three, studied the problem in depth, restructured the data around the solving approach, and cut the trim loss by over 80%.",
  },
  {
    id: "merkez-celik",
    name: "Merkez Çelik",
    short: "Merkez Çelik",
    logo: "/logos/merkez-celik.png",
    logoClass: "scale-[1.45]",
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

export default function Experience() {
  const [active, setActive] = useState(0);
  const company = COMPANIES[active];

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
          {COMPANIES.map((c, i) => {
            const selected = i === active;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={selected}
                aria-label={c.name}
                className="group flex w-[calc(50%-6.5px)] flex-col items-center gap-2 outline-none sm:w-[calc(25%-9.5px)]"
              >
                <span
                  className={`flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border bg-white p-4 transition-all duration-200 ${
                    selected
                      ? "border-accent ring-2 ring-accent ring-offset-2 ring-offset-background"
                      : "border-border opacity-70 group-hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.logo}
                    alt={c.name}
                    className={`h-full w-full object-contain ${c.logoClass ?? ""}`}
                  />
                </span>
                <span
                  className={`text-center font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                    selected
                      ? "text-foreground"
                      : "text-muted group-hover:text-foreground"
                  }`}
                >
                  {c.short}
                </span>
              </button>
            );
          })}
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
                      {r.type}
                      <span className="mx-2 text-border">·</span>
                      {r.period}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                      {r.location}
                    </div>
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
