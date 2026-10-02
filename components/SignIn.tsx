import { googleSignIn } from "@/app/actions/auth";
import Image from "next/image";

export const SignIn = ({
  label = "SIGN UP WITH GOOGLE",
  callbackUrl = "/games",
}: {
  label?: string;
  callbackUrl?: string;
}) => {
  return (
    <form action={googleSignIn.bind(null, callbackUrl)}>
      <button
        type="submit"
        className="ov-clip-md flex w-full items-center justify-center gap-3 px-4 py-[15px] font-orbitron text-[13px] font-bold transition-transform duration-150 hover:brightness-110 active:scale-[0.98]"
        style={{
          color: "#05070e",
          background: "linear-gradient(#2dd4bf,#14b8a6)",
          letterSpacing: "1px",
        }}
      >
        <Image
          width={20}
          height={20}
          src="/google-logo.svg"
          alt="Google"
          className="h-5 w-5 shrink-0"
        />
        {label}
      </button>
    </form>
  );
};
