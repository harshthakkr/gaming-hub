"use client";

import { GameCardProps } from "@/utils/types";
import { GameGridCard } from "./GameCards";
import { LoadMoreButton, NoResults } from "./EmptyState";
import { PageContainer, PageTitle } from "./PageShell";
import { CatalogueSkeleton, GameTileSkeletons } from "./Skeletons";
import { GameFilterBar, useGameFilterSort } from "./GameFilterBar";

export function GameCatalogue({
  title,
  subtitle,
  games,
  loading,
  loadingMore,
  hasMore,
  onLoadMore,
}: {
  title: string;
  subtitle?: string;
  games: GameCardProps[];
  loading?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}) {
  const { covered, sort, setSort, visible } = useGameFilterSort(games);

  if (loading) return <CatalogueSkeleton />;

  return (
    <PageContainer>
      <PageTitle title={title} subtitle={subtitle} />
      {covered.length === 0 ? (
        <NoResults description="No games found here yet. Check back later." />
      ) : (
        <>
          <GameFilterBar sort={sort} setSort={setSort} />

          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[18px]">
            {visible.map((game) => (
              <GameGridCard key={game.id || game.slug} game={game} />
            ))}
            {loadingMore && <GameTileSkeletons count={8} />}
          </div>
          {hasMore && onLoadMore && (
            <LoadMoreButton onClick={onLoadMore} loading={loadingMore} />
          )}
        </>
      )}
    </PageContainer>
  );
}
