"use client";

import { Topic } from "./Topic";

export const Sidebar = () => {
  return (
    <div className="min-w-64">
      <Topic title="All games" />
      <Topic title="2025" />
      <Topic title="Upcoming Games" />
      <Topic title="News" />
      <Topic title="Platforms" />
      <Topic title="Genre" />
      <Topic title="Creators" />
      <Topic title="Developers" />
    </div>
  );
};
