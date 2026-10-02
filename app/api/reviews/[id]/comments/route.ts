import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  commentInclude,
  serializeComment,
  validateCommentBody,
} from "@/lib/reviews";

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id: reviewId } = await params;
  const session = await auth();
  const viewerId = session?.user?.id ?? null;

  // Threads are one level deep, so top-level comments plus their replies is
  // the whole tree — no recursion needed.
  const comments = await prisma.reviewComment.findMany({
    where: { reviewId, parentId: null },
    orderBy: { createdAt: "asc" },
    include: {
      ...commentInclude(viewerId),
      replies: {
        orderBy: { createdAt: "asc" },
        include: commentInclude(viewerId),
      },
    },
  });

  return NextResponse.json({
    comments: comments.map((comment) => serializeComment(comment, viewerId)),
  });
};

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = await auth();
  const authorId = session?.user?.id;
  if (!authorId) {
    return NextResponse.json({ error: "Sign in to comment." }, { status: 401 });
  }

  const { id: reviewId } = await params;
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { body: rawBody, parentId: rawParentId } = (payload ?? {}) as Record<
    string,
    unknown
  >;

  const validated = validateCommentBody(rawBody);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    select: { id: true },
  });
  if (!review) {
    return NextResponse.json({ error: "Review not found." }, { status: 404 });
  }

  let parentId: string | null = null;
  if (rawParentId) {
    const parent = await prisma.reviewComment.findUnique({
      where: { id: String(rawParentId) },
      select: { id: true, reviewId: true, parentId: true },
    });
    if (!parent || parent.reviewId !== reviewId) {
      return NextResponse.json(
        { error: "That comment is not on this review." },
        { status: 400 }
      );
    }
    // Depth cap: a reply to a reply is re-parented onto the top-level comment.
    parentId = parent.parentId ?? parent.id;
  }

  const comment = await prisma.reviewComment.create({
    data: { reviewId, authorId, body: validated.value, parentId },
    include: {
      ...commentInclude(authorId),
      replies: {
        orderBy: { createdAt: "asc" },
        include: commentInclude(authorId),
      },
    },
  });

  return NextResponse.json(serializeComment(comment, authorId), {
    status: 201,
  });
};
