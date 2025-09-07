import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  const platformRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/platforms`,
    `fields name,slug; sort generation desc; limit 30;`,
    {
      headers: {
        "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
        Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    }
  );
  const res = platformRes.data;
  return NextResponse.json(res);
};
