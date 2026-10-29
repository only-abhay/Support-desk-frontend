"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, LogOut } from "lucide-react";
import { toast } from "sonner";
import BrandLogo from "@/components/common/BrandLogo";
import axiosCat from "@/utils/helper";

const WORKSPACE_PATHS = {
  admin: "/admin",
  agent: "/agent",
  customer: "/customer",
};

const ROLE_LABELS = {
  admin: "Admin workspace",
  agent: "Agent workspace",
  customer: "My tickets",
};

export default function LandingNav() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const response = await axiosCat.get("/auth/me");
        if (active) setUserData(response.data.user);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Unable to load signed-in user", error);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadUser();
    return () => {
      active = false;
    };
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await axiosCat.get("/auth/logout/user");
      setUserData(null);
      toast.success("You have been logged out.");
    } catch (error) {
      console.error("Unable to log out", error);
      toast.error(error.response?.data?.message || "Unable to log out.");
    } finally {
      setLoggingOut(false);
    }
  }

  const workspacePath = userData
    ? WORKSPACE_PATHS[userData.role]
    : undefined;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" aria-label="SupportDesk home">
          <BrandLogo />
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a className="transition hover:text-indigo-700" href="#features">
            Features
          </a>
          <a className="transition hover:text-indigo-700" href="#how-it-works">
            How it works
          </a>
          <a className="transition hover:text-indigo-700" href="#for-every-team">
            For every team
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {loading ? (
            <div
              aria-label="Checking account"
              className="h-9 w-28 animate-pulse rounded-xl bg-slate-100"
            />
          ) : userData ? (
            <>
              {workspacePath ? (
                <Link
                  href={workspacePath}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 sm:px-4"
                >
                  <span className="hidden sm:inline">
                    {ROLE_LABELS[userData.role]}
                  </span>
                  <span className="sm:hidden">My account</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ) : (
                <span className="hidden text-sm font-medium text-slate-600 sm:inline">
                  Hi, {userData.name}
                </span>
              )}
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                aria-label="Log out"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 sm:px-4"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
