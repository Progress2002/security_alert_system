import { UseAuth } from "@/contexts/AuthContext";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

export default function Home() {
  const { currentUser } = UseAuth();
  return (
    <main className="">
      {currentUser?.user_metadata.role === "student" ? (
        <UserDashboard />
      ) : (
        <AdminDashboard />
      )}
    </main>
  );
}
