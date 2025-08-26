import { BarLoader } from "react-spinners";

export default function PreLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <BarLoader width={140} color="#0062ff" speedMultiplier={1.1} />
    </div>
  );
}
