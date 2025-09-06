export const GameMultiDataRow = ({
  title,
  data,
  colors,
}: {
  title: string;
  data: { name: string }[];
  colors: string;
}) => {
  return (
    <div
      className={`${
        title === "Developers" ? "" : "border-b pb-4"
      } border-gray-700`}
    >
      <span className="text-gray-400 block mb-3">{title}</span>
      <div className="flex flex-wrap gap-2">
        {data ? (
          data.map((item, index) => (
            <span
              key={index}
              className={`${colors} px-3 py-1 rounded-full text-sm`}
            >
              {item.name}
            </span>
          ))
        ) : (
          <span className="text-gray-500">N/A</span>
        )}
      </div>
    </div>
  );
};
