"use client";

import { LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BrandLogo from "@/components/common/BrandLogo";
import axiosCat from "@/utils/helper";

export default function Sidebar({ role, items, active, onNavigate, onClose }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await axiosCat.get("/auth/me");
        setUser(response.data.user);
      } catch (error) {
        console.error("Unable to load signed-in user", error);
      }
    }

    loadUser();
  }, []);

  async function handleLogout() {
    try {
      await axiosCat.get("/auth/logout/user");
      router.push("/login");
    } catch (error) {
      console.error("Unable to log out", error);
    }
  }

  return (
    <aside className="flex h-full w-full shrink-0 flex-col overflow-hidden bg-slate-900 text-slate-300 shadow-xl lg:shadow-none">
      <div className="flex items-center justify-between gap-2 px-5 py-5">
        <BrandLogo light />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <div className="px-5 pb-2">
        <span className="text-[10px] font-bold tracking-widest text-slate-500">
          {role?.toUpperCase()} PORTAL
        </span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;

          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl bg-slate-800 px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
            {user?.name?.[0]?.toUpperCase() || "?"}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
              Signed in
            </p>
            <p className="truncate text-sm font-semibold text-white">
              {user?.name || "Loading..."}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
