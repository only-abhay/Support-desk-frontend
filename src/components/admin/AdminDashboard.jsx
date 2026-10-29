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

      <div className="p-8 overflow-y-auto flex-1">
        {/* KPI Cards */}

        <div className="grid grid-cols-4 gap-4 mb-6">
            <div
             
              className="bg-white border border-slate-200 rounded-xl p-4"
            >
              <p className="text-xs text-slate-500 mb-1">Total Ticket</p>

              <p className="text-2xl font-bold text-slate-900">{tickets?.length}</p>

              {/* <p className={`text-[11px] font-semibold mt-1 c: "text-indigo-600",`}></p> */}
            </div>
              <div
            
              className="bg-white border border-slate-200 rounded-xl p-4"
            >
              <p className="text-xs text-slate-500 mb-1">Avg Response</p>

              <p className="text-2xl font-bold text-slate-900">2.4h</p>

              <p className={`text-[11px] font-semibold mt-1 text-teal-600`}>-18% faster</p>
            </div>
              <div
         
              className="bg-white border border-slate-200 rounded-xl p-4"
            >
              <p className="text-xs text-slate-500 mb-1">Resolved</p>

              <p className="text-2xl font-bold text-slate-900">{resolvedTickets.length}</p>

              <p className={`text-[11px] font-semibold mt-1 text-emerald-600`}>of all tickets</p>
            </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
               <p className="text-xs text-slate-800 mb-1">Active Agents</p>
              <p className="text-2xl font-bold text-slate-900">{ActiveAgents.length}</p>

              <p className={`text-[11px] font-semibold mt-1 text-amber-600`}>{ActiveAgents.length} online now</p>
            </div>
        </div>


        <div className="grid grid-cols-3 gap-4">
          {/* Chart */}

          <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-semibold text-slate-900 text-sm mb-4">
              Tickets resolved — last 7 days
            </p>

            <ResponsiveContainer width="100%" height={220}>
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

          {/* Agents */}

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-semibold text-slate-900 text-sm mb-4">Agents</p>

            <div className="space-y-4">
              {Agent.map((a) => (
                <div key={a.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {a.name[0]}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {a.name}
                    </p>

                    <p className={`text-xs  ${a.status === "active" ?"text-emerald-600":"text-red-600" }`}>{a.status}</p>
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
