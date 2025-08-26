import { Navigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";

export default function AdminHome() {
  const { currentUser } = UseAuth();

  if (currentUser?.user_metadata.role === "student")
    return <Navigate to={"/"} />;
  return <div>Admin HomePage</div>;
}
