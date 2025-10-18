"use client";

import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { useData } from "@/utils/hooks/useData";
import { CardProps } from "@/utils/types";

const Developers = () => {
  const { data, hasMore, loading, handlePagination } = useData<CardProps>(
    "developers",
    40
  );

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Heading title="Developers" />
      <Card items={data} route="developers" />
      <div className="flex justify-center">
        {hasMore && <LoadMoreButton handleClick={handlePagination} />}
      </div>
    </div>
  );
};

export default Developers;
