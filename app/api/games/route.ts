import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
      "fields name;",
      {
        headers: {
          "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
          Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      }
    );
    const data = res.data;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
