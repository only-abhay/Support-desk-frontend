"use client";

import { useState } from "react";
import { Eye, EyeOff, LoaderCircle, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosCat from "@/utils/helper";

import SocialButton from "../login/SocialButton";
import AuthTerms from "./AuthTerms";
import BrandLogo from "@/components/common/BrandLogo";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      return "Name is required";
    }

    if (!form.email.trim()) {
      return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      return "Enter valid email";
    }

    if (!form.password) {
      return "Password is required";
    }

    if (form.password.length < 6) {
      return "Password must be minimum 6 characters";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axiosCat.post("/auth/signup", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      const email = form.email;

      setForm({
        name: "",
        email: "",
        password: "",
        number: "",
      });

      toast.success(response?.data?.message || "Account created successfully");
      router.push(`/verify-otp?email=${email}`);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Signup failed. Please try again";

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eef2ff_0%,_#f8fafc_35%,_#f1f5f9_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden lg:block">
          <div className="rounded-[28px] border border-indigo-100 bg-slate-900 p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
            <div className="mb-6 flex items-center gap-3">
              <BrandLogo light />
            </div>

            <span className="inline-flex rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-indigo-100">
              New account
            </span>

            <h1 className="mt-6 max-w-md text-4xl font-semibold tracking-tight text-white">
              Start smarter support, without the chaos.
            </h1>

            <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
              Create your support workspace in minutes and make every ticket easier to manage, reply to, and resolve.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Organize customer requests in one place",
                "Stay on top of updates and ownership",
                "Give your team a clearer support flow",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-sm text-emerald-300">
                    ✓
                  </span>
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-base font-bold text-white shadow-lg shadow-indigo-200">
              S
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Create
              </span>
              <span className="text-lg font-bold text-slate-900">SupportDesk</span>
            </div>
          </div>

          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
            <p className="mt-1 text-sm text-slate-500">Join SupportDesk and manage your support easily.</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">Your name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                disabled={loading}
                onChange={handleChange}
                placeholder="Riya Kapoor"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                disabled={loading}
                onChange={handleChange}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  disabled={loading}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-11 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-100"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
                loading ? "cursor-not-allowed bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="space-y-3">
            <SocialButton icon={<FcGoogle size={16} />} text="Continue with Google" />
          </div>

          <AuthTerms
            text="Already have an account?"
            actionText="Sign in"
            onClick={() => router.push("/login")}
          />
        </div>
      </div>
    </div>
  );
}

