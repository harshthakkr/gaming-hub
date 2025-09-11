"use client";

import { Games } from "@/components/Games";
import { Heading } from "@/components/Heading";
import { GameCardProps } from "@/utils/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Genre = () => {
  const params = useParams();
  const slug = params.slug;
  const [games, setGames] = useState<GameCardProps[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/genres/${slug}`);
      setGames(res.data);
      setHasMore(res.data.length === 40);
    };
    fetchData();
  }, []);

  const handlePagination = async () => {
    const res = await axios.get(`/api/genres/${slug}?offset=${games.length}`);
    setGames([...games, ...res.data]);
    setHasMore(res.data.length === 40);
  };
  return (
    <div>
      <Heading title={slug} />
      <Games
        games={games}
        handlePagination={handlePagination}
        displayMore={hasMore}
      />
    </div>
  );
};

export default Genre;
