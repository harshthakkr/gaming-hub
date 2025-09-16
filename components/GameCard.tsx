"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GameCardProps } from "@/utils/types";

export const GameCard = ({ name, slug, cover }: GameCardProps) => {
  return cover ? (
    <div className="relative rounded-xl bg-neutral-300 dark:bg-neutral-800 hover:scale-104 duration-200 ease-in-out">
      <div className="flex justify-center items-center">
        {cover && (
          <Image
            width={260}
            height={320}
            src={`https:${cover.url.replace("t_thumb", "t_1080p")}`}
            alt={`${name} cover image`}
            className="rounded-t-xl object-cover"
            priority
          />
        )}
      </div>
      <div className="p-4 flex items-start">
        <p>
          <Link
            href={`/games/${slug}`}
            className="font-semibold text-2xl line-clamp-2 leading-tight cursor-pointer"
          >
            {name}
          </Link>
        </p>
        <button className="absolute bottom-4 right-4 cursor-pointer">
          <Heart />
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};
