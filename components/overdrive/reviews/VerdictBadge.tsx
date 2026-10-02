import { verdictMeta } from "@/utils/reviews";

export function VerdictBadge({
  verdict,
  size = "md",
}: {
  verdict: string;
  size?: "sm" | "md";
}) {
  const meta = verdictMeta(verdict);
  const compact = size === "sm";

  return (
    <span
      className={`ov-clip-sm inline-block whitespace-nowrap font-orbitron font-bold ${
        compact ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]"
      }`}
      style={{
        color: meta.color,
        border: `1px solid ${meta.color}`,
        background: `${meta.color}14`,
        letterSpacing: "1.5px",
      }}
    >
      {meta.label}
    </span>
  );
}
