import axios from "axios";
import { NextResponse } from "next/server";

interface Game {
  id: number;
  name: string;
  cover: {
    url: string;
  };
  release_dates: number[];
}

export const GET = async () => {
  try {
    const gamesRes = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
      "fields name,slug,cover.url,release_dates;",
      {
        headers: {
          "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
          Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      }
    );
    return NextResponse.json({ data: gamesRes.data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
};
