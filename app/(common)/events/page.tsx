"use client";

import { EventCard } from "@/components/EventCard";
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { useData } from "@/utils/hooks/useData";
import { EventCardProps } from "@/utils/types";

const Events = () => {
  const { data, hasMore, loading, handlePagination } =
    useData<EventCardProps>("events");

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Heading title="Events" />
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {data.map((event) => {
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
