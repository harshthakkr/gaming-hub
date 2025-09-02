import axios from "axios";
import { Heart } from "lucide-react";
import Image from "next/image";

interface GameCardProps {
  id: number;
  title: string;
  image: string;
}

export const GameCard = ({ id, title, image }: GameCardProps) => {
  const handleClick = async (id: number) => {
    const game = await axios.get(`/api/game/${id}`);
  };
  return (
    <div className="relative rounded-xl bg-neutral-300 dark:bg-neutral-800 hover:scale-104 duration-200 ease-in-out">
      <div className="flex justify-center items-center">
        <Image
          width={260}
          height={320}
          src={image}
          alt="Game cover image"
          className="rounded-t-xl object-cover"
        />
      </div>
      <div className="p-4 flex items-start">
        <h3
          onClick={() => handleClick(id)}
          className="font-semibold text-2xl line-clamp-2 leading-tight cursor-pointer"
        >
          {title}
        </h3>
        <Heart className="absolute bottom-4 right-4 cursor-pointer" />
      </div>
    </div>
  );
};
