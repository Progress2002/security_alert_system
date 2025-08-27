import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useForm, type SubmitHandler } from "react-hook-form";
import Field from "../components/AdminField";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useState } from "react";
import { useAdminSignIn } from "../hooks/useSignIn";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

export interface adminFormInputs {
  email: string;
  password: string;
}

export default function AdminSignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { signUp, isSigningUp } = useAdminSignIn();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<adminFormInputs>({
    mode: "onChange",
  });

  const submitFn: SubmitHandler<adminFormInputs> = (data) => {
    signUp(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          toast("Login Successful");
          navigate("/");
        },
        onError: (error) => toast.error(error.message),
      }
    );
  };

  return (
    <main className="w-full max-w-[2480px] h-[100dvh] mx-auto gap-16 flex  font-base">
      <section className="w-full flex justify-center flex-col md:basis-1/2 md:h-full py-10 relative">
        <Logo styles="absolute top-10 left-10" />
        <div className="mt-5 mx-auto w-2/3 ">
          <h2 className="text-4xl text-text-primary font-bold">
            Admin Sign In
          </h2>
          <p className="mt-2 text-text-secondary">
            Login to start responding to incidents. This page is restricted.
          </p>
        </div>
        <div className="flex h-1/2 mt-14 flex-col  mx-auto w-2/3  justify-between ">
          <form
            className="flex gap-6 flex-col"
            onSubmit={handleSubmit(submitFn)}
          >
            <Field
              errors={errors}
              name="email"
              type="email"
              placeholder="Enter your work email"
              register={register}
              pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              errorText="Enter a valid Email Address"
            />
            <Field
              errors={errors}
              name="password"
              type={showPassword ? "text" : "password"}
              register={register}
              errorText="Enter your correct password"
              placeholder="Enter your password"
              endIcon={
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
                </button>
              }
            />
            <button
              disabled={isSigningUp}
              type="submit"
              className="w-full text-white font-semibold rounded-full h-14 bg-primary text-center"
            >
              {isSigningUp ? <Spinner /> : "Sign In"}
            </button>
          </form>
          <div className="flex gap-2 mt-5 w-full justify-center">
            <p className="text-sm text-text-secondary">
              Want to report an incident?
            </p>
            <Link to="/sign-in" className="text-primary text-sm font-semibold">
              Sign in here
            </Link>
          </div>
        </div>
      </section>
      <section className="hidden md:items-end md:flex md:basis-1/2 text-white md:h-full bg-[url('/getinImage.webp')] bg-center bg-cover ">
        <div className="h-full flex-col flex justify-end px-12 pb-20 w-full bg-gradient-to-t from-primary-dark to-primary/30 gap-y-2">
          <h1 className="font-bold text-5xl">Respond to Campus Incidents</h1>
          <p>
            Login with your admin account to access and respond to incident
            reports, emergencies, and safety concerns submitted by students.
            Your timely response helps maintain a safer and more secure campus
            environment at Bayero University Kano.
          </p>
        </div>
      </section>
    </main>
  );
}
