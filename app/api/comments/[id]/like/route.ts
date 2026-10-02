import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const POST = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Sign in to like." }, { status: 401 });
  }

  const { id: commentId } = await params;
  const comment = await prisma.reviewComment.findUnique({
    where: { id: commentId },
    select: { id: true },
  });
  if (!comment) {
    return NextResponse.json({ error: "Comment not found." }, { status: 404 });
  }

  const existing = await prisma.commentLike.findUnique({
    where: { commentId_userId: { commentId, userId } },
    select: { id: true },
  });

  if (existing) {
    await prisma.commentLike.delete({ where: { id: existing.id } });
  } else {
    await prisma.commentLike.create({ data: { commentId, userId } });
  }

  const likeCount = await prisma.commentLike.count({ where: { commentId } });
  return NextResponse.json({ liked: !existing, likeCount });
};
