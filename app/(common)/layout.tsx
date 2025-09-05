import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-8 my-4 font-alpino">
      <Navbar />
      <div className="flex gap-8">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
