"use client";

import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BrandLogo from "@/components/common/BrandLogo";
import axiosCat from "@/utils/helper";

export default function Sidebar({ role, items, active, onNavigate }) {
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
    <aside className="w-60 shrink-0 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
      <div className="flex items-center gap-2 px-5 py-5">
        <BrandLogo light />
      </div>
      <div className="px-5 mb-2">
        <span className="text-[10px] font-bold tracking-widest text-slate-500">
          {role?.toUpperCase()} PORTAL
        </span>
      </div>
      <nav className="flex-1 px-3 space-y-1">
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
        <div className="flex items-center gap-3 bg-slate-800 rounded-xl px-3 py-2.5 mb-2">
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.[0]?.toUpperCase() || "?"}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400">Signed in</p>
            <p className="truncate text-sm font-semibold text-white">
              {user?.name || "Loading..."}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
