"use client";

import { useState } from "react";

import { Inbox, MessageCircle, BookOpen, Settings } from "lucide-react";

import DashboardShell from "@/components/layout/DashboardShell";
import CustomerDashboard from "@/components/customer/CustomerDashboard";
import LiveChatPage from "@/components/customer/LiveChatPage";
import KnowledgeBasePage from "@/components/customer/KnowledgeBasePage";
import SettingsPage from "@/components/customer/SettingsPage";

const ITEMS = [
  { key: "tickets", label: "My Tickets", icon: Inbox },
  { key: "chat", label: "Live Chat", icon: MessageCircle },
  { key: "kb", label: "Knowledge Base", icon: BookOpen },
  { key: "settings", label: "Settings", icon: Settings },
];

const CUSTOMER_PAGES = {
  tickets: CustomerDashboard,
  chat: LiveChatPage,
  kb: KnowledgeBasePage,
  settings: SettingsPage,
};

export default function CustomerPage() {
  const [active, setActive] = useState("tickets");
  const ActivePage = CUSTOMER_PAGES[active];

  return (
    <DashboardShell
      role="customer"
      items={ITEMS}
      active={active}
      onNavigate={setActive}
    >
      <ActivePage />
    </DashboardShell>
  );
}
