export interface GamePageProps {
  name: string;
  cover: { url: string };
  summary: string;
  storyline?: string;
  release_dates: { human: string }[];
  aggregated_rating?: number;
  platforms: { name: string }[];
  screenshots: { url: string; height: number; width: number }[];
  videos: { video_id: string }[];
  genres: { name: string }[];
  involved_companies: {
    developer: boolean;
    publisher: boolean;
    company: { name: string };
  }[];
  similar_games: {
    name: string;
    slug: string;
    id: number;
    cover: {
      url: string;
    };
  }[];
}

export interface GameCardProps {
  id: number;
  name: string;
  slug: string;
  cover?: {
    url: string;
  };
}

export interface CardProps {
  id: number;
  name: string;
  slug: string;
}
