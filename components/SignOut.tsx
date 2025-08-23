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
      className="border border-secondary px-3 py-1 rounded-lg"
    >
      Sign out
    </button>
  );
};

export default SignOut;
