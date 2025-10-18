"use client";

import { CardProps } from "@/utils/types";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";
import { Loader } from "@/components/Loader";
import { useData } from "@/utils/hooks/useData";

const Platforms = () => {
  const { data, hasMore, loading, handlePagination } =
    useData<CardProps>("platforms");

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Heading title="Platforms" />
      <Card items={data} route="platforms" />
      <div className="flex justify-center">
        {hasMore && <LoadMoreButton handleClick={handlePagination} />}
      </div>
    </div>
  );
};

export default Platforms;
