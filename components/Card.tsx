import { CardProps } from "@/utils/types";
import Link from "next/link";

export const Card = ({
  items,
  route,
}: {
  items: CardProps[];
  route: string;
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item: CardProps) => {
        return (
          <h4
            key={item.id}
            className="p-4 text-xl lg:text-2xl col-span-1 dark:bg-neutral-800 bg-neutral-900/10 rounded-2xl hover:scale-105 duration-200"
          >
            <Link href={`/${route}/${item.slug}`}>{item.name}</Link>
          </h4>
        );
      })}
    </div>
  );
};
