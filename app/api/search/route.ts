import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const search = request.nextUrl.searchParams.get("q") || "";
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
      `fields name,slug,cover.url; search "${search}";`,
      {
        headers: {
          "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
          Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      }
    );
    const games = res.data;
    return NextResponse.json(games);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search games" },
      { status: 500 }
    );
  }
};
