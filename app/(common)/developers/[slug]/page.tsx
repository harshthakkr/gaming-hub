"use client";

import { Games } from "@/components/Games";
import { Heading } from "@/components/Heading";
import { SecondaryHeading } from "@/components/SecondaryHeading";
import { DeveloperPageProps } from "@/utils/types";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Developer = () => {
  const [developer, setDeveloper] = useState<DeveloperPageProps>({});
  const params = useParams();
  const slug = params.slug;
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/developers/${slug}`);
      setDeveloper(res.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Heading title={developer.name} />
      <div className="font-supreme text-neutral-400 mb-2">
        {developer.websites?.map((website) => {
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
      <p className="font-supreme text-neutral-400">{developer.description}</p>
      {developer.developed && (
        <div>
          <SecondaryHeading title="Developed Games" />
          <Games games={developer.developed} />
        </div>
      )}
    </div>
  );
};

export default Developer;
