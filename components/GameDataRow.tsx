export const GameDataRow = ({
  title,
  data,
}: {
  title: string;
  data: string;
}) => {
  return (
    <div className="border-b dark:border-gray-700 border-gray-400 pb-4">
      <div className="flex justify-between items-center">
        <span className="dark:text-gray-400 text-gray-700">{title}</span>
        <span className="dark:text-white text-gray-900 font-medium">
          {data}
        </span>
      </div>
    </div>
  );
};
