import { Calendar } from "./Calendar";
import { Topic } from "./Topic";

export const Sidebar = () => {
  return (
    <div className="min-w-72">
      <Calendar title="Calendar" />
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
