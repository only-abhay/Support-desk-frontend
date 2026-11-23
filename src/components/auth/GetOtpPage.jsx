"use client";

import { ArrowLeft, Check, LoaderCircle, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import axiosCat from "@/utils/helper";
import BrandLogo from "@/components/common/BrandLogo";

export default function OtpVerification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const inputs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, index) => {
    const value = event.target.value;
    if (/^\d{2,6}$/.test(value)) {
      const nextOtp = [...otp];
      [...value].forEach((digit, offset) => {
        if (index + offset < nextOtp.length) {
          nextOtp[index + offset] = digit;
        }
      });
      setOtp(nextOtp);
      inputs.current[Math.min(index + value.length, 6) - 1]?.focus();
      return;
    }
    if (!/^\d?$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    if (value && index < nextOtp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    const pastedOtp = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedOtp) return;

    event.preventDefault();
    setOtp(Array.from({ length: 6 }, (_, index) => pastedOtp[index] || ""));
    inputs.current[Math.min(pastedOtp.length, 6) - 1]?.focus();
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosCat.post("/auth/verify-otp", {
        email,
        otp: finalOtp,
      });

      toast.success(response?.data?.message || "Email verified successfully.");
      router.push("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to verify that code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#eef2ff_0%,_#f8fafc_48%,_#f1f5f9_100%)] px-4 py-10 sm:px-6">
      <div className="w-full max-w-[480px]">
        <div className="mb-6 flex justify-center">
          <BrandLogo />
        </div>

        <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
          <div className="flex justify-center border-b border-indigo-100 bg-indigo-50/70 px-6 py-7">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100">
              <Mail size={29} strokeWidth={1.8} />
              <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-indigo-50 bg-emerald-500 text-white">
                <Check size={13} strokeWidth={3} />
              </span>
            </div>
          </div>

          <div className="px-5 py-7 sm:px-9 sm:py-9">
            <Link
              href="/register"
              className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
            >
              <ArrowLeft size={16} />
              Back to sign up
            </Link>

            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-700">
                <ShieldCheck size={14} />
                Account security
              </span>
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
                Verify your email
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Enter the 6-digit code we sent to
              </p>
              <p className="mx-auto mt-1 max-w-full break-all text-sm font-semibold text-indigo-700">
                {email || "your email address"}
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="mt-8">
              <div className="flex justify-center gap-2.5 sm:gap-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputs.current[index] = element;
                    }}
                    value={digit}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    aria-label={`Verification digit ${index + 1}`}
                    maxLength={1}
                    onChange={(event) => handleChange(event, index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className="h-12 w-10 rounded-xl border border-slate-200 bg-slate-50 text-center text-lg font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 sm:h-14 sm:w-12 sm:text-xl"
                  />
                ))}
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                For your security, this code expires in 3 minutes.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200/70 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    Verifying email...
                  </>
                ) : (
                  "Verify email"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-slate-500">
              Didn&apos;t receive it? Check your spam folder or try signing up again.
            </p>
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-slate-400">
          Secure account verification by SupportDesk
        </p>
      </div>
    </main>
  );
}
