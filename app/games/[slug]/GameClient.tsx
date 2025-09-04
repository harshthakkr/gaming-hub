"use client";

import Image from "next/image";
import { useState } from "react";

interface GameProps {
  name: string;
  cover: { url: string };
  genres: { name: string }[];
  involved_companies: { company: string }[];
  release_dates: { human: string };
  screenshots: { url: string; height: number; width: number }[];
  summary: string;
  storyline?: string;
  videos: { video_id: string }[];
}

export const GameClient = ({ data }: { data: GameProps }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = data.screenshots || [];
  const current = images[currentIndex];

  if (!current) return <div>No images available</div>;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-6xl font-semibold mb-12">{data.name}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900 shadow-2xl group">
            <Image
              src={`https:${current.url.replace("t_thumb", "t_1080p")}`}
              alt={`${data.name} screenshot`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              priority
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentIndex(
                      (i) => (i - 1 + images.length) % images.length
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={() =>
                    setCurrentIndex((i) => (i + 1) % images.length)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className="absolute top-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded-full">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">About</h2>
          {data.summary && (
            <p className="text-lg text-gray-300 leading-relaxed">
              {data.summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
