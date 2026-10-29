"use client";

import Sidebar from "./Sidebar";

export default function DashboardShell({
  role,
  items,
  active,
  onNavigate,
  children,
}) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar
        role={role}
        items={items}
        active={active}
        onNavigate={onNavigate}
      />

      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  );
}
