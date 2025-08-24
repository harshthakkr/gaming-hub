import { signIn } from "@/auth";
import Image from "next/image";

export const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="flex justify-center items-center gap-4 text-white text-lg bg-primary px-8 py-4 rounded-xl"
      >
        <Image
          width="20"
          height="20"
          src="/google-logo.svg"
          alt="google logo"
        />
        Sign up with Google
      </button>
    </form>
  );
};
