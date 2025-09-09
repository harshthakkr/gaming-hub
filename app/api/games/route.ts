import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { GameCardProps } from "@/utils/types";

export const GET = async (request: NextRequest) => {
  const offset = request.nextUrl.searchParams?.get("offset");
  try {
    const gamesRes = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
      `fields name,slug,cover.url; limit 40; offset ${offset || 0};`,
      {
        headers: {
          "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
          Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      }
    );
    const data: GameCardProps[] = gamesRes.data;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
};
