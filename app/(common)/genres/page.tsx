"use client";

import axios from "axios";
import { CardProps } from "@/utils/types";
import { useEffect, useState } from "react";
import { Heading } from "@/components/Heading";
import { Card } from "@/components/Card";

const Platforms = () => {
  const [genres, setGenres] = useState<CardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/genres");
      setGenres(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Heading title="Genres" />
      <Card items={genres} route="genres" />
    </div>
  );
};

export default Platforms;
