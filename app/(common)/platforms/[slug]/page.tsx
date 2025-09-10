"use client";

import { Games } from "@/components/Games";
import { Heading } from "@/components/Heading";
import { GameCardProps } from "@/utils/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Platform = () => {
  const params = useParams();
  const slug = params.slug;
  const [games, setGames] = useState<GameCardProps[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/platforms/${slug}`);
      setGames(res.data);
      setHasMore(res.data.length === 40);
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const handlePagination = async () => {
    const res = await axios.get(
      `/api/platforms/${slug}?offset=${games.length}`
    );
    setGames([...games, ...res.data]);
    setHasMore(res.data.length === 40);
  };

  return (
    <div>
      <Heading title={slug} />
      {games && (
        <Games
          games={games}
          handlePagination={handlePagination}
          displayMore={hasMore}
        />
      )}
    </div>
  );
};

export default Platform;
