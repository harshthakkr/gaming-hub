interface TopicProps {
  title: string;
  setActiveView: (name: string) => void;
}

export const Topic = ({ title, setActiveView }: TopicProps) => {
  return (
    <div className="mb-2">
      <button
        onClick={() => {
          setActiveView(title);
        }}
        className="w-full text-left px-3 py-2 text-xl font-medium rounded-lg hover:bg-accent-light hover:dark:bg-accent cursor-pointer"
      >
        {title}
      </button>
    </div>
  );
};
