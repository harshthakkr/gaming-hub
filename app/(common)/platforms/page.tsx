"use client";

import axios from "axios";
import { PlatformProps } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadMoreButton } from "@/components/LoadMoreButton";

const Platforms = () => {
  const [platforms, setPlatforms] = useState<PlatformProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/platforms");
      setPlatforms(res.data);
    };
    fetchData();
  }, []);

  const handlePagination = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/platforms?offset=${platforms.length}`
    );
    setPlatforms([...platforms, ...res.data]);
  };

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-4">Platforms</h2>
      <div className="grid grid-cols-4 gap-4">
        {platforms.map((platform: PlatformProps) => {
          return (
            <h4
              key={platform.id}
              className="p-4 text-2xl col-span-1 bg-neutral-800 rounded-2xl hover:scale-105 duration-200"
            >
              <Link href={`/platforms/${platform.slug}`}>{platform.name}</Link>
            </h4>
          );
        })}
      </div>
      <div className="flex justify-center">
        <LoadMoreButton handleClick={handlePagination} />
      </div>
    </div>
  );
};

export default Platforms;
