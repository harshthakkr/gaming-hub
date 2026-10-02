import axios from "axios";
import { getIgdbHeaders } from "@/lib/igdb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const offset = request.nextUrl.searchParams?.get("offset");
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/events`,
    `fields name,slug,event_logo.url,description,start_time,end_time; sort start_time desc; limit 20; offset ${
      offset || 0
    };`,
    {
      headers: await getIgdbHeaders(),
    }
  );
  return NextResponse.json(res.data);
};
