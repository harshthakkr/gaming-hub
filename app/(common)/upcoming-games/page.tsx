"use client";

import { useData } from "@/utils/hooks/useData";
import { GameCardProps } from "@/utils/types";
import { GameCatalogue } from "@/components/overdrive/GameCatalogue";

export default function UpcomingGames() {
  const { data, hasMore, loading, loadingMore, handlePagination } = useData<GameCardProps>(
    "upcoming-games",
    40
  );

  return (
    <GameCatalogue
      title="UPCOMING"
      subtitle="on the horizon"
      games={data}
      loading={loading}
      hasMore={hasMore}
      loadingMore={loadingMore}
      onLoadMore={handlePagination}
    />
  );
}
