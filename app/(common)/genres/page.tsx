"use client";

import { CardProps } from "@/utils/types";
import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";
import { Loader } from "@/components/Loader";
import { useData } from "@/utils/hooks/useData";

const Platforms = () => {
  const { data, loading } = useData<CardProps>("genres");

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Heading title="Genres" />
      <Card items={data} route="genres" />
    </div>
  );
};

export default Platforms;
