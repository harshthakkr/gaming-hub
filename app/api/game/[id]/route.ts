import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const headers = {
    "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
    Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  };
  const { id } = await params;

  const gameRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
    `fields name,summary,storyline,websites.url,videos.video_id,involved_companies.developer,involved_companies.publisher,involved_companies.company.name,age_ratings.rating_category,genres.name,dlcs,expansions,aggregated_rating,screenshots.url,screenshots.height,screenshots.width,cover.url,release_dates.human,platforms.name,similar_games.name,similar_games.cover.url,similar_games.slug; where id = ${id};`,
    { headers }
  );
  const res = gameRes.data[0];
  return NextResponse.json(res);
};
