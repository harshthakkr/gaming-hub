"use server";

import { signIn } from "@/auth";

export async function googleSignIn(callbackUrl: string) {
  await signIn("google", { redirectTo: callbackUrl || "/games" });
}
