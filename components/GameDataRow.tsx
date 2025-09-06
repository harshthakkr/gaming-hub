export const GameDataRow = ({
  title,
  data,
}: {
  title: string;
  data: string;
}) => {
  return (
    <div className="border-b border-gray-700 pb-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">{title}</span>
        <span className="text-white font-medium">{data}</span>
      </div>
    </div>
  );
};
