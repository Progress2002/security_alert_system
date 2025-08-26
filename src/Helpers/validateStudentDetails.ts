import type { StudentSignInDetails } from "../types";

export function validateStudentDetails({
  regNumber,
  email,
}: StudentSignInDetails): boolean {
  const [_, registrationYear, faculty, studentNumber] = regNumber.split("/");
  const [emailFirstPart, emailLastPart] = email.split(".");
  const facInEmail = emailLastPart.slice(0, 3);
  const yearInEmail =
    emailFirstPart.length === 9
      ? emailFirstPart.slice(2, 4)
      : emailFirstPart.slice(3, 5);

  const studentNumberInEmail =
    emailFirstPart.length === 9
      ? emailFirstPart.slice(4, 9)
      : emailFirstPart.slice(5, 10);
  const regNumberIsValid = studentNumber === studentNumberInEmail;
  const facIsValid = facInEmail.toLowerCase() === faculty.toLowerCase();
  const yearIsValid = yearInEmail === registrationYear;

  return regNumberIsValid && facIsValid && yearIsValid;
}
