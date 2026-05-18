import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-xs tracking-[0.3em] text-(--havana-gold)">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl text-(--havana-cream) sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
