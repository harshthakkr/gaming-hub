"use client";

import { EventCard } from "@/components/EventCard";
import { Heading } from "@/components/Heading";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { EventCardProps } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Events = () => {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/events`);
      setEvents(res.data);
      setHasMore(res.data.length === 20);
    };
    fetchData();
  }, []);

  const handlePagination = async () => {
    const res = await axios.get(`/api/events?offset=${events.length}`);
    setEvents([...events, ...res.data]);
    setHasMore(res.data.length === 20);
  };
  return (
    <div>
      <Heading title="Events" />
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-4 gap-6">
          {events.map((event) => {
            return (
              <EventCard
                key={event.id}
                name={event.name}
                slug={event.slug}
                id={event.id}
                event_logo={event.event_logo}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        {hasMore && <LoadMoreButton handleClick={handlePagination} />}
      </div>
    </div>
  );
};

export default Events;
