"use client";

import { Games } from "@/components/Games";
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { SecondaryHeading } from "@/components/SecondaryHeading";
import { useSingleData } from "@/utils/hooks/useSingleData";
import { EventPageProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

const Event = () => {
  const { data, loading } = useSingleData<EventPageProps>("events");

  const formatDate = (timestamp: number | undefined) => {
    if (!timestamp) return "TBD";
    return new Date(timestamp * 1000).toUTCString();
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Heading title={data.name} />
      {data.event_logo && (
        <div className="flex items-start">
          <div className="flex flex-col xl:flex-row justify-between items-start mb-6 gap-6">
            <Image
              src={`https:${data.event_logo.url.replace("t_thumb", "t_1080p")}`}
              alt={`${data.name || "Event"} logo`}
              width={400}
              height={200}
              className="rounded-lg object-contain"
              priority
            />
            <div className="space-y-4">
              <p className="dark:text-gray-400 text-gray-700">
                Start: {formatDate(data.start_time)}
              </p>
              <p className="dark:text-gray-400 text-gray-700">
                End: {formatDate(data.end_time)}
              </p>

              {data.live_stream_url && (
                <div>
                  <Link
                    href={data.live_stream_url}
                    target="_blank"
                    className="dark:text-blue-400 text-blue-600 hover:underline"
                  >
                    Watch Live →
                  </Link>
                </div>
              )}

              {data.description && (
                <p className="dark:text-gray-300 text-gray-800">
                  {data.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {data.games && (
        <div>
          <SecondaryHeading title="Featured Games" />
          <Games games={data.games} />
        </div>
      )}
    </div>
  );
};

export default Event;
