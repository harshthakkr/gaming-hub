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
    <div className="mx-8 my-4 font-clash">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative md:flex md:gap-4 lg:gap-8">
        <div
          className={`dark:bg-neutral-950 fixed md:static top-0 left-0 z-50 min-w-58 md:min-w-48 lg:min-w-52 bg-inherit h-screen md:block ${
            !isOpen && "hidden"
          }`}
        >
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="flex-1 md:ml-0">{children}</div>
      </div>
    </div>
  );
}
