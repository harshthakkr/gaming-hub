"use client";

import Image from "next/image";
import Link from "next/link";
import { EventCardProps } from "@/utils/types";

export const EventCard = ({ name, slug, event_logo }: EventCardProps) => {
  return event_logo ? (
    <div className="rounded-xl bg-gray-900/10 dark:bg-neutral-800 hover:scale-104 duration-200 ease-in-out">
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
      <div className="p-3 flex items-start">
        <p>
          <Link
            href={`/events/${slug}`}
            className="font-medium text-lg xl:text-xl line-clamp-3 leading-tight cursor-pointer"
          >
            {name}
          </Link>
        </p>
      </div>
    </div>
  ) : (
    ""
  );
};
