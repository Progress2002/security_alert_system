import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { useForm, type SubmitHandler } from "react-hook-form";
import Field from "../components/StudentsField";

export interface signInFormInputs {
  regNumber: string;
  email: string;
}

export default function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<signInFormInputs>({
    mode: "onChange",
  });

  const submitFn: SubmitHandler<signInFormInputs> = (data) => {
    console.log(data);
  };

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
      <section className="w-full flex justify-center flex-col md:basis-1/2 md:h-full py-10 relative">
        <Logo styles="absolute top-10 left-10" />
        <div className="mt-5 mx-auto w-2/3 ">
          <h2 className="text-4xl text-text-primary font-bold">Sign In</h2>
          <p className="mt-2 text-text-secondary">
            Login to start reporting incidents.
          </p>
        </div>
        <div className="flex h-1/2 mt-14 flex-col  mx-auto w-2/3  justify-between ">
          <form
            className="flex gap-6 flex-col"
            onSubmit={handleSubmit(submitFn)}
          >
            <Field
              errors={errors}
              name="regNumber"
              type="text"
              register={register}
              pattern={/^[A-Z]{3}\/\d{2}\/[A-Z]{3}\/\d{5}$/}
              errorText="Enter a valid Registration Number"
              placeholder="Enter your Registration Number"
            />
            <Field
              errors={errors}
              name="email"
              type="email"
              placeholder="Enter your school Email"
              register={register}
              pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              errorText="Enter a valid Email Address"
            />
            <button
              type="submit"
              className="w-full text-white font-semibold rounded-full h-14 bg-primary text-center"
            >
              Sign In
            </button>
          </form>
          <div className="flex gap-2 w-full justify-center">
            <p className="text-sm text-text-secondary">
              Responding to Emergencies?{" "}
            </p>
            <Link
              to="/admin/sign-in"
              className="text-primary text-sm font-semibold"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
