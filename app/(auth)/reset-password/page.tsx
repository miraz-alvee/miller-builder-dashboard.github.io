"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    console.log("Reset Password:", data);
    router.push("/");
    // Call your reset password API here
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
        <div className="relative z-10 w-full max-w-md">
          <h1 className="font-bebas text-center text-4xl font-black uppercase tracking-tight text-neutral-900 sm:text-5xl">
            Proof App
          </h1>

          <h2 className="font-bebas mt-6 text-center text-lg font-medium uppercase leading-[130%] tracking-wide text-[#F2A11E] sm:text-[30px]">
            Reset Password
          </h2>

          <p className="mt-3 text-center text-sm text-[#63748C]">
            Create a new password for your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8" noValidate>
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="font-bebas mb-2 block text-[15px] font-medium uppercase tracking-wide text-[#333333]"
              >
                New Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                  className="normal-case w-full rounded-md bg-[#F4F6F8] px-4 py-3 pr-11 text-xs font-medium text-[#63748C] placeholder:text-neutral-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#F0A421]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
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

            {/* Confirm Password */}
            <div className="mt-5">
              <label
                htmlFor="confirmPassword"
                className="font-bebas mb-2 block text-[15px] font-medium uppercase tracking-wide text-[#333333]"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  aria-invalid={!!errors.confirmPassword}
                  {...register("confirmPassword")}
                  className="normal-case w-full rounded-md bg-[#F4F6F8] px-4 py-3 pr-11 text-xs font-medium text-[#63748C] placeholder:text-neutral-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#F0A421]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer mt-8 w-full rounded-md bg-[#F2A11E] py-3.5 text-xs font-bold uppercase tracking-widest text-[#F4F6F8] transition-colors hover:bg-[#dc9418] disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#F0A421] focus:ring-offset-2"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>

            <div className="mt-6 text-center">
              <Link
                href="/sign-in"
                className="font-bebas text-sm uppercase tracking-wide text-[#63748C] hover:text-[#F2A11E]"
              >
                ← Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
