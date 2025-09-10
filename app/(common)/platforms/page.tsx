"use client";

import axios from "axios";
import { CardProps } from "@/utils/types";
import { useEffect, useState } from "react";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";

const Platforms = () => {
  const [platforms, setPlatforms] = useState<CardProps[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/platforms");
      setPlatforms(res.data);
      setHasMore(res.data.length === 20);
    };
    fetchData();
  }, []);

  const handlePagination = async () => {
    const res = await axios.get(`/api/platforms?offset=${platforms.length}`);
    setPlatforms([...platforms, ...res.data]);
    setHasMore(res.data.length === 20);
  };

  return (
    <div>
      <Heading title="Platforms" />
      <Card items={platforms} route="platforms" />
      <div className="flex justify-center">
        {hasMore && <LoadMoreButton handleClick={handlePagination} />}
      </div>
    </div>
  );
};

export default Platforms;
