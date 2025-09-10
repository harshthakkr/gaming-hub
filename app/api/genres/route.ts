import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const offset = request.nextUrl.searchParams?.get("offset");
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/genres`,
    `fields name,slug; limit 20; offset ${offset || 0};`,
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
