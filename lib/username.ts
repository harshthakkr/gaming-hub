import { prisma } from "@/lib/prisma";

/// Strips a raw string down to the username charset. May return "" — callers
/// that need a guaranteed handle should go through ensureUsername.
export function slugifyUsername(raw: string) {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 20);
}

/// Google sign-ups arrive without a handle, so one is derived from their email
/// and made unique with a numeric suffix.
export async function ensureUsername(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true, email: true, name: true },
  });
  if (!user) return null;
  if (user.username) return user.username;

  const seed =
    slugifyUsername(user.email?.split("@")[0] ?? "") ||
    slugifyUsername(user.name ?? "") ||
    "player";
  const base = seed.length >= 3 ? seed : `${seed}player`.slice(0, 20);

  for (let attempt = 0; attempt < 12; attempt++) {
    const suffix = attempt === 0 ? "" : String(attempt + 1);
    const candidate = `${base.slice(0, 20 - suffix.length)}${suffix}`;
    try {
      const updated = await prisma.user.update({
        where: { id: userId },
        data: { username: candidate },
        select: { username: true },
      });
      return updated.username;
    } catch {
      // Unique collision — try the next suffix.
    }
  }

  // Fall back to a handle derived from the (already unique) user id.
  const fallback = `player_${userId.slice(-8).toLowerCase()}`;
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { username: fallback },
    select: { username: true },
  });
  return updated.username;
}
