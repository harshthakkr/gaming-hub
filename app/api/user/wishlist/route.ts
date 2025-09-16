import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const wishlistItem = await prisma.user.update({
      where: {
        id: body.userId,
      },
      data: {
        wishlistedGames: {
          create: {
            id: body.gameId,
            name: body.gameName,
            slug: body.gameSlug,
            coverUrl: body.gameCoverUrl,
          },
        },
      },
    });

    return NextResponse.json(wishlistItem);
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 }
    );
  }
};
