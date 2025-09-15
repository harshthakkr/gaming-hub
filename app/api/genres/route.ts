import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/genres`,
    `fields name,slug; limit 40;`,
    {
      headers: {
        "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
        Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    }
  );
  const genres = res.data;
  return NextResponse.json(genres);
};
