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
      } dark:border-gray-700 border-gray-400`}
    >
      <span className="dark:text-gray-400 text-gray-700 block mb-3">
        {title}
      </span>
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
