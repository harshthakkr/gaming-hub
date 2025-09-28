"use client";

import { Games } from "@/components/Games";
import { Heading } from "@/components/Heading";
import { SecondaryHeading } from "@/components/SecondaryHeading";
import { EventPageProps } from "@/utils/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Event = () => {
  const [event, setEvent] = useState<EventPageProps>({});
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    const fetchDate = async () => {
      const res = await axios.get(`/api/events/${slug}`);
      setEvent(res.data);
    };
    fetchDate();
  }, []);

  const formatDate = (timestamp: number | undefined) => {
    if (!timestamp) return "TBD";
    return new Date(timestamp * 1000).toUTCString();
  };

  return (
    <div>
      <Heading title={event.name} />
      {event.event_logo && (
        <div className="flex items-start">
          <div className="flex flex-col xl:flex-row justify-between items-start mb-6 gap-6">
            <Image
              src={`https:${event.event_logo.url.replace(
                "t_thumb",
                "t_1080p"
              )}`}
              alt={`${event.name || "Event"} logo`}
              width={400}
              height={200}
              className="rounded-lg object-contain"
              priority
            />
            <div className="space-y-4">
              <p className="text-gray-400">
                Start: {formatDate(event.start_time)}
              </p>
              <p className="text-gray-400">End: {formatDate(event.end_time)}</p>

              {event.live_stream_url && (
                <div>
                  <Link
                    href={event.live_stream_url}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    Watch Live →
                  </Link>
                </div>
              )}

              {event.description && (
                <p className="text-gray-300">{event.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {event.games && (
        <div>
          <SecondaryHeading title="Featured Games" />
          <Games games={event.games} />
        </div>
      )}
    </div>
  );
};

export default Event;
