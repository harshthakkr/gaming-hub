import axios from "axios";
import { NextResponse } from "next/server";

interface Game {
  id: number;
  name: string;
  cover?: number;
  release_dates: number[];
}

interface Cover {
  id: number;
  image_id: string;
  url: string;
}

export async function GET() {
  try {
    const gamesRes = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/games`,
      "fields name,cover,release_dates;",
      {
        headers: {
          "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
          Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      }
    );

    const games: Game[] = gamesRes.data;
    console.log("Games:", games);

    const coverIds = games
      .filter((game: Game) => game.cover)
      .map((game: Game) => game.cover);

    if (coverIds.length === 0) {
      return NextResponse.json(games);
    }

    const coversRes = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/covers`,
      `fields image_id,url; where id = (${coverIds.join(",")});`,
      {
        headers: {
          "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
          Authorization: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      }
    );
    const covers: Cover[] = coversRes.data;
    const gamesWithCovers = games.map((game: Game) => {
      const cover = covers.find((cover: Cover) => cover.id === game.cover);
      return {
        ...game,
        coverData: cover || null,
      };
    });

    return NextResponse.json(gamesWithCovers);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
