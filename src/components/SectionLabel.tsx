import FadeIn from "./FadeIn";

export default function SectionLabel({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <FadeIn>
      <div className="mb-12 flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">{number}</span>
        <span className="h-px flex-none w-6 bg-border" />
        <span>{title}</span>
      </div>
    </FadeIn>
  );
}
