import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { ensureUsername } from "@/lib/username";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // Credentials sign-in requires JWT sessions; the adapter still persists
  // users and OAuth accounts so reviews can hang off a real user row.
  session: { strategy: "jwt" },
  pages: { signIn: "/register" },
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        // No hash means the account was created through Google only.
        if (!user?.passwordHash) return null;
        if (!(await bcrypt.compare(password, user.passwordHash))) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user?.id) token.id = user.id;
      if (!token.id && token.sub) token.id = token.sub;

      // Resolve the handle once and cache it on the token. Google sign-ups have
      // no username until this runs, so it is backfilled here too.
      if (token.id && (!token.username || trigger === "update")) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
          select: { username: true, name: true, image: true },
        });
        if (dbUser) {
          token.username = dbUser.username ?? (await ensureUsername(token.id));
          token.name = dbUser.name ?? token.name;
          token.picture = dbUser.image ?? token.picture;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id;
      session.user.username = token.username ?? null;
      return session;
    },
  },
});
