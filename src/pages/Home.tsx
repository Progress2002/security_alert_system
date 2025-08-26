import { Navigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";

export default function Home() {
  const { currentUser } = UseAuth();
  if (currentUser?.user_metadata.role === "admin")
    return <Navigate to={"/admin"} />;
  return <main className="">Home Components</main>;
}
