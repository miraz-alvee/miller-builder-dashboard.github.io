"use client";
import { useRef, useState } from "react";
import Link from "next/link";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    console.log(code);

    // Verify OTP API
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

          <h2 className="font-bebas mt-6 text-center text-lg font-medium uppercase tracking-wide text-[#F2A11E] sm:text-[30px]">
            Verify OTP
          </h2>

          <p className="mt-3 text-center text-sm text-[#63748C]">
            Enter the 6-digit verification code sent to your email.
          </p>

          <form onSubmit={handleSubmit} className="mt-10">
            <div className="flex justify-between gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="font-bebas h-14 w-14 rounded-md border border-[#E5E7EB] bg-[#F4F6F8] text-center text-2xl text-[#333333] outline-none transition focus:border-[#F2A11E] focus:bg-white focus:ring-2 focus:ring-[#F2A11E]"
                />
              ))}
            </div>
            <Link href="/reset-password">
              <button
                type="submit"
                className="cursor-pointer mt-10 w-full rounded-md bg-[#F2A11E] py-3.5 text-xs font-bold uppercase tracking-widest text-[#F4F6F8] transition-colors hover:bg-[#dc9418]"
              >
                Verify OTP
              </button>
            </Link>
            <div className="mt-6 text-center">
              <p className="text-sm text-[#63748C]">
                Didn&apos;t receive the code?
              </p>

              <button
                type="button"
                className="cursor-pointer font-bebas mt-2 text-sm uppercase tracking-wide text-[#F2A11E] hover:underline"
              >
                Resend OTP
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/forgot-password"
                className="font-bebas text-sm uppercase tracking-wide text-[#63748C] hover:text-[#F2A11E]"
              >
                ← Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
