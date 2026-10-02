import axios from "axios";
import { getIgdbHeaders } from "@/lib/igdb";
import { NextRequest, NextResponse } from "next/server";
import { GameCardProps } from "@/utils/types";

const FIELDS =
  "fields id,name,slug,cover.url,aggregated_rating,first_release_date,genres.name,hypes,involved_companies.developer,involved_companies.publisher,involved_companies.company.name";

export const GET = async (request: NextRequest) => {
  const offset = request.nextUrl.searchParams.get("offset");
  const ids = request.nextUrl.searchParams.get("ids");
  const sort = request.nextUrl.searchParams.get("sort") || "rating";

  const headers = await getIgdbHeaders();

  try {
    if (ids) {
      const idList = ids
        .split(",")
        .map((id) => Number(id.trim()))
        .filter((id) => !Number.isNaN(id));
      if (idList.length === 0) return NextResponse.json([]);
      const gamesRes = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
        `${FIELDS}; where id = (${idList.join(",")}); limit ${idList.length};`,
        { headers }
      );
      return NextResponse.json(gamesRes.data as GameCardProps[]);
    }

    const sortMap: Record<string, string> = {
      rating: "aggregated_rating desc",
      date: "first_release_date desc",
      popularity: "hypes desc",
      az: "name asc",
    };

    const gamesRes = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
      `${FIELDS}; sort ${sortMap[sort] || sortMap.rating}; limit 40; offset ${
        offset || 0
      }; where cover != null & aggregated_rating != null;`,
      { headers }
    );
    return NextResponse.json(gamesRes.data as GameCardProps[]);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
};
