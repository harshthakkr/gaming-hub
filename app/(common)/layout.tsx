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
  return (
    <div className="mx-5 my-4 lg:mx-8 font-clash">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative lg:flex lg:gap-4 xl:gap-8 pt-20">
        <div
          className={`dark:bg-neutral-950 fixed lg:static top-15 left-0 z-50 lg:z-20 min-w-58 lg:min-w-48 xl:min-w-52 bg-inherit h-screen lg:block ${
            !isOpen && "hidden"
          }`}
        >
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="flex-1 lg:ml-0">{children}</div>
      </div>
    </div>
  );
}
