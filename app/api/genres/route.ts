import axios from "axios";
import { getIgdbHeaders } from "@/lib/igdb";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/genres`,
    `fields name,slug; limit 40;`,
    {
      headers: await getIgdbHeaders(),
    }
  );
  const genres = res.data;
  return NextResponse.json(genres);
};
