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
    `fields name,summary,storyline,websites.url,videos.video_id,involved_companies.company.name,genres.name,dlcs,expansions,aggregated_rating,screenshots.url,cover.image_id,release_dates,similar_games.name; where id = ${id};`,
    { headers }
  );
  return NextResponse.json({
    data: gameRes.data[0],
  });
};
