"use client";

import { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosCat from "@/utils/helper";

import SocialButton from "../login/SocialButton";
import AuthTerms from "./AuthTerms";

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-sm p-7">
        {/* Logo */}

        <div className="flex items-center gap-2 mb-6">
          <div
            className="
w-8 h-8 
rounded-lg 
bg-indigo-600 
flex items-center 
justify-center 
text-white 
font-bold 
text-sm
"
          >
            S
          </div>

          <span className="font-bold text-slate-900">SupportDesk</span>
        </div>

        <h2 className="text-lg font-bold text-slate-900 mb-1">
          Create Account
        </h2>

        <p className="text-xs text-slate-500 mb-5">
          Join SupportDesk and manage your support easily.
        </p>

        {error && (
          <div
            className="
bg-red-50 
border 
border-red-200 
text-red-600 
text-xs 
rounded-lg 
px-3 
py-2 
mb-4
"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}

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
              Your name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              disabled={loading}
              onChange={handleChange}
              placeholder="Riya Kapoor"
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

          <div className="mb-5">
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

${
  loading
    ? "bg-indigo-300 cursor-not-allowed"
    : "bg-indigo-600 hover:bg-indigo-700 text-white"
}

`}
          >
            {loading ? (
              <>
                <LoaderCircle size={16} className="animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-slate-200" />

          <span
            className="
text-xs 
text-slate-400
"
          >
            or continue with
          </span>

          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <SocialButton
          icon={<FcGoogle size={16} />}
          text="Continue with Google"
        />

        <AuthTerms
          text="Already have an account?"
          actionText="Sign in"
          onClick={() => router.push("/signin")}
        />
      </div>
    </div>
  );
}
