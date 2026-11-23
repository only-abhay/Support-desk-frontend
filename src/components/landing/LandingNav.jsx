"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, LogOut, Menu, X } from "lucide-react";
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

const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "For every team", href: "#for-every-team" },
];

export default function LandingNav() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      setMobileMenuOpen(false);
      toast.success("You have been logged out.");
    } catch (error) {
      console.error("Unable to log out", error);
      toast.error(error.response?.data?.message || "Unable to log out.");
    } finally {
      setLoggingOut(false);
    }
  }

  const workspacePath = userData ? WORKSPACE_PATHS[userData.role] : undefined;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8"
      >
        <Link href="/" aria-label="SupportDesk home" className="shrink-0">
          <BrandLogo />
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {NAV_ITEMS.map(({ label, href }) => (
            <a key={href} className="transition hover:text-indigo-700" href={href}>
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {loading ? (
            <div
              aria-label="Checking account"
              className="hidden h-9 w-28 animate-pulse rounded-xl bg-slate-100 sm:block"
            />
          ) : userData ? (
            <>
              {workspacePath ? (
                <Link
                  href={workspacePath}
                  className="hidden items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 sm:inline-flex"
                >
                  <span>{ROLE_LABELS[userData.role]}</span>
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
                className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 sm:inline-flex"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="inline-flex rounded-xl bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 sm:px-4"
              >
                Get started
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {NAV_ITEMS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-700"
              >
                {label}
              </a>
            ))}

            {loading ? null : userData ? (
              <>
                {workspacePath && (
                  <Link
                    href={workspacePath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white"
                  >
                    {ROLE_LABELS[userData.role]}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-50"
                >
                  <LogOut className="h-4 w-4" />
                  {loggingOut ? "Logging out..." : "Log out"}
                </button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-slate-200 px-3 py-2.5 text-center text-sm font-semibold text-slate-700"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-indigo-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
