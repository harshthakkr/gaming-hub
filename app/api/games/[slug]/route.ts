import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const headers = {
    "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
    Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  };
  const { slug } = await params;

  const gameRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
    `fields name,summary,videos.video_id,involved_companies.developer,involved_companies.publisher,involved_companies.company.name,genres.name,aggregated_rating,screenshots.url,screenshots.height,screenshots.width,cover.url,release_dates.human,platforms.name,similar_games.name,similar_games.cover.url,similar_games.slug; where slug = "${slug}";`,
    { headers }
  );
  const res = gameRes.data[0];
  return NextResponse.json(res);
};
