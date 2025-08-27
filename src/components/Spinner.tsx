import { BiLoaderAlt } from "react-icons/bi";

const Spinner = ({ color }: { color?: string }) => (
  <BiLoaderAlt
    className={`text-${color} w-6 h-6 animate-spin text-current mx-auto`}
  />
);

export default Spinner;
