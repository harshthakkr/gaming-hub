import { auth } from "@/auth";
import { SignIn } from "@/components/SignIn";
import { redirect } from "next/navigation";

export const Register = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex justify-center items-center font-alpino">
      <div className="p-12 rounded-xl border border-secondary">
        <h1 className="text-4xl font-bold mb-8 text-center">Sign up</h1>
        <SignIn />
      </div>
    </div>
  );
};
