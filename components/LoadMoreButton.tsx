export const LoadMoreButton = ({
  handleClick,
}: {
  handleClick: () => void;
}) => {
  return (
    <button
      onClick={handleClick}
      className="bg-accent text-white cursor-pointer px-4 py-2 rounded-2xl my-4"
    >
      Load more...
    </button>
  );
};
