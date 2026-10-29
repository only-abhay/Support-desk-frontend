"use client";

import { useState } from "react";
import {
  BarChart2,
  Inbox,
  Users,
  UserRound,
  BookOpen,
  CreditCard,
  Settings,
} from "lucide-react";

import DashboardShell from "@/components/layout/DashboardShell";
import AdminDashboard from "@/components/admin/AdminDashboard";
import TicketsPage from "@/components/admin/TicketsPage";
import AgentsPage from "@/components/admin/AgentsPage";
import UsersPage from "@/components/admin/UsersPage";
import KnowledgeBasePage from "@/components/admin/KnowledgeBasePage";
import BillingPage from "@/components/admin/BillingPage";
import SettingsPage from "@/components/admin/SettingsPage";

const ITEMS = [
  { key: "overview", label: "Overview", icon: BarChart2 },
  { key: "tickets", label: "Tickets", icon: Inbox },
  { key: "agents", label: "Agents", icon: Users },
  { key: "users", label: "Users", icon: UserRound },
  { key: "kb", label: "Knowledge Base", icon: BookOpen },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "settings", label: "Settings", icon: Settings },
];

const ADMIN_PAGES = {
  overview: AdminDashboard,
  tickets: TicketsPage,
  agents: AgentsPage,
  users: UsersPage,
  kb: KnowledgeBasePage,
  billing: BillingPage,
  settings: SettingsPage,
};

export default function AdminPage() {
  const [active, setActive] = useState("overview");
  const ActivePage = ADMIN_PAGES[active];

  return (
    <DashboardShell
      role="admin"
      items={ITEMS}
      active={active}
      onNavigate={setActive}
    >
      <ActivePage />
    </DashboardShell>
  );
}
