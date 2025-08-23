import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/register");
  }
  return (
    <div>
      <h1>Hello, {session.user?.name?.split(" ")[0]}</h1>
    </div>
  );
}
