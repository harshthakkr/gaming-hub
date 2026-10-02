import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { USERNAME_HINT, USERNAME_PATTERN } from "@/utils/reviews";

export const POST = async (request: NextRequest) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { username, email, password } = (payload ?? {}) as Record<
    string,
    unknown
  >;

  const handle = String(username ?? "")
    .trim()
    .toLowerCase();
  const mail = String(email ?? "")
    .trim()
    .toLowerCase();
  const pass = String(password ?? "");

  if (!USERNAME_PATTERN.test(handle)) {
    return NextResponse.json({ error: USERNAME_HINT }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }
  if (pass.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email: mail }, { username: handle }] },
    select: { email: true, username: true, passwordHash: true },
  });

  if (existing?.username === handle) {
    return NextResponse.json(
      { error: "That username is taken." },
      { status: 409 }
    );
  }
  if (existing?.email === mail) {
    // The email may already exist from a Google sign-in — adding a password
    // to that account is a separate flow, so keep the message neutral.
    return NextResponse.json(
      { error: "An account with that email already exists." },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(pass, 12);

  try {
    await prisma.user.create({
      data: { username: handle, email: mail, passwordHash },
      select: { id: true },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not create that account." },
      { status: 409 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
};
