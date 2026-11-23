"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import AgentDashboard from "@/components/agent/AgentDashboard";

const ITEMS = [{ key: "queue", label: "Ticket Queue", icon: Inbox }];

export default function AgentPage() {
  const [active, setActive] = useState("queue");

  return (
    <DashboardShell
      role="agent"
      items={ITEMS}
      active={active}
      onNavigate={setActive}
    >
      <AgentDashboard />
    </DashboardShell>
  );
}
