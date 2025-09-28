export const LoadMoreButton = ({
  handleClick,
}: {
  handleClick: () => void;
}) => {
  return (
    <button
      onClick={handleClick}
      className="bg-accent text-white cursor-pointer text-sm md:text-base px-4 py-2 rounded-xl my-4"
    >
      Load more...
    </button>
  );
};
