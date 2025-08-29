"use client";

import { Topic } from "./Topic";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
  return (
    <div className="min-w-72">
      <Topic title="All games" setActiveView={setActiveView} />
      <Topic title="2025" setActiveView={setActiveView} />
      <Topic title="Upcoming Games" setActiveView={setActiveView} />
      <Topic title="News" setActiveView={setActiveView} />
      <Topic title="Platforms" setActiveView={setActiveView} />
      <Topic title="Genre" setActiveView={setActiveView} />
      <Topic title="Creators" setActiveView={setActiveView} />
      <Topic title="Developers" setActiveView={setActiveView} />
    </div>
  );
};
