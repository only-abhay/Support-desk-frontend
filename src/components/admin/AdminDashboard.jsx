"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

import TopBar from "@/components/layout/TopBar";
import { AGENTS, WEEKLY_CHART_BASE } from "@/lib/data";
import { TicketAll } from "@/utils/GetApi";
import { AgentAll } from "@/utils/GetApi";


export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [Agent, setAgent] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await TicketAll();
        setTickets(response.tickets || []);
      } catch (error) {
        console.log("Fetch Tickets Error:", error);
      }
    };
    const FetchAgents = async () => {
try {
      const response = await AgentAll();
        setAgent(response)
        console.log(response)
} catch (error) {
        console.log("Fetch Tickets Error:", error);
}      
    }
 //
     FetchAgents(),
    fetchTickets();
  }, []);

  const total = tickets.length;
const resolvedTickets = tickets.filter( (ticket) => ticket.status === "Resolved",);
const ActiveAgents = Agent.filter((agent) => agent.status === "active");

  const chartData = [
    ...WEEKLY_CHART_BASE,
    {
      day: "Sun",
      tickets: total || 5,
    },
  ];
  return (
    <>
      <TopBar title="Organization Overview" subtitle="Acme Inc. — Pro Plan" />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {/* KPI Cards */}

        <div className="mb-6 grid grid-cols-4 gap-1.5 sm:gap-2 xl:gap-3">
          <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm sm:p-3">
            <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
              Total
            </p>
            <p className="text-base font-bold text-slate-900 sm:text-[17px]">
              {tickets?.length}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm sm:p-3">
            <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
              Avg Response
            </p>
            <p className="text-base font-bold text-slate-900 sm:text-[17px]">2.4h</p>
            <p className="mt-0.5 text-[9px] font-semibold text-teal-600">-18% faster</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm sm:p-3">
            <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
              Resolved
            </p>
            <p className="text-base font-bold text-slate-900 sm:text-[17px]">
              {resolvedTickets.length}
            </p>
            <p className="mt-0.5 text-[9px] font-semibold text-emerald-600">of all</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm sm:p-3">
            <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
              Agents
            </p>
            <p className="text-base font-bold text-slate-900 sm:text-[17px]">
              {ActiveAgents.length}
            </p>
            <p className="mt-0.5 text-[9px] font-semibold text-amber-600">online</p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {/* Chart */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 xl:col-span-2">
            <p className="mb-4 text-sm font-semibold text-slate-900">
              Tickets resolved — last 7 days
            </p>

            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#F1F5F9"
                  />

                  <XAxis
                    dataKey="day"
                    tick={{
                      fontSize: 11,
                      fill: "#94A3B8",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fontSize: 11,
                      fill: "#94A3B8",
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={24}
                  />

                  <Tooltip
                    cursor={{
                      fill: "#F8FAFC",
                    }}
                  />

                  <Bar dataKey="tickets" radius={[6, 6, 0, 0]} fill="#C7D2FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Agents */}

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="mb-4 text-sm font-semibold text-slate-900">Agents</p>

            <div className="space-y-4">
              {Agent.map((a) => (
                <div key={a.name} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {a.name[0]}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {a.name}
                    </p>

                    <p
                      className={`text-xs ${
                        a.status === "active" ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {a.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
