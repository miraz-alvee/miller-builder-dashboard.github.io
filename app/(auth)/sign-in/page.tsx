"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z.string().min(1, "Password is required"),

  agreed: z.boolean().optional(),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      agreed: false,
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log("Sign in form submitted:", data);

    router.push("/");
  };

  return (
    <div className=" min-h-screen w-full">
      {/* Right Form */}
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
          <h2 className="font-bebas mt-6 text-center text-lg font-medium uppercase leading-[130%] tracking-wide text-[#F2A11E] sm:text-[30px]">
            Sign in to your account
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

            <div className="mt-5">
              <label
                htmlFor="password"
                className="font-bebas mb-2 block text-[15px] font-medium leading-normal uppercase tracking-wide text-[#333333]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                  className="normal-case text-[#63748C] font-medium w-full rounded-md bg-[#F4F6F8] px-4 py-3 pr-11 text-xs placeholder:text-neutral-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#F0A421]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between gap-2">
              <label className="mt-5 flex items-start gap-2 text-xs text-[#333333]">
                <input
                  type="checkbox"
                  aria-invalid={!!errors.agreed}
                  {...register("agreed")}
                  className="h-4 w-4 rounded border-2 border-neutral-300 text-[#F0A421]"
                />
                <span className="mt-0.5 font-bebas text-[#63748C] text-xs font-medium leading-[100%]">
                  Remember Password
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="cursor-pointer mt-6 font-bebas text-[#63748C] text-xs font-medium leading-[100%]"
              >
                Forget Password?
              </Link>
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
