import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { HiInformationCircle } from "react-icons/hi";
import type { adminFormInputs } from "../pages/AdminSignIn";
import type React from "react";

interface FieldProps {
  register: UseFormRegister<adminFormInputs>;
  pattern?: RegExp;
  errorText: string;
  name: keyof adminFormInputs;
  errors: FieldErrors<adminFormInputs>;
  type: "text" | "email" | "password";
  placeholder: string;
  endIcon?: React.ReactNode;
}
export default function Field({
  errors,
  name,
  errorText,
  type,
  register,
  placeholder,
  endIcon,
  pattern,
}: FieldProps) {
  return (
    <div>
      <div className="relative">
        <input
          {...register(name, {
            required: errorText,
            validate: (input) => {
              if (!pattern) return true;
              return pattern?.test(input) || errorText;
            },
          })}
          type={type}
          name={name}
          placeholder={placeholder}
          className="bg-primary-surface rounded-full text-primary-dark h-14 w-full px-12 placeholder:text-text-secondary focus:outline-0"
        />
        {endIcon && (
          <div className="absolute right-5 h-full top-0 mt-4">{endIcon}</div>
        )}
      </div>
      {errors[name] && (
        <p className="mt-1 text-xs flex items-center gap-x-1 text-red-700">
          <HiInformationCircle />
          {errorText}
        </p>
      )}
    </div>
  );
}
