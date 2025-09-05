import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const headers = {
    "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
    Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  };

  const gameRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
    `fields cover.url,name; where id = 28540;`,
    { headers }
  );
  console.log(gameRes.data);
  return NextResponse.json(gameRes.data);
};
