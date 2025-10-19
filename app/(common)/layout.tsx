"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navbarHeight = "h-[73px]";

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 ${navbarHeight}`}
      >
        <div className="w-full max-w-[1352px] mx-5 lg:mx-8 flex items-center">
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <aside className="hidden lg:block fixed top-[73px] left-[max(20px,calc((100vw-1352px)/2))] z-40 h-[calc(100vh-73px)] overflow-y-auto pt-4 min-w-48 xl:min-w-52 font-clash">
        <Sidebar />
      </aside>
      <div
        className={`fixed lg:hidden top-[73px] left-0 z-40 h-[calc(100vh-73px)] overflow-y-auto bg-white dark:bg-neutral-950 min-w-58 ${
          !isOpen && "hidden"
        }`}
      >
        <div className="pt-4 font-clash">
          <Sidebar />
        </div>
      </div>
      <div className="mx-5 my-4 lg:mx-8 font-clash max-w-[1352px] justify-self-center">
        <div className="lg:flex lg:gap-4 xl:gap-8 pt-[73px]">
          <div className="hidden lg:block min-w-48 xl:min-w-52"></div>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
