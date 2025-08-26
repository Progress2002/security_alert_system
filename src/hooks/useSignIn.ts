import { useMutation } from "@tanstack/react-query";
import type { AdminSIgnInDetails, StudentSignInDetails } from "../types";
import { adminSignUp, userSignUp } from "../services/AuthApi";

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
