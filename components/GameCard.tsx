"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  title: string;
  slug: string;
  id: number;
  image: string;
}

export const GameCard = ({ title, slug, id, image }: GameCardProps) => {
  return (
    <div className="relative rounded-xl bg-neutral-300 dark:bg-neutral-800 hover:scale-104 duration-200 ease-in-out">
      <div className="flex justify-center items-center">
        <Image
          width={260}
          height={320}
          src={image}
          alt={`${title} cover image`}
          className="rounded-t-xl object-cover"
          priority
        />
      </div>
      <div className="p-4 flex items-start">
        <h3>
          <Link
            href={{ pathname: `/games/${slug}`, query: { id } }}
            className="font-semibold text-2xl line-clamp-2 leading-tight cursor-pointer"
          >
            {title}
          </Link>
        </h3>
        <Heart className="absolute bottom-4 right-4 cursor-pointer" />
      </div>
    </div>
  );
};
