import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { signInFormInputs } from "../pages/SignIn";
import { HiInformationCircle } from "react-icons/hi";

interface FieldProps {
  register: UseFormRegister<signInFormInputs>;
  pattern?: RegExp;
  errorText: string;
  name: keyof signInFormInputs;
  errors: FieldErrors<signInFormInputs>;
  type: "text" | "email";
  placeholder: string;
}
export default function Field({
  errors,
  name,
  errorText,
  type,
  register,
  placeholder,
  pattern,
}: FieldProps) {
  return (
    <div>
      <input
        {...register(name, {
          required: errorText,
          validate: (input) => {
            return pattern?.test(input) || errorText;
          },
        })}
        type={type}
        name={name}
        placeholder={placeholder}
        className="bg-primary-surface rounded-full text-primary-dark h-14 w-full px-12 placeholder:text-text-secondary focus:outline-0"
      />
      {errors[name] && (
        <p className="mt-1 text-xs flex items-center gap-x-1 text-red-700">
          <HiInformationCircle />
          {errorText}
        </p>
      )}
    </div>
  );
}
