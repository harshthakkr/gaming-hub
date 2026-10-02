"use client";

import { useData } from "@/utils/hooks/useData";
import { GameCardProps } from "@/utils/types";
import { GameCatalogue } from "@/components/overdrive/GameCatalogue";

export default function Year2025() {
  const { data, hasMore, loading, loadingMore, handlePagination } = useData<GameCardProps>(
    "2025",
    40
  );

  return (
    <GameCatalogue
      title="2025"
      subtitle="this year's releases"
      games={data}
      loading={loading}
      hasMore={hasMore}
      loadingMore={loadingMore}
      onLoadMore={handlePagination}
    />
  );
}
