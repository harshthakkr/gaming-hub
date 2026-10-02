import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const offset = request.nextUrl.searchParams?.get("offset");
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
    `fields id,name,slug,cover.url,aggregated_rating,first_release_date,genres.name,hypes,involved_companies.developer,involved_companies.publisher,involved_companies.company.name; where first_release_date >= 1735689600 & first_release_date <= 1767225599 & aggregated_rating != null & cover != null; sort aggregated_rating desc; limit 40; offset ${
      offset || 0
    };`,
    {
      headers: {
        "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
        Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    }
  );
  return NextResponse.json(res.data);
};
