import { useMutation } from "@tanstack/react-query";
import type { StudentSignInDetails } from "../types";
import { userSignUp } from "../services/AuthApi";

export function useUserSignUp() {
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: ({ regNumber, email }: StudentSignInDetails) =>
      userSignUp({ regNumber, email }),
  });
  return { signUp, isSigningUp };
}
