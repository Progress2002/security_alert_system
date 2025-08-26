import { Outlet } from "react-router-dom";
import UserNavigation from "./UserNavigation";

export default function AppLayout() {
  return (
    <div>
      <UserNavigation />
      <Outlet />
    </div>
  );
}
