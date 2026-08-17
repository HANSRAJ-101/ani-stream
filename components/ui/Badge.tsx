import { cx } from "@/lib/utils";

export default function Badge({
  children,
  variant = "default"
}: {
  children: React.ReactNode;
  variant?: "default" | "purple" | "cyan";
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        variant === "default" && "bg-black/60 text-white/80 border border-white/10",
        variant === "purple" && "bg-neon-purple/20 text-neon-purple border border-neon-purple/40",
        variant === "cyan" && "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40"
      )}
    >
      {children}
    </span>
  );
}
