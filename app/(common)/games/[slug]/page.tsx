"use client";

import { useSingleData } from "@/utils/hooks/useSingleData";
import { GamePageProps } from "@/utils/types";
import { Loader } from "@/components/Loader";
import Image from "next/image";
import { useState } from "react";
import { Games } from "@/components/Games";
import { GameDataRow } from "@/components/GameDataRow";
import { GameMultiDataRow } from "@/components/GameMultiDataRow";
import { SecondaryHeading } from "@/components/SecondaryHeading";
import { ChevronButton } from "@/components/ChevronButton";

const Game = () => {
  const { data, loading } = useSingleData<GamePageProps>(`games`);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) return <Loader />;
  if (!data) return <div>No data available for this game : (</div>;

  const images = data.screenshots || [];
  const current = images[currentIndex];
  const developerData = data.involved_companies
    ?.filter((company) => company.developer || company.publisher)
    .map((company) => ({
      name: company.company.name,
    }));

  if (!current) return <div>No screenshots available for this game : (</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold mb-6">
        {data.name}
      </h1>
      <div className="grid xl:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900 shadow-2xl group mb-8">
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
                <ChevronButton
                  images={images}
                  direction="left"
                  setCurrentIndex={setCurrentIndex}
                />
                <ChevronButton
                  images={images}
                  direction="right"
                  setCurrentIndex={setCurrentIndex}
                />
              </>
            )}
          </div>
          <div className="font-supreme bg-gray-900/50 border border-gray-700 rounded-2xl p-6 space-y-6">
            <GameDataRow
              title="Release Date"
              data={data.release_dates ? data.release_dates[0].human : "N/A"}
            />
            <GameMultiDataRow
              title="Platforms"
              data={data.platforms}
              colors="bg-primary/30 text-neutral-200"
            />
            <GameDataRow
              title="Critics Score"
              data={
                data.aggregated_rating
                  ? `${data.aggregated_rating.toFixed(0)}/100`
                  : "N/A"
              }
            />
            <GameMultiDataRow
              title="Genres"
              data={data.genres}
              colors="bg-secondary/20 text-secondary "
            />
            <GameMultiDataRow
              title="Developers"
              data={developerData}
              colors="bg-gray-800 text-gray-200 "
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-2 text-white">About</h3>
          {data.summary && (
            <p className="font-supreme text-neutral-400 leading-relaxed">
              {data.summary}
            </p>
          )}
        </div>
      </div>
      {data.similar_games && (
        <div>
          <SecondaryHeading title={`More Games like ${data.name}`} />
          <Games games={data.similar_games} />
        </div>
      )}
    </div>
  );
};

export default Game;
