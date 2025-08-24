"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();

  return (
    <button
      type="submit"
      onClick={async () => {
        await signOut({ redirect: false });
        router.push("/register");
      }}
      className="rounded-lg cursor-pointer"
    >
      Sign out
    </button>
  );
};

export default SignOut;
