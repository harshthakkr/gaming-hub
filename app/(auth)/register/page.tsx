import { auth } from "@/auth";
import { SignIn } from "@/components/SignIn";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Register = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="font-clash min-h-screen flex bg-black overflow-hidden">
      <div className="flex-[1.5] relative">
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
              <div className="text-gray-500">Loading...</div>
            </div>
          }
        >
          <AnimatedBackground />
        </Suspense>
      </div>
      <div className="flex-1 flex justify-center items-center relative z-10 px-8">
        <div className="p-12 rounded-2xl border border-gray-700 bg-black/90 backdrop-blur-sm shadow-2xl max-w-md w-full">
          <h1 className="text-5xl font-semibold mb-8 text-center text-white">
            Sign up
          </h1>
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Register;
