"use client";

import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { CardProps } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Developers = () => {
  const [developers, setDevelopers] = useState<CardProps[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/developers`);
      setDevelopers(res.data);
      setHasMore(res.data.length === 40);
    };
    fetchData();
  }, []);

  const handlePagination = async () => {
    const res = await axios.get(`/api/developers?offset=${developers.length}`);
    setDevelopers([...developers, ...res.data]);
    setHasMore(res.data.length === 40);
  };
  return (
    <div>
      <Heading title="Developers" />
      <Card items={developers} route="developers" />
      <div className="flex justify-center">
        {hasMore && <LoadMoreButton handleClick={handlePagination} />}
      </div>
    </div>
  );
};

export default Developers;
