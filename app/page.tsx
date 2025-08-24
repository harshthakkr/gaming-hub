import { auth } from "@/auth";
import { Feed } from "@/components/Feed";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/register");
  }

  return (
    <div className="mx-8 my-4 font-alpino">
      <Navbar />
      <div className="flex gap-8">
        <Sidebar />
        <Feed />
      </div>
    </div>
  );
}
