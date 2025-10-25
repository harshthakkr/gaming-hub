import Link from "next/link";

interface TopicProps {
  title: string;
  path: string;
}

export const Topic = ({ title, path }: TopicProps) => {
  return (
    <div className="mb-2">
      <Link href={path}>
        <button
          onClick={() => {}}
          className="w-full text-left px-3 py-2 md:text-lg lg:text-xl rounded-lg hover:bg-primary/60 hover:text-white hover:dark:bg-accent duration-200 cursor-pointer"
        >
          {title}
        </button>
      </Link>
    </div>
  );
};
