import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    username?: string | null;
  }
}

// `next-auth/jwt` only re-exports the core module, so the augmentation has to
// land on `@auth/core/jwt` for the JWT interface to actually pick these up.
declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    username?: string | null;
  }
}
