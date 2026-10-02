"use client";

import { useCollection } from "@/context/CollectionContext";
import { GameCardProps } from "@/utils/types";
import {
  coverUrl,
  developerName,
  formatYear,
  gameTag,
} from "@/utils/overdrive";
import Image from "next/image";
import Link from "next/link";
import { OvIcon } from "./OvIcon";

export function GameGridCard({ game }: { game: GameCardProps }) {
  const { isWished, toggleWish } = useCollection();
  const cover = coverUrl(game.cover);
  const wished = game.id ? isWished(game.id) : false;
  const tag = gameTag(game.genres, game.hypes);

  return (
    <Link href={`/games/${game.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden border border-ov-border bg-ov-panel ov-clip-card transition-all duration-200 group-hover:-translate-y-1.5 group-hover:border-ov-teal">
        {cover ? (
          <Image
            src={cover}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="220px"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-teal-700 to-slate-900" />
        )}
        {tag && (
          <span className="absolute left-2 top-2 bg-ov-teal px-1.5 py-0.5 text-[9px] tracking-wide text-ov-bg">
            {tag}
          </span>
        )}
        {game.id && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWish(game.id!);
            }}
            className="absolute right-2 top-1.5 z-10 transition-transform duration-150 hover:scale-110 active:scale-90"
            aria-label="Toggle wishlist"
          >
            <OvIcon
              name="heart"
              className="text-[15px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] transition-colors duration-150"
              style={{ color: wished ? "#f43f5e" : "rgba(255,255,255,.7)" }}
            />
          </button>
        )}
      </div>
      <div className="mt-2 text-[15px] font-semibold text-white transition-colors duration-150 group-hover:text-ov-teal">
        {game.name}
      </div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wide text-ov-muted">
        {formatYear(game.first_release_date)}
      </div>
    </Link>
  );
}

export function GameListRow({ game }: { game: GameCardProps }) {
  const { isWished, isInLibrary, toggleWish, toggleLibrary } = useCollection();
  const cover = coverUrl(game.cover);
  const wished = game.id ? isWished(game.id) : false;
  const inLib = game.id ? isInLibrary(game.id) : false;
  const dev = developerName(game.involved_companies);
  const tag = gameTag(game.genres, game.hypes);

  return (
    <Link
      href={`/games/${game.slug}`}
      className="group ov-clip-row flex items-center gap-4 border border-ov-border bg-ov-panel px-4 py-3 transition-colors duration-150 hover:border-ov-teal"
    >
      {cover ? (
        <Image
          src={cover}
          alt=""
          width={46}
          height={60}
          className="h-[60px] w-[46px] shrink-0 border border-ov-border object-cover"
        />
      ) : (
        <div className="h-[60px] w-[46px] shrink-0 bg-gradient-to-br from-teal-700 to-slate-900" />
      )}
      <div className="min-w-0 flex-1">
        <div className="text-[17px] font-semibold text-white transition-colors duration-150 group-hover:text-ov-teal">
          {game.name}
        </div>
        <div className="mt-1 text-[11px] uppercase tracking-wide text-ov-muted">
          {dev} · {formatYear(game.first_release_date)}
        </div>
      </div>
      {tag && (
        <span className="bg-ov-teal px-2 py-0.5 text-[9px] tracking-wide text-ov-bg">
          {tag}
        </span>
      )}
      {game.id && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWish(game.id!);
            }}
            className="transition-transform duration-150 hover:scale-110 active:scale-90"
            aria-label="Toggle wishlist"
          >
            <OvIcon
              name="heart"
              className="text-[18px] transition-colors duration-150"
              style={{ color: wished ? "#f43f5e" : "rgba(255,255,255,.7)" }}
            />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleLibrary(game.id!);
            }}
            className="bg-transparent px-3 py-[7px] text-[11px] transition-all duration-150 hover:brightness-125 active:scale-95"
            style={{
              color: inLib ? "#2dd4bf" : "#5b6b82",
              border: `1px solid ${inLib ? "#2dd4bf" : "#5b6b82"}`,
              letterSpacing: "1px",
            }}
          >
            {inLib ? "✓ IN LIB" : "+ LIB"}
          </button>
        </>
      )}
    </Link>
  );
}
