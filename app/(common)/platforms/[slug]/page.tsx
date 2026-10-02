"use client";

import { useParams } from "next/navigation";
import { useData } from "@/utils/hooks/useData";
import { GameCardProps } from "@/utils/types";
import { GameCatalogue } from "@/components/overdrive/GameCatalogue";

export default function Platform() {
  const { slug } = useParams();
  const slugStr = String(slug || "");
  const { data, hasMore, loading, loadingMore, handlePagination } = useData<GameCardProps>(
    `platforms/${slugStr}`,
    40
  );

  return (
    <GameCatalogue
      title={slugStr.replace(/-/g, " ").toUpperCase()}
      subtitle="platform catalogue"
      games={data}
      loading={loading}
      hasMore={hasMore}
      loadingMore={loadingMore}
      onLoadMore={handlePagination}
    />
  );
}
