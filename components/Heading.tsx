import { ParamValue } from "next/dist/server/request/params";

export const Heading = ({ title }: { title: string | ParamValue }) => {
  return (
    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold mb-4">
      {title}
    </h2>
  );
};
