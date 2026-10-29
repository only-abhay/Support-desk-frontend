"use client";

import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import axiosCat from "@/utils/helper";

export default function OtpVerification() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const inputs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  // OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // next input focus
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  // Backspace handle
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Please enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosCat.post("/auth/verify-otp", {
        email,
        otp: finalOtp,
      });

      toast.success(res?.data?.message || "OTP Verified Successfully");

      router.push("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-58px)] bg-slate-50 flex items-center justify-center px-6">
      <div
        className="
    w-full
    max-w-sm
    bg-white
    border
    border-slate-200
    rounded-2xl
    shadow-sm
    p-7
  "
      >
        {/* Logo */}

        <div className="flex items-center gap-2 mb-8">
          <div
            className="
        w-8
        h-8
        rounded-lg
        bg-indigo-600
        flex
        items-center
        justify-center
        text-white
        font-bold
        text-sm
      "
          >
            S
          </div>

          <span
            className="
        font-bold
        text-slate-900
      "
          >
            SupportDesk
          </span>
        </div>

        {/* Back */}

        <Link
          href="/register"
          className="
        inline-flex
        items-center
        gap-2
        text-xs
        text-slate-500
        hover:text-indigo-600
        mb-6
        transition
      "
        >
          <ArrowLeft size={15} />
          Back
        </Link>

        <h1
          className="
      text-xl
      font-bold
      text-slate-900
    "
        >
          Verify your email
        </h1>

        <p
          className="
      text-sm
      text-slate-500
      mt-2
      mb-7
      leading-relaxed
    "
        >
          Enter the 6-digit verification code sent to
          <br />
          <span
            className="
        text-indigo-600
        font-semibold
      "
          >
            {email}
          </span>
        </p>

        {/* OTP BOXES */}

        <div
          className="
      flex
      justify-between
      gap-2
      mb-7
    "
        >
          {otp.map((item, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              value={item}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="
            w-12
            h-12
            sm:w-14
            sm:h-14
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            text-center
            text-lg
            font-semibold
            text-slate-900
            outline-none
            transition

            focus:bg-white
            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-100
          "
            />
          ))}
        </div>

        {/* Verify Button */}

        <button
          onClick={handleVerifyOtp}
          disabled={loading}
          className={`
        w-full
        py-2.5
        rounded-lg
        text-sm
        font-semibold
        flex
        items-center
        justify-center
        transition

        ${
          loading
            ? "bg-indigo-300 cursor-not-allowed text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }

      `}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}

        <div
          className="
      text-center
      mt-7
    "
        >
          <p
            className="
        text-xs
        text-slate-500
      "
          >
            Didn&apos;t receive the code?
          </p>

          <button
            className="
          mt-2
          text-sm
          font-semibold
          text-indigo-600
          hover:text-indigo-700
          transition
        "
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}
