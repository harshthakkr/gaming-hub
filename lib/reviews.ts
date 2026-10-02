import { prisma } from "@/lib/prisma";
import {
  MAX_COMMENT_CHARS,
  MAX_REVIEW_WORDS,
  countWords,
  type Verdict,
} from "@/utils/reviews";
import type {
  ReviewAuthor,
  ReviewComment,
  ReviewProps,
  VerdictCounts,
} from "@/utils/types";

const authorSelect = {
  id: true,
  username: true,
  name: true,
  image: true,
} as const;

type RawAuthor = { id: string; username: string | null; name: string | null; image: string | null };

type RawReview = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  gameId: number;
  gameSlug: string;
  gameName: string;
  body: string;
  wordCount: number;
  verdict: string;
  hasSpoilers: boolean;
  authorId: string;
  author: RawAuthor;
  _count: { likes: number; comments: number };
  likes?: { id: string }[];
};

type RawComment = {
  id: string;
  createdAt: Date;
  body: string;
  reviewId: string;
  parentId: string | null;
  authorId: string;
  author: RawAuthor;
  _count: { likes: number };
  likes?: { id: string }[];
  replies?: RawComment[];
};

function toAuthor(author: RawAuthor): ReviewAuthor {
  return {
    id: author.id,
    username: author.username,
    name: author.name,
    image: author.image,
  };
}

/// Prisma's `include` needs the viewer-scoped like probe added conditionally —
/// an absent viewer must not pull every like row.
export function reviewInclude(viewerId?: string | null) {
  return {
    author: { select: authorSelect },
    _count: { select: { likes: true, comments: true } },
    ...(viewerId
      ? { likes: { where: { userId: viewerId }, select: { id: true } } }
      : {}),
  };
}

export function commentInclude(viewerId?: string | null) {
  return {
    author: { select: authorSelect },
    _count: { select: { likes: true } },
    ...(viewerId
      ? { likes: { where: { userId: viewerId }, select: { id: true } } }
      : {}),
  };
}

export function serializeReview(
  review: RawReview,
  viewerId?: string | null
): ReviewProps {
  return {
    id: review.id,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
    gameId: review.gameId,
    gameSlug: review.gameSlug,
    gameName: review.gameName,
    body: review.body,
    wordCount: review.wordCount,
    verdict: review.verdict as Verdict,
    hasSpoilers: review.hasSpoilers,
    author: toAuthor(review.author),
    likeCount: review._count.likes,
    commentCount: review._count.comments,
    likedByMe: (review.likes?.length ?? 0) > 0,
    isMine: viewerId === review.authorId,
  };
}

export function serializeComment(
  comment: RawComment,
  viewerId?: string | null
): ReviewComment {
  return {
    id: comment.id,
    createdAt: comment.createdAt.toISOString(),
    body: comment.body,
    reviewId: comment.reviewId,
    parentId: comment.parentId,
    author: toAuthor(comment.author),
    likeCount: comment._count.likes,
    likedByMe: (comment.likes?.length ?? 0) > 0,
    isMine: viewerId === comment.authorId,
    replies: (comment.replies ?? []).map((reply) =>
      serializeComment(reply, viewerId)
    ),
  };
}

/// Verdict distribution for a game — always computed over every review, so the
/// meter stays stable while the reader toggles filters.
export async function verdictCounts(gameId: number): Promise<VerdictCounts> {
  const groups = await prisma.review.groupBy({
    by: ["verdict"],
    where: { gameId },
    _count: { _all: true },
  });

  const counts: VerdictCounts = {
    SKIP: 0,
    TIMEPASS: 0,
    WORTH_IT: 0,
    GO_FOR_IT: 0,
    MASTERPIECE: 0,
  };
  for (const group of groups) {
    counts[group.verdict as Verdict] = group._count._all;
  }
  return counts;
}

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export function validateReviewBody(raw: unknown): ValidationResult<{
  body: string;
  wordCount: number;
}> {
  if (typeof raw !== "string") {
    return { ok: false, error: "Review body is required." };
  }
  const body = raw.trim();
  if (body.length < 10) {
    return { ok: false, error: "A review needs at least a few words." };
  }
  const wordCount = countWords(body);
  if (wordCount > MAX_REVIEW_WORDS) {
    return {
      ok: false,
      error: `Reviews are capped at ${MAX_REVIEW_WORDS} words — yours is ${wordCount}.`,
    };
  }
  return { ok: true, value: { body, wordCount } };
}

export function validateCommentBody(raw: unknown): ValidationResult<string> {
  if (typeof raw !== "string") {
    return { ok: false, error: "Comment body is required." };
  }
  const body = raw.trim();
  if (!body) return { ok: false, error: "Comment cannot be empty." };
  if (body.length > MAX_COMMENT_CHARS) {
    return {
      ok: false,
      error: `Comments are capped at ${MAX_COMMENT_CHARS} characters.`,
    };
  }
  return { ok: true, value: body };
}
