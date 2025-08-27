import { useMutation } from "@tanstack/react-query";
import type { AdminSIgnInDetails, StudentSignInDetails } from "../types";
import { adminSignUp, userLogout, userSignUp } from "../services/AuthApi";
import { toast } from "react-toastify";

export function useUserSignUp() {
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: ({ regNumber, email }: StudentSignInDetails) =>
      userSignUp({ regNumber, email }),
  });
  return { signUp, isSigningUp };
}

export function useAdminSignUp() {
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: ({ email, password }: AdminSIgnInDetails) =>
      adminSignUp({ email, password }),
  });
  return { signUp, isSigningUp };
}

export function useLogout() {
  const { mutate: logOut, isPending: isLoggingOut } = useMutation({
    mutationFn: () => userLogout(),
    onSuccess: () => toast("Log out Success!"),
    onError: () => toast.error("We could not log you out!"),
  });
  return { logOut, isLoggingOut };
}
