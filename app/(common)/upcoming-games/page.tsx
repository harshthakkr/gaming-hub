"use client";

import { Games } from "@/components/Games";
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { useData } from "@/utils/hooks/useData";
import { GameCardProps } from "@/utils/types";

const UpcomingGames = () => {
  const { data, hasMore, loading, handlePagination } = useData<GameCardProps>(
    "upcoming-games",
    40
  );

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Heading title="Upcoming Games" />
      <Games
        games={data}
        handlePagination={handlePagination}
        displayMore={hasMore}
      />
    </div>
  );
};

export default UpcomingGames;
