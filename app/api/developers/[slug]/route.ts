import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/companies`,
    `fields name,description,developed.name,developed.slug,developed.cover.url,websites.url; where slug = "${slug}";`,
    {
      headers: {
        "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
        Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    }
  );
  const developer = res.data[0];
  return NextResponse.json(developer);
};
