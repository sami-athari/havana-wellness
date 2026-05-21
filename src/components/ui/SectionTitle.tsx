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
    <div className={cn("text-left", className)}>
      <div className="inline-flex rounded-full bg-gold/10 px-4 py-2 text-[10px] tracking-widest text-gold">
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-4xl text-[#111111] sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
