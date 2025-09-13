import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/events`,
    `fields name,slug,description,start_time,end_time,event_logo.url,event_networks.url,games.name,live_stream_url,videos.name,videos.video_id; sort start_time desc; limit 20;`,
    {
      headers: {
        "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
        Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    }
  );
  const events = res.data;
  return NextResponse.json(events);
};
