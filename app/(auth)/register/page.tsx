import { auth } from "@/auth";
import { SignIn } from "@/components/SignIn";
import axios from "axios";
import { redirect } from "next/navigation";

const Register = async () => {
  const images = await axios.get(`http://localhost:3000/api/`);
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex justify-center items-center font-alpino">
      <div></div>
      <div className="p-12 rounded-xl border border-secondary">
        <h1 className="text-4xl font-bold mb-8 text-center">Sign up</h1>
        <SignIn />
      </div>
    </div>
  );
};

export default Register;
