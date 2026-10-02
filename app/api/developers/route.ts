import axios from "axios";
import { getIgdbHeaders } from "@/lib/igdb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const offset = request.nextUrl.searchParams?.get("offset");
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/companies`,
    `fields name,slug; sort start_date desc; limit 40; offset ${offset || 0};`,
    {
      headers: await getIgdbHeaders(),
    }
  );
  const developers = res.data;
  return NextResponse.json(developers);
};
