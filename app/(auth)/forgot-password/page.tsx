"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function ForgotPassword() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log("Sign in form submitted:", data);

    router.push("/verify-otp");
  };

  return (
    <div className="min-h-screen w-full">
      <div
        className="relative flex min-h-screen w-full items-center justify-center px-6 py-10 lg:px-12"
        style={{
          backgroundImage: "url('/images/Ellipse.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="relative z-10 w-full max-w-md ">
          <h1 className="font-bebas text-center font-black uppercase tracking-tight text-neutral-900 text-4xl sm:text-5xl">
            Proof App
          </h1>
          <h2 className="font-bebas mt-6 text-center text-lg font-medium uppercase leading-[130%] text-[#F2A11E] tracking-wide sm:text-[30px]">
            Reset your password
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 " noValidate>
            <div className="mt-6">
              <label
                htmlFor="email"
                className="font-bebas mb-2 block text-[15px] font-medium leading-normal uppercase tracking-wide text-[#333333]"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address here"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
                className="normal-case text-[#63748C] font-medium w-full rounded-md bg-[#F4F6F8] px-4 py-3 text-xs placeholder:text-neutral-400 outline-none ring-0 focus:bg-white focus:ring-2 focus:ring-[#F0A421]"
              />
              {errors.email && (
                <p
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer mt-4 w-full rounded-md bg-[#F2A11E] py-3.5 text-xs font-bold uppercase tracking-widest text-[#F4F6F8] transition-colors hover:bg-[#dc9418] disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#F0A421] focus:ring-offset-2"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
