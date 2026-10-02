import axios from "axios";
import { getIgdbHeaders } from "@/lib/igdb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/events`,
    `fields name,description,start_time,end_time,event_logo.url,games.id,games.name,games.slug,games.cover.url,games.aggregated_rating,games.first_release_date,games.genres.name,games.hypes,live_stream_url; where slug = "${slug}";`,
    {
      headers: await getIgdbHeaders(),
    }
  );
  return NextResponse.json(res.data[0]);
};
