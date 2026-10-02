import axios from "axios";
import { getIgdbHeaders } from "@/lib/igdb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/companies`,
    `fields name,description,developed.id,developed.name,developed.slug,developed.cover.url,developed.aggregated_rating,developed.first_release_date,developed.genres.name,developed.hypes,websites.url; where slug = "${slug}";`,
    {
      headers: await getIgdbHeaders(),
    }
  );
  return NextResponse.json(res.data[0]);
};
