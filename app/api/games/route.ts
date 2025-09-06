import axios from "axios";
import { NextResponse } from "next/server";
import { GameCardProps } from "@/utils/types";

export const GET = async () => {
  try {
    const gamesRes = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
      "fields name,slug,cover.url;",
      {
        headers: {
          "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
          Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      }
    );
    const data = gamesRes.data;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
};
