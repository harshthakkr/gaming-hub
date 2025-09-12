import { GameCardProps } from "@/utils/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const offset = request.nextUrl.searchParams?.get("offset");
  console.log(Math.floor(Date.now() / 1000));
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
    `fields name,slug,cover.url,first_release_date,release_dates.human; where first_release_date >= ${Math.floor(
      Date.now() / 1000
    )} | first_release_date = null; sort first_release_date asc; limit 40; offset ${
      offset || 0
    };`,
    {
      headers: {
        "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
        Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    }
  );
  const games: GameCardProps[] = res.data;
  return NextResponse.json(games);
};
