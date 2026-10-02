"use client";

import { OvIcon } from "../OvIcon";

export function LikeButton({
  liked,
  count,
  onToggle,
  disabled,
  size = "md",
}: {
  liked: boolean;
  count: number;
  onToggle: () => void;
  disabled?: boolean;
  size?: "sm" | "md";
}) {
  const compact = size === "sm";

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      title={disabled ? "Sign in to like" : liked ? "Unlike" : "Like"}
      aria-pressed={liked}
      className={`group flex items-center gap-1.5 transition-transform duration-150 active:scale-90 disabled:cursor-default disabled:active:scale-100 ${
        compact ? "text-[11px]" : "text-[12px]"
      }`}
      style={{ color: liked ? "#f43f5e" : "#5b6b82" }}
    >
      <OvIcon
        name="heart"
        className={`transition-transform duration-150 group-hover:scale-110 ${compact ? "text-[12px]" : "text-[14px]"}`}
      />
      <span className="font-orbitron font-bold">{count}</span>
    </button>
  );
}
