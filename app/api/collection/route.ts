import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { CollectionKind } from "@/app/generated/prisma";

const KINDS: Record<string, CollectionKind> = {
  wishlist: "WISHLIST",
  library: "LIBRARY",
};

export const GET = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const items = await prisma.collectionItem.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: { kind: true, gameId: true },
  });

  return NextResponse.json({
    wishlist: items.filter((i) => i.kind === "WISHLIST").map((i) => i.gameId),
    library: items.filter((i) => i.kind === "LIBRARY").map((i) => i.gameId),
  });
};

/// Sets (rather than toggles) membership so retries and double-clicks are
/// idempotent: { kind: "wishlist" | "library", gameId, saved: boolean }.
export const POST = async (request: NextRequest) => {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const userId = session.user.id;

  const body = await request.json().catch(() => null);
  const kind = KINDS[body?.kind];
  const gameId = Number(body?.gameId);
  if (!kind || !Number.isInteger(gameId) || gameId <= 0 || typeof body?.saved !== "boolean") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.saved) {
    await prisma.collectionItem.upsert({
      where: { userId_kind_gameId: { userId, kind, gameId } },
      create: { userId, kind, gameId },
      update: {},
    });
  } else {
    await prisma.collectionItem.deleteMany({ where: { userId, kind, gameId } });
  }

  return NextResponse.json({ ok: true });
};
