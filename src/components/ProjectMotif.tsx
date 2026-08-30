/**
 * Line-art stand-ins for projects that have no publishable screenshot.
 * Each one draws the actual structure of the problem rather than decoration:
 * a flow-shop schedule, a simulation–optimization loop, a pricing pipeline.
 * Colours come from the theme's CSS variables, so all eight palettes work.
 */

export type MotifVariant = "scheduling" | "simopt" | "pricing";

const STROKE = {
  fill: "none",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Scheduling() {
  // Three machines, jobs cascading across them: a flow shop, with the
  // makespan marked at the right.
  const lanes = [0, 1, 2];
  const bars = [
    [
      [40, 78],
      [86, 128],
      [140, 176],
    ],
    [
      [78, 124],
      [128, 166],
      [176, 220],
    ],
    [
      [124, 158],
      [166, 214],
      [220, 262],
    ],
  ];

  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" role="presentation">
      {lanes.map((l) => (
        <line
          key={`axis-${l}`}
          x1="36"
          y1={78 + l * 46}
          x2="286"
          y2={78 + l * 46}
          className="stroke-border"
          {...STROKE}
        />
      ))}
      {bars.map((lane, li) =>
        lane.map(([x1, x2], bi) => (
          <rect
            key={`${li}-${bi}`}
            x={x1}
            y={62 + li * 46}
            width={x2 - x1}
            height="16"
            rx="3"
            className={
              bi === 1 ? "fill-accent opacity-80" : "fill-border opacity-90"
            }
          />
        )),
      )}
      <line
        x1="262"
        y1="46"
        x2="262"
        y2="186"
        strokeDasharray="4 4"
        className="stroke-accent"
        {...STROKE}
      />
      {lanes.map((l) => (
        <circle
          key={`dot-${l}`}
          cx="28"
          cy={70 + l * 46}
          r="2.5"
          className="fill-accent"
        />
      ))}
    </svg>
  );
}

function SimOpt() {
  // Discrete-event line (source → queue → station → sink) with the
  // optimizer feeding decisions back into it.
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" role="presentation">
      <line
        x1="44"
        y1="132"
        x2="276"
        y2="132"
        className="stroke-border"
        {...STROKE}
      />
      <circle cx="44" cy="132" r="7" className="stroke-border" {...STROKE} />
      {[96, 108, 120].map((x) => (
        <line
          key={x}
          x1={x}
          y1="120"
          x2={x}
          y2="144"
          className="stroke-border"
          {...STROKE}
        />
      ))}
      <rect
        x="158"
        y="112"
        width="40"
        height="40"
        rx="5"
        className="stroke-accent"
        {...STROKE}
      />
      <rect
        x="268"
        y="124"
        width="16"
        height="16"
        rx="3"
        className="fill-border"
      />
      <path
        d="M178 112V74h-60"
        strokeDasharray="4 4"
        className="stroke-accent"
        {...STROKE}
      />
      <path d="M126 68l-8 6 8 6" className="stroke-accent" {...STROKE} />
      <circle cx="96" cy="74" r="9" className="stroke-accent" {...STROKE} />
      <circle cx="96" cy="74" r="2.5" className="fill-accent" />
    </svg>
  );
}

function Pricing() {
  // Structured inputs (scope, resources, rules) resolving into one bid.
  const rows = [0, 1, 2];
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" role="presentation">
      {rows.map((r) => (
        <g key={r}>
          <rect
            x="36"
            y={78 + r * 34}
            width="88"
            height="20"
            rx="4"
            className="stroke-border"
            {...STROKE}
          />
          <path
            d={`M124 ${88 + r * 34}H166`}
            className="stroke-border"
            {...STROKE}
          />
        </g>
      ))}
      <path d="M166 88v34" className="stroke-border" {...STROKE} />
      <path d="M166 156v-34" className="stroke-border" {...STROKE} />
      <path d="M166 122h26" className="stroke-accent" {...STROKE} />
      <path d="M186 116l8 6-8 6" className="stroke-accent" {...STROKE} />
      <rect
        x="200"
        y="86"
        width="72"
        height="72"
        rx="6"
        className="stroke-accent"
        {...STROKE}
      />
      <path d="M216 112h40M216 126h40M216 140h22" className="stroke-border" {...STROKE} />
    </svg>
  );
}

const VARIANTS: Record<MotifVariant, () => React.JSX.Element> = {
  scheduling: Scheduling,
  simopt: SimOpt,
  pricing: Pricing,
};

export default function ProjectMotif({
  variant,
  label,
}: {
  variant: MotifVariant;
  label: string;
}) {
  const Shape = VARIANTS[variant];
  return (
    <div
      role="img"
      aria-label={label}
      className="flex h-full w-full items-center justify-center bg-surface p-6"
    >
      <Shape />
    </div>
  );
}
