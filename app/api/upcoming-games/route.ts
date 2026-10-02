import { GameCardProps } from "@/utils/types";
import axios from "axios";
import { getIgdbHeaders } from "@/lib/igdb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const offset = request.nextUrl.searchParams?.get("offset");
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
    `fields id,name,slug,cover.url,aggregated_rating,first_release_date,genres.name,hypes,involved_companies.developer,involved_companies.publisher,involved_companies.company.name; where first_release_date >= ${Math.floor(
      Date.now() / 1000
    )} & cover != null; sort first_release_date asc; limit 40; offset ${
      offset || 0
    };`,
    {
      headers: await getIgdbHeaders(),
    }
  );
  const games: GameCardProps[] = res.data;
  return NextResponse.json(games);
};
