"use client";

import { Games } from "@/components/Games";
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { SecondaryHeading } from "@/components/SecondaryHeading";
import { useSingleData } from "@/utils/hooks/useSingleData";
import { DeveloperPageProps } from "@/utils/types";
import Link from "next/link";

const Developer = () => {
  const { data, loading } = useSingleData<DeveloperPageProps>("developers");

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Heading title={data.name} />
      <div className="font-supreme text-neutral-400 mb-2">
        {data.websites?.map((website) => {
          return (
            <Link
              href={website.url}
              key={website.id}
              target="_blank"
              className="hover:text-neutral-100 duration-200"
            >
              {website.url}
            </Link>
          );
        })}
      </div>
      <p className="font-supreme text-neutral-400">{data.description}</p>
      {data.developed && (
        <div>
          <SecondaryHeading title="Developed Games" />
          <Games games={data.developed} />
        </div>
      )}
    </div>
  );
};

export default Developer;
