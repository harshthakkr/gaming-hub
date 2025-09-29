"use client";

import { X } from "lucide-react";
import { Topic } from "./Topic";
import { ThemeAndSignOut } from "./ThemeAndSignOut";

export const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className="h-full min-w-32 mx-5 lg:mx-0 flex flex-col">
      <div className="flex-1">
        <Topic title="All Games" path="/games" />
        <Topic title="2025" path="/2025" />
        <Topic title="Upcoming Games" path="/upcoming-games" />
        <Topic title="Events" path="/events" />
        <Topic title="Platforms" path="/platforms" />
        <Topic title="Genres" path="/genres" />
        <Topic title="Developers" path="/developers" />
      </div>
      <div className="block lg:hidden px-3 mb-4">
        <ThemeAndSignOut />
      </div>
    </div>
  );
};
