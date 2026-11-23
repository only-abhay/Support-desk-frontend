"use client";

import { useState } from "react";
import { Eye, EyeOff, Apple, LoaderCircle, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import SocialButton from "./SocialButton";
import BrandLogo from "@/components/common/BrandLogo";
import axiosCat from "@/utils/helper";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosCat.post(
        "/auth/login",
        { ...form },
        {
          withCredentials: true,
        },
      );

      toast.success("Login Successful", {
        position: "top-right",
      });

      setForm({
        email: "",
        password: "",
      });

      const data = response.data.data;
      if (!data?.role) {
        throw new Error("Unable to determine account role");
      }
      if (data.role === "admin") {
        router.push("/admin");
      } else if (data.role === "customer") {
        router.push("/customer");
      } else {
        router.push("/agent");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login Failed", {
        position: "top-right",
      });
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
              Support desk
            </span>

            <h1 className="mt-6 max-w-md text-4xl font-semibold tracking-tight text-white">
              Welcome back to the workspace your team already uses.
            </h1>

            <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
              Track every support request, keep the conversation moving, and stay aligned with your customers in one place.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { value: "12k+", label: "tickets" },
                { value: "4.9/5", label: "satisfaction" },
                { value: "2.4h", label: "avg response" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm sm:p-3">
                  <p className="text-base font-bold text-white sm:text-[17px]">{stat.value}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-slate-300">{stat.label}</p>
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
                Account
              </span>
              <span className="text-lg font-bold text-slate-900">SupportDesk</span>
            </div>
          </div>

          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
            <p className="mt-1 text-sm text-slate-500">Sign in to your account to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex items-center justify-end">
              <button type="button" className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700">
                Forgot password?
              </button>
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
                  Signing in...
                </>
              ) : (
                <>
                  Login
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
            <SocialButton icon={<Apple size={16} />} text="Continue with Apple" />
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account? {" "}
            <Link href="/register" className="font-semibold text-indigo-600 transition hover:text-indigo-700">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
