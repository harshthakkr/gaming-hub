import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { reviewInclude, serializeReview, validateReviewBody } from "@/lib/reviews";
import { isVerdict } from "@/utils/reviews";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = await auth();
  const viewerId = session?.user?.id;
  if (!viewerId) {
    return NextResponse.json({ error: "Sign in to edit." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.review.findUnique({
    where: { id },
    select: { authorId: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Review not found." }, { status: 404 });
  }
  if (existing.authorId !== viewerId) {
    return NextResponse.json({ error: "Not your review." }, { status: 403 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const {
    body: rawBody,
    verdict,
    hasSpoilers,
  } = (payload ?? {}) as Record<string, unknown>;

  if (!isVerdict(verdict)) {
    return NextResponse.json({ error: "Pick a verdict." }, { status: 400 });
  }
  const validated = validateReviewBody(rawBody);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const review = await prisma.review.update({
    where: { id },
    data: {
      body: validated.value.body,
      wordCount: validated.value.wordCount,
      verdict,
      hasSpoilers: Boolean(hasSpoilers),
    },
    include: reviewInclude(viewerId),
  });

  return NextResponse.json(serializeReview(review, viewerId));
};

export const DELETE = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = await auth();
  const viewerId = session?.user?.id;
  if (!viewerId) {
    return NextResponse.json({ error: "Sign in to delete." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.review.findUnique({
    where: { id },
    select: { authorId: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Review not found." }, { status: 404 });
  }
  if (existing.authorId !== viewerId) {
    return NextResponse.json({ error: "Not your review." }, { status: 403 });
  }

  // Likes and comments cascade with the review row.
  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ ok: true });
};
