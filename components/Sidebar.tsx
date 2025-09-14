"use client";

import { Topic } from "./Topic";

export const Sidebar = () => {
  return (
    <div className="font-supreme min-w-58">
      <Topic title="All Games" path="/games" />
      <Topic title="2025" path="/2025" />
      <Topic title="Upcoming Games" path="/upcoming-games" />
      <Topic title="Events" path="/events" />
      <Topic title="Platforms" path="/platforms" />
      <Topic title="Genres" path="/genres" />
      <Topic title="Developers" path="/developers" />
    </div>
  );
};
