import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/// Toggles the viewer's like and returns the settled state so the client can
/// reconcile its optimistic update.
export const POST = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Sign in to like." }, { status: 401 });
  }

  const { id: reviewId } = await params;
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    select: { id: true },
  });
  if (!review) {
    return NextResponse.json({ error: "Review not found." }, { status: 404 });
  }

  const existing = await prisma.reviewLike.findUnique({
    where: { reviewId_userId: { reviewId, userId } },
    select: { id: true },
  });

  if (existing) {
    await prisma.reviewLike.delete({ where: { id: existing.id } });
  } else {
    await prisma.reviewLike.create({ data: { reviewId, userId } });
  }

  const likeCount = await prisma.reviewLike.count({ where: { reviewId } });
  return NextResponse.json({ liked: !existing, likeCount });
};
