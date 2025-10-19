import { GamePageProps } from "@/utils/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ChevronButton = ({
  images,
  direction,
  setCurrentIndex,
}: {
  images: GamePageProps["screenshots"];
  direction: "left" | "right";
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <button
      onClick={() =>
        setCurrentIndex((i: number) =>
          direction === "left"
            ? (i - 1 + images.length) % images.length
            : (i + 1) % images.length
        )
      }
      className={`absolute ${
        direction === "left" ? "left-4" : "right-4"
      } top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer`}
    >
      {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
};
