"use client";

import { VERDICTS, verdictMeta, type Verdict } from "@/utils/reviews";
import type { ReviewStats } from "@/utils/types";

/// Consensus panel: the modal verdict plus a distribution bar per tier. Rows are
/// filter toggles, so this doubles as the verdict filter control.
export function VerdictMeter({
  stats,
  activeVerdict,
  onVerdictChange,
}: {
  stats: ReviewStats;
  activeVerdict: Verdict | null;
  onVerdictChange: (verdict: Verdict | null) => void;
}) {
  const consensus = stats.consensus ? verdictMeta(stats.consensus) : null;
  const peak = Math.max(1, ...Object.values(stats.counts));

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="font-orbitron text-xs font-bold tracking-[2px] text-ov-rose">
          PLAYER CONSENSUS
        </span>
        <span className="ml-auto text-[11px] tracking-[1px] text-ov-muted">
          {stats.total} {stats.total === 1 ? "REVIEW" : "REVIEWS"}
        </span>
      </div>

      {consensus ? (
        <div
          className="ov-clip-md mt-3.5 inline-block px-4 py-2.5 font-orbitron text-[22px] font-black"
          style={{
            color: consensus.color,
            border: `1px solid ${consensus.color}`,
            background: `${consensus.color}12`,
            letterSpacing: "1px",
          }}
        >
          {consensus.label}
        </div>
      ) : (
        <div className="mt-3.5 font-orbitron text-[18px] font-black text-ov-muted">
          NO VERDICT YET
        </div>
      )}

      <div className="mt-4 space-y-1.5">
        {[...VERDICTS].reverse().map((tier) => {
          const count = stats.counts[tier.value] ?? 0;
          const active = activeVerdict === tier.value;
          const share = (count / peak) * 100;

          return (
            <button
              key={tier.value}
              type="button"
              disabled={count === 0}
              onClick={() => onVerdictChange(active ? null : tier.value)}
              aria-pressed={active}
              className="flex w-full items-center gap-3 px-1.5 py-1 text-left transition-all duration-150 hover:brightness-125 active:scale-[0.98] disabled:cursor-default disabled:opacity-40 disabled:active:scale-100"
              style={{
                background: active ? `${tier.color}12` : "transparent",
                borderLeft: `2px solid ${active ? tier.color : "transparent"}`,
              }}
            >
              <span
                className="w-[92px] shrink-0 text-[10px] font-semibold tracking-[1px]"
                style={{ color: active ? tier.color : "#7c8aa0" }}
              >
                {tier.label}
              </span>
              <span className="h-[7px] min-w-0 flex-1 bg-[#0f1a2e]">
                <span
                  className="block h-full transition-[width] duration-300"
                  style={{ width: `${share}%`, background: tier.color }}
                />
              </span>
              <span className="w-7 shrink-0 text-right font-orbitron text-[11px] font-bold text-ov-text">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {activeVerdict && (
        <button
          type="button"
          onClick={() => onVerdictChange(null)}
          className="mt-3 text-[10px] tracking-[1px] text-ov-teal transition-opacity duration-150 hover:opacity-75"
        >
          ✕ CLEAR VERDICT FILTER
        </button>
      )}
    </div>
  );
}
