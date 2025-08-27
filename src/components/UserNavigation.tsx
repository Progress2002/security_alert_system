import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { HistoryIcon, LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useSignIn";

export default function UserNavigation() {
  const { logOut, isLoggingOut } = useLogout();
  return (
    <header className="bg-white  top-0 flex justify-between px-12 w-full py-5 border-b border-b-border ">
      <Link to="/">
        <Logo />
      </Link>
      <nav className="flex gap-x-4">
        <Link
          to="/history"
          className="font-base text-text-secondary flex items-center gap-x-1"
          aria-label="Report a bug"
        >
          <HistoryIcon />
          Report History
        </Link>
        <Button disabled={isLoggingOut} onClick={() => logOut()}>
          <LogOut /> Log Out
        </Button>
      </nav>
    </header>
  );
}
