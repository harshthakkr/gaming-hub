"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EventCardProps } from "@/utils/types";

export const EventCard = ({ name, slug, event_logo }: EventCardProps) => {
  return event_logo ? (
    <div className="relative rounded-xl bg-neutral-300 dark:bg-neutral-800 hover:scale-104 duration-200 ease-in-out">
      <div className="flex justify-center items-center">
        {event_logo && (
          <Image
            width={260}
            height={320}
            src={`https:${event_logo.url.replace("t_thumb", "t_1080p")}`}
            alt={`${name} cover image`}
            className="rounded-t-xl object-cover"
            priority
          />
        )}
      </div>
      <div className="p-4 flex items-start">
        <p>
          <Link
            href={`/events/${slug}`}
            className="font-semibold text-2xl line-clamp-2 leading-tight cursor-pointer"
          >
            {name}
          </Link>
        </p>
        <Heart className="absolute bottom-4 right-4 cursor-pointer" />
      </div>
    </div>
  ) : (
    ""
  );
};
