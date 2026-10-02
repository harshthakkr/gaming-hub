import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;
  const offset = request.nextUrl.searchParams?.get("offset");
  const platformRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
    `fields id,name,slug,cover.url,aggregated_rating,first_release_date,genres.name,hypes,involved_companies.developer,involved_companies.publisher,involved_companies.company.name; where platforms.slug = "${slug}" & cover != null; sort aggregated_rating desc; limit 40; offset ${
      offset || 0
    };`,
    {
      headers: {
        "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
        Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    }
  );
  return NextResponse.json(platformRes.data);
};
