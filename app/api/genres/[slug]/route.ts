import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;
  const offset = request.nextUrl.searchParams?.get("offset");
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
    `fields name,slug,cover.url; sort aggregated_rating desc; where genres.slug = "${slug}"; limit 40; offset ${
      offset || 0
    };`,
    {
      headers: {
        "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
        Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    }
  );
  const games = res.data;
  return NextResponse.json(games);
};
