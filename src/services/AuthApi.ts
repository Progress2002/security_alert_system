// import type { adminFormInputs } from "../pages/AdminSignIn";
import type { AdminSIgnInDetails, StudentSignInDetails } from "../types";
import { supabase } from "./supabase";
import type { User } from "@supabase/supabase-js";

export async function userSignUp({
  regNumber,
  email,
}: StudentSignInDetails): Promise<User | undefined> {
  const hasAccount = await checkUserExistence(regNumber);
  if (hasAccount) {
    return userSignIn({ regNumber, email });
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password: regNumber.toLowerCase(),
    options: {
      data: {
        role: "student",
        regNumber: regNumber.toLowerCase(),
      },
    },
  });

  if (error) throw new Error("We could not sign you up!");
  const { error: createProfileError } = await supabase.from("profiles").insert([
    {
      id: data.user?.id,
      regNumber: regNumber.toUpperCase(),
    },
  ]);

  if (createProfileError) throw new Error("We could not create your profile!");
}

export async function userSignIn({
  regNumber,
  email,
}: StudentSignInDetails): Promise<User | undefined> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: regNumber.toLowerCase(),
  });

  if (error) throw new Error("Wrong Registration number / Email");
  return data.user;
}

export async function checkUserExistence(regNumber: string): Promise<boolean> {
  if (!regNumber) return false;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("regNumber", regNumber.toUpperCase())
    .maybeSingle();
  if (error) return false;

  return !!data;
}

export async function checkAdminExistence(email: string): Promise<boolean> {
  if (!email) return false;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .maybeSingle();
  if (error) return false;

  return !!data;
}

export async function adminSignUp({
  email,
  password,
}: AdminSIgnInDetails): Promise<User | undefined> {
  const hasAccount = await checkAdminExistence(email);
  if (hasAccount) {
    return AdminSignIn({ email, password });
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "admin",
      },
    },
  });

  if (error) throw new Error("We could not sign you up!");
  const { error: createProfileError } = await supabase.from("profiles").insert([
    {
      id: data.user?.id,
      is_admin: true,
      email,
    },
  ]);

  if (createProfileError) throw new Error("We could not create your profile!");
}

export async function AdminSignIn({
  email,
  password,
}: AdminSIgnInDetails): Promise<User | undefined> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Wrong Registration number / Email");
  return data.user;
}

export async function userLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error();
}
