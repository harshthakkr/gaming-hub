import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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
  const comment = await prisma.reviewComment.findUnique({
    where: { id },
    select: { authorId: true, review: { select: { authorId: true } } },
  });
  if (!comment) {
    return NextResponse.json({ error: "Comment not found." }, { status: 404 });
  }

  // The comment's author, or the review's author moderating their own thread.
  const allowed =
    comment.authorId === viewerId || comment.review.authorId === viewerId;
  if (!allowed) {
    return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  }

  // Replies and likes cascade with the comment row.
  await prisma.reviewComment.delete({ where: { id } });
  return NextResponse.json({ ok: true });
};
