import axios from "axios";
import { getIgdbHeaders } from "@/lib/igdb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;
  const offset = request.nextUrl.searchParams?.get("offset");
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
    `fields id,name,slug,cover.url,aggregated_rating,first_release_date,genres.name,hypes,involved_companies.developer,involved_companies.publisher,involved_companies.company.name; sort aggregated_rating desc; where genres.slug = "${slug}" & cover != null; limit 40; offset ${
      offset || 0
    };`,
    {
      headers: await getIgdbHeaders(),
    }
  );
  return NextResponse.json(res.data);
};
