"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Apple, LoaderCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import SocialButton from "./SocialButton";
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
      toast.error(
        err?.response?.data?.message || "Login Failed",

        {
          position: "top-right",
        },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
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

        <div className="flex items-center gap-2 mb-6">
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

        <h2
          className="
text-lg
font-bold
text-slate-900
mb-1
"
        >
          Welcome back
        </h2>

        <p
          className="
text-xs
text-slate-500
mb-5
"
        >
          Sign in to your account to continue.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}

          <div className="mb-4">
            <label
              className="
text-xs
font-semibold
text-slate-700
block
mb-1.5
"
            >
              Email address
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              disabled={loading}
              onChange={handleChange}
              placeholder="you@email.com"
              className="
w-full
border
border-slate-300
rounded-lg
px-3
py-2
text-sm
outline-none
focus:ring-2
focus:ring-indigo-500
focus:border-indigo-500
disabled:bg-slate-50
"
            />
          </div>

          {/* Password */}

          <div className="mb-2">
            <label
              className="
text-xs
font-semibold
text-slate-700
block
mb-1.5
"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                disabled={loading}
                onChange={handleChange}
                placeholder="••••••••"
                className="
w-full
border
border-slate-300
rounded-lg
px-3
py-2
pr-10
text-sm
outline-none
focus:ring-2
focus:ring-indigo-500
focus:border-indigo-500
disabled:bg-slate-50
"
              />

              <button
                type="button"
                disabled={loading}
                onClick={() => setShowPassword(!showPassword)}
                className="
absolute
right-3
top-1/2
-translate-y-1/2
text-slate-400
"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div
            className="
text-right
text-xs
text-indigo-600
mb-5
cursor-pointer
hover:text-indigo-700
"
          >
            Forgot password?
          </div>

          <button
            type="submit"
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
gap-2
transition
mb-4

${loading
                ? "bg-indigo-300 cursor-not-allowed text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }

`}
          >
            {loading ? (
              <>
                <LoaderCircle size={16} className="animate-spin" />
                Signing in...
              </>
            ) : (
              `Login`
            )}
          </button>
        </form>

        <div
          className="
flex
items-center
gap-2
mb-4
"
        >
          <div
            className="
flex-1
h-px
bg-slate-200
"
          />

          <span
            className="
text-xs
text-slate-400
"
          >
            or continue with
          </span>

          <div
            className="
flex-1
h-px
bg-slate-200
"
          />
        </div>

        <SocialButton
          icon={<FcGoogle size={16} />}
          text="Continue with Google"
        />

        <SocialButton icon={<Apple size={16} />} text="Continue with Apple" />

        <p
          className="
text-center
text-xs
text-slate-400
mt-4
"  >
          Don&apos;t have an account?{" "}
          <Link href="/register" className="
text-indigo-600
font-semibold
hover:text-indigo-700
">
            Create one free
          </Link>
        </p>
      </div>
    </div> );}
