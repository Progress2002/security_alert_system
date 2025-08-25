import { Link } from "react-router-dom";
import Logo from "./Logo";
import { TfiAnnouncement } from "react-icons/tfi";

export default function UserNavigation() {
  return (
    <header className="flex justify-between px-12 w-full py-5 border-b border-b-border">
      <Link to="/home">
        <Logo />
      </Link>
      <nav>
        <Link
          to="/emergency"
          className="font-base text-text-secondary flex items-center gap-x-2"
          aria-label="Report a bug"
        >
          <TfiAnnouncement />
          Report a bug
        </Link>
      </nav>
    </header>
  );
}
