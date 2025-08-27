import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { MdError } from "react-icons/md";

export default function Error() {
  return (
    <div className="dark:bg-dark flex h-[100dvh] w-full items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <MdError size={128} className="text-primary" fill="#0062ff" />
        <h1 className="px-3 text-5xl font-bold mb-3">
          Something went wrong...
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-white">
          Something isn't working, it's not you, it us we'll fix that right
          away!
        </p>
        <Button className="mt-4">
          <Link to={"/"}>Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
