import { Navigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import type React from "react";
import PreLoader from "./PreLoader";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, isLoading } = UseAuth();
  if (isLoading)
    return (
      <div className="w-[100dvw] h-[100dvh]">
        <PreLoader />
      </div>
    );
  if (!isLoading && !currentUser) return <Navigate to={"/sign-in"} />;
  if (currentUser) return children;
}
