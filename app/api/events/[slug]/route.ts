import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/events`,
    `fields name,description,start_time,end_time,event_logo.url,games.name,games.slug,games.cover.url,live_stream_url; where slug = "${slug}";`,
    {
      headers: {
        "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
        Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    }
  );
  const events = res.data;
  return NextResponse.json(events[0]);
};
