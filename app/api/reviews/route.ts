import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@/app/generated/prisma";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  reviewInclude,
  serializeReview,
  validateReviewBody,
  verdictCounts,
} from "@/lib/reviews";
import {
  REVIEWS_PER_PAGE,
  consensusVerdict,
  isReviewSort,
  isVerdict,
} from "@/utils/reviews";
import type { ReviewsResponse } from "@/utils/types";

function orderFor(sort: string): Prisma.ReviewOrderByWithRelationInput[] {
  if (sort === "liked") {
    return [{ likes: { _count: "desc" } }, { createdAt: "desc" }];
  }
  if (sort === "discussed") {
    return [{ comments: { _count: "desc" } }, { createdAt: "desc" }];
  }
  return [{ createdAt: "desc" }];
}

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const gameId = Number(params.get("gameId"));
  if (!Number.isInteger(gameId) || gameId <= 0) {
    return NextResponse.json({ error: "A gameId is required." }, { status: 400 });
  }

  const sortParam = params.get("sort") ?? "latest";
  const sort = isReviewSort(sortParam) ? sortParam : "latest";
  const hideSpoilers = params.get("spoilers") === "hide";
  const verdictParam = params.get("verdict");
  const verdict = isVerdict(verdictParam) ? verdictParam : undefined;
  const page = Math.max(1, Number(params.get("page")) || 1);

  const session = await auth();
  const viewerId = session?.user?.id ?? null;

  const where = {
    gameId,
    ...(hideSpoilers ? { hasSpoilers: false } : {}),
    ...(verdict ? { verdict } : {}),
  };

  try {
    const [total, rows, counts, spoilerCount, mine] = await Promise.all([
      prisma.review.count({ where }),
      prisma.review.findMany({
        where,
        orderBy: orderFor(sort),
        skip: (page - 1) * REVIEWS_PER_PAGE,
        take: REVIEWS_PER_PAGE,
        include: reviewInclude(viewerId),
      }),
      verdictCounts(gameId),
      prisma.review.count({ where: { gameId, hasSpoilers: true } }),
      viewerId
        ? prisma.review.findUnique({
            where: { authorId_gameId: { authorId: viewerId, gameId } },
            include: reviewInclude(viewerId),
          })
        : null,
    ]);

    const statsTotal = Object.values(counts).reduce((a, b) => a + b, 0);

    const body: ReviewsResponse = {
      reviews: rows.map((row) => serializeReview(row, viewerId)),
      page,
      pages: Math.max(1, Math.ceil(total / REVIEWS_PER_PAGE)),
      total,
      stats: {
        total: statsTotal,
        counts,
        consensus: consensusVerdict(counts),
        spoilerCount,
      },
      myReview: mine ? serializeReview(mine, viewerId) : null,
    };
    return NextResponse.json(body);
  } catch (error) {
    console.error("Failed to load reviews", error);
    return NextResponse.json(
      { error: "Could not load reviews." },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  const session = await auth();
  const authorId = session?.user?.id;
  if (!authorId) {
    return NextResponse.json({ error: "Sign in to review." }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const {
    gameId: rawGameId,
    gameSlug,
    gameName,
    body: rawBody,
    verdict,
    hasSpoilers,
  } = (payload ?? {}) as Record<string, unknown>;

  const gameId = Number(rawGameId);
  if (!Number.isInteger(gameId) || gameId <= 0) {
    return NextResponse.json({ error: "A gameId is required." }, { status: 400 });
  }
  if (!isVerdict(verdict)) {
    return NextResponse.json({ error: "Pick a verdict." }, { status: 400 });
  }
  const slug = String(gameSlug ?? "").trim();
  const name = String(gameName ?? "").trim();
  if (!slug || !name) {
    return NextResponse.json(
      { error: "Game details are missing." },
      { status: 400 }
    );
  }

  const validated = validateReviewBody(rawBody);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }
  const { body, wordCount } = validated.value;

  try {
    // One review per player per game — re-posting edits the existing row.
    const review = await prisma.review.upsert({
      where: { authorId_gameId: { authorId, gameId } },
      create: {
        authorId,
        gameId,
        gameSlug: slug,
        gameName: name,
        body,
        wordCount,
        verdict,
        hasSpoilers: Boolean(hasSpoilers),
      },
      update: {
        body,
        wordCount,
        verdict,
        hasSpoilers: Boolean(hasSpoilers),
      },
      include: reviewInclude(authorId),
    });

    return NextResponse.json(serializeReview(review, authorId), { status: 201 });
  } catch (error) {
    console.error("Failed to save review", error);
    return NextResponse.json(
      { error: "Could not save that review." },
      { status: 500 }
    );
  }
};
