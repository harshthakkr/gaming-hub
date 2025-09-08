import axios from "axios";
import { PlatformProps } from "@/utils/types";
import Link from "next/link";

const Platforms = async () => {
  const platforms = await axios.get("http://localhost:3000/api/platforms");
  return (
    <div>
      <h2 className="text-4xl font-semibold mb-4">Platforms</h2>
      <div className="grid grid-cols-4 gap-4">
        {platforms.data.map((platform: PlatformProps) => {
          return (
            <h4
              key={platform.id}
              className="p-4 text-2xl col-span-1 bg-neutral-800 rounded-2xl hover:scale-105 duration-200"
            >
              <Link href={`/platforms/${platform.slug}`}>{platform.name}</Link>
            </h4>
          );
        })}
      </div>
    </div>
  );
};

export default Platforms;
