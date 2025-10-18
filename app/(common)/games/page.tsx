"use client";

import { Games } from "@/components/Games";
import { GameCardProps } from "@/utils/types";
import { Loader } from "@/components/Loader";
import { useData } from "@/utils/hooks/useData";

const AllGames = () => {
  const { data, hasMore, loading, handlePagination } = useData<GameCardProps>(
    "games",
    40
  );

  return loading ? (
    <Loader />
  ) : (
    <Games
      games={data}
      handlePagination={handlePagination}
      displayMore={hasMore}
    />
  );
};

export default AllGames;
