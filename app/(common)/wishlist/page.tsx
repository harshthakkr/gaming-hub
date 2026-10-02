"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { loginHref, useCollection } from "@/context/CollectionContext";
import { GameCardProps } from "@/utils/types";
import { PageContainer, PageTitle } from "@/components/overdrive/PageShell";
import { EmptyState } from "@/components/overdrive/EmptyState";
import { WishlistSkeleton } from "@/components/overdrive/Skeletons";
import { OvIcon } from "@/components/overdrive/OvIcon";
import { coverUrl } from "@/utils/overdrive";

export default function WishlistPage() {
  const { wishlist, toggleWish, ready, signedIn } = useCollection();
  const [games, setGames] = useState<GameCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    if (wishlist.length === 0) {
      setGames([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .get(`/api/games?ids=${wishlist.join(",")}`)
      .then((res) => setGames(res.data))
      .finally(() => setLoading(false));
  }, [wishlist, ready]);

  if (ready && !signedIn) {
    return (
      <PageContainer>
        <PageTitle title="WISH" accent="LIST" accentClassName="text-ov-rose" />
        <EmptyState
          icon="heart-filled"
          title="LOG IN TO SEE YOUR WISHLIST"
          description="Your wishlist is saved to your account, so it follows you across devices."
          actionLabel="LOG IN"
          actionHref={loginHref("/wishlist")}
        />
      </PageContainer>
    );
  }
  if (!ready || loading) return <WishlistSkeleton />;

  return (
    <PageContainer>
      <PageTitle
        title="WISH"
        accent="LIST"
        accentClassName="text-ov-rose"
        subtitle={`${wishlist.length} titles tracked`}
      />

      {games.length === 0 ? (
        <EmptyState
          icon="heart-filled"
          title="YOUR WISHLIST IS EMPTY"
          description="Tap the ♥ on any game to track price drops and release dates."
          actionLabel="BROWSE GAMES"
          actionHref="/games"
        />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[18px]">
          {games.map((game) => {
            const cover = coverUrl(game.cover);
            return (
              <Link
                key={game.id}
                href={`/games/${game.slug}`}
                className="group block"
              >
                <div className="ov-clip-card relative aspect-[3/4] overflow-hidden border border-ov-border transition-all duration-200 group-hover:-translate-y-1.5 group-hover:border-ov-teal">
                  {cover ? (
                    <Image
                      src={cover}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="220px"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-teal-700 to-slate-900" />
                  )}
                  {game.id && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWish(game.id!);
                      }}
                      className="absolute right-2 top-1.5 z-10 transition-transform duration-150 hover:scale-110 active:scale-90"
                    >
                      <OvIcon
                        name="heart"
                        className="text-[15px] text-[#f43f5e]"
                      />
                    </button>
                  )}
                </div>
                <div className="mt-2 text-[15px] font-semibold text-white transition-colors duration-150 group-hover:text-ov-teal">
                  {game.name}
                </div>
                <div className="mt-0.5 text-[11px] text-ov-teal">Track price</div>
              </Link>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
