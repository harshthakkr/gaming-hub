import Link from "next/link";

interface TopicProps {
  title: string;
  path: string;
}

export const Topic = ({ title, path }: TopicProps) => {
  return (
    <div className="mb-2">
      <button
        onClick={() => {}}
        className="w-full text-left px-3 py-2 text-xl font-medium rounded-lg hover:bg-accent-light hover:dark:bg-accent cursor-pointer"
      >
        <Link href={path}>{title}</Link>
      </button>
    </div>
  );
};
