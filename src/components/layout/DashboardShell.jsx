"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function DashboardShell({
  role,
  items,
  active,
  onNavigate,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleNavigate(key) {
    onNavigate(key);
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 lg:flex lg:h-screen lg:overflow-hidden">
      <div
        aria-hidden={!sidebarOpen}
        className={`fixed inset-0 z-30 bg-slate-950/50 transition-opacity lg:hidden ${
          sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed inset-y-0 left-0 z-40 w-[260px] transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:w-[260px] lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar
          role={role}
          items={items}
          active={active}
          onNavigate={handleNavigate}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col lg:h-screen lg:overflow-hidden">
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-sm lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen((current) => !current)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            Menu
          </button>
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
