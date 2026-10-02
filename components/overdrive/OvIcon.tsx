import type { CSSProperties } from "react";

const ICONS: Record<string, string> = {
  search: "⌕",
  heart: "♥",
  "heart-filled": "♥",
  library: "▤",
  grid: "▦",
  list: "☰",
  "live-dot": "⬤",
  clock: "◷",
  play: "▶",
  close: "✕",
  "chevron-left": "◂",
  reminder: "◔",
  "chevron-down": "▾",
  send: "▸",
  menu: "☰",
  check: "✓",
  comment: "◈",
  reply: "↳",
  spoiler: "◉",
  edit: "✎",
  user: "◍",
};

export function OvIcon({
  name,
  className = "text-[14px]",
  style,
}: {
  name: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center leading-none ${className}`}
      style={style}
    >
      {ICONS[name] ?? ""}
    </span>
  );
}
