import { Outlet } from "react-router-dom";
import UserNavigation from "./UserNavigation";

export default function AppLayout() {
  return (
    <div className="flex flex-col ">
      <UserNavigation />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
