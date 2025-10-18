"use client";

import { Games } from "@/components/Games";
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { useData } from "@/utils/hooks/useData";
import { GameCardProps } from "@/utils/types";

const Year2025 = () => {
  const { data, hasMore, loading, handlePagination } = useData<GameCardProps>(
    "2025",
    40
  );

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Heading title="2025" />
      <Games
        games={data}
        handlePagination={handlePagination}
        displayMore={hasMore}
      />
    </div>
  );
};

export default Year2025;
