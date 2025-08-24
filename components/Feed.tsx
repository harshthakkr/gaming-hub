"use client";

import axios from "axios";
import { useEffect } from "react";

export const Feed = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/games");
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchData();
  }, []);
  return <div>Feed</div>;
};
