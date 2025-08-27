import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { HistoryIcon, LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useSignIn";

export default function UserNavigation() {
  const { logOut, isLoggingOut } = useLogout();
  return (
    <header className="bg-white fixed top-0 flex gap-3 justify-between px-5 md:px-12 w-full py-5 border-b border-b-border ">
      <Link to="/">
        <Logo />
      </Link>
      <nav className="flex gap-4">
        <Link
          to="/history"
          className="font-base text-text-secondary hover:border-b border-primary-light delay-100 flex items-center gap-x-1 font-semibold text-sm"
          aria-label="Report a bug"
        >
          <HistoryIcon />
          <span className="hidden md:inline">Report</span> History
        </Link>
        <Button
          variant="outline"
          className="cursor-pointer"
          disabled={isLoggingOut}
          onClick={() => logOut()}
        >
          <LogOut color="red" />{" "}
          <span className="hidden md:inline">Log Out</span>
        </Button>
      </nav>
    </header>
  );
}
