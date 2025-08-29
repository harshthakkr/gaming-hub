import Image from "next/image";

interface GameCardProps {
  title: string;
  image: string;
}

export const GameCard = ({ title, image }: GameCardProps) => {
  return (
    <div className="p-4 border rounded-lg">
      <Image
        width={200}
        height={280}
        src={image}
        alt="Game cover image"
        className="rounded"
      />
      <h3 className="mt-2 font-semibold">{title}</h3>
    </div>
  );
};
