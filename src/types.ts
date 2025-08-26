export interface Profile {
  id: string;
  reg_number: string;
  created_at: string;
}

export interface StudentSignInDetails {
  regNumber: string;
  email: string;
}
export interface AdminSIgnInDetails {
  email: string;
  password: string;
}
