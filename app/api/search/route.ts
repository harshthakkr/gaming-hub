import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const search = request.nextUrl.searchParams.get("q") || "";
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
      `fields id,name,slug,cover.url,aggregated_rating,first_release_date,genres.name,hypes,involved_companies.developer,involved_companies.publisher,involved_companies.company.name; search "${search}"; limit 40;`,
      {
        headers: {
          "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
          Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      }
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search games" },
      { status: 500 }
    );
  }
};
