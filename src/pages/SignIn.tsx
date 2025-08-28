import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useForm, type SubmitHandler } from "react-hook-form";
import Field from "../components/StudentsField";
import { useUserSignUp } from "../hooks/useSignIn";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { UseAuth } from "../contexts/AuthContext";
import PreLoader from "../components/PreLoader";
import { validateStudentDetails } from "../Helpers/validateStudentDetails";

export interface signInFormInputs {
  regNumber: string;
  email: string;
}

export default function SignIn() {
  const { currentSession, isLoading } = UseAuth();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<signInFormInputs>({
    mode: "onChange",
  });
  const { signUp, isSigningUp } = useUserSignUp();
  const submitFn: SubmitHandler<signInFormInputs> = ({ regNumber, email }) => {
    const isValid = validateStudentDetails({ regNumber, email });

    if (!isValid) {
      toast.error("Registration Number doesn't match with email");
      return;
    }

    signUp(
      { regNumber: regNumber, email: email },
      {
        onSuccess: () => {
          toast("Login Successful");
          navigate("/");
        },
        onError: (error) => toast.error(error.message),
      }
    );
  };
  if (isLoading)
    return (
      <div className="w-[100dvw] h-[100dvh]">
        <PreLoader />
      </div>
    );
  if (!isLoading && currentSession) return <Navigate to={"/"} />;
  return (
    <main className="w-full max-w-[2480px] h-[100dvh] mx-auto gap-16 flex font-base">
      <section className="hidden md:items-end md:flex md:basis-1/2 text-white md:h-full bg-[url('/getinImage.webp')] bg-center bg-cover ">
        <div className="h-full flex-col flex justify-end px-12 pb-20 w-full bg-gradient-to-t from-primary-dark to-primary/30 gap-y-2">
          <h1 className="font-bold text-5xl">Report Campus Incidents</h1>
          <p>
            Login with your student account to submit detailed reports of
            incidents, emergencies, or safety concerns directly to Bayero
            University Kano security authorities. Your input helps ensure a
            safer and more responsive campus environment.
          </p>
        </div>
      </section>
      <section className="w-full flex justify-center flex-col md:basis-1/2 md:h-full py-10 relative bg-gradient-to-t from-primary-dark to-primary/10 md:bg-none md:from-transparent md:to-transparent">
        <Logo styles="absolute top-10 left-10" />
        <div className="mt-5 mx-auto w-5/6 md:w-2/3 ">
          <h2 className="text-4xl text-text-primary font-bold">Sign In</h2>
          <p className="mt-2 md:text-text-secondary">
            Login to start reporting incidents.
          </p>
        </div>
        <div className="flex h-1/2 mt-14 flex-col  mx-auto w-5/6 md:w-2/3  justify-between ">
          <form
            className="flex gap-6 flex-col"
            onSubmit={handleSubmit(submitFn)}>
            <Field
              errors={errors}
              name="regNumber"
              type="text"
              register={register}
              pattern={/^[A-Za-z]{3}\/\d{2}\/[A-Za-z]{3}\/\d{5}$/}
              errorText="Enter a valid Reg. No."
              placeholder="Enter your Reg. No."
            />
            <Field
              errors={errors}
              name="email"
              type="email"
              placeholder="Enter your student email"
              register={register}
              pattern={/^[a-zA-Z]{2,3}\d{7}\.[a-zA-Z]{3}@buk\.edu\.ng$/}
              errorText="Enter a valid school Email Address"
            />
            <button
              disabled={isSigningUp}
              type="submit"
              className="w-full text-white font-semibold rounded-full h-14 bg-primary text-center">
              {isSigningUp ? <Spinner /> : "Sign In"}
            </button>
          </form>
          <div className="flex gap-2 mt-5 w-full justify-center">
            <p className="text-sm md:text-text-secondary">
              Responding to Emergencies?{" "}
            </p>
            <Link
              to="/admin/sign-in"
              className="text-white md:text-primary text-sm font-semibold">
              Sign in here
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
