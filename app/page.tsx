"use client";

import { useState } from "react";
import { Feed } from "@/components/Feed";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  const [activeView, setActiveView] = useState<string>("All games");

  return (
    <div className="mx-8 my-4 font-alpino">
      <Navbar />
      <div className="flex gap-8">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <Feed activeView={activeView} />
      </div>
    </div>
  );
}
