"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { loginHref, useCollection } from "@/context/CollectionContext";
import { GameCardProps } from "@/utils/types";
import { PageContainer, PageTitle } from "@/components/overdrive/PageShell";
import { EmptyState } from "@/components/overdrive/EmptyState";
import { LibrarySkeleton } from "@/components/overdrive/Skeletons";
import { coverUrl, developerName } from "@/utils/overdrive";

export default function LibraryPage() {
  const { library, toggleLibrary, ready, signedIn } = useCollection();
  const [games, setGames] = useState<GameCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    if (library.length === 0) {
      setGames([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .get(`/api/games?ids=${library.join(",")}`)
      .then((res) => setGames(res.data))
      .finally(() => setLoading(false));
  }, [library, ready]);

  if (ready && !signedIn) {
    return (
      <PageContainer>
        <PageTitle title="LIBRARY" />
        <EmptyState
          icon="library"
          iconClassName="text-[#2dd4bf]"
          title="LOG IN TO SEE YOUR LIBRARY"
          description="Your library is saved to your account, so it follows you across devices."
          actionLabel="LOG IN"
          actionHref={loginHref("/library")}
        />
      </PageContainer>
    );
  }
  if (!ready || loading) return <LibrarySkeleton />;

  return (
    <PageContainer>
      <PageTitle title="LIBRARY" subtitle={`${library.length} in collection`} />

      {games.length === 0 ? (
        <EmptyState
          icon="library"
          iconClassName="text-[#2dd4bf]"
          title="NOTHING IN YOUR LIBRARY"
          description='Add games with "+ Library" to keep your collection in one place.'
          actionLabel="BROWSE GAMES"
          actionHref="/games"
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {games.map((game) => {
            const cover = coverUrl(game.cover);
            return (
              <Link
                key={game.id}
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
                    {developerName(game.involved_companies)} ·{" "}
                    {game.genres?.[0]?.name || "Game"}
                  </div>
                </div>
                <span className="border border-ov-teal px-2 py-0.5 text-[10px] tracking-wide text-ov-teal">
                  INSTALLED
                </span>
                {game.id && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLibrary(game.id!);
                    }}
                    className="border border-ov-rose px-3 py-1.5 text-[11px] tracking-wide text-ov-rose transition-colors duration-150 hover:bg-ov-rose hover:text-ov-bg active:scale-95"
                  >
                    REMOVE
                  </button>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}

