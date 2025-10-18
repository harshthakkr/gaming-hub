"use client";

import { Games } from "@/components/Games";
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { useData } from "@/utils/hooks/useData";
import { GameCardProps } from "@/utils/types";
import { useParams } from "next/navigation";

const Platform = () => {
  const { slug } = useParams();
  const { data, hasMore, loading, handlePagination } = useData<GameCardProps>(
    `platforms/${slug}`,
    40
  );

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Heading title={slug} />
      {data && (
        <Games
          games={data}
          handlePagination={handlePagination}
          displayMore={hasMore}
        />
      )}
    </div>
  );
};

export default Platform;
