"use client";

import { AllGames } from "./AllGames";

interface FeedProps {
  activeView: string;
}

export const Feed = ({ activeView }: FeedProps) => {
  const renderContent = () => {
    switch (activeView) {
      case "All games":
        return <AllGames />;
      case "2025":
        return <div>Games from 2025</div>;
      case "Upcoming Games":
        return <div>Upcoming Games</div>;
      case "News":
        return <div>Gaming News</div>;
      case "Platforms":
        return <div>Gaming Platforms</div>;
      case "Genre":
        return <div>Game Genres</div>;
      case "Creators":
        return <div>Game Creators</div>;
      case "Developers":
        return <div>Game Developers</div>;
      default:
        return <div>Welcome to Gaming Hub! 🎮</div>;
    }
  };

  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold mb-4">{activeView}</h2>
      {renderContent()}
    </div>
  );
};
