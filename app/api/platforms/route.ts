import axios from "axios";
import { getIgdbHeaders } from "@/lib/igdb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const offset = request.nextUrl.searchParams?.get("offset");
  const platformRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/platforms`,
    `fields name,slug,platform_family.name; sort generation desc; limit 40; offset ${offset || 0};`,
    {
      headers: await getIgdbHeaders(),
    }
  );
  const res = platformRes.data;
  return NextResponse.json(res);
};
