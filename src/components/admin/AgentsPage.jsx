"use client";

import { useEffect, useState } from "react";
import {
  ClipboardPlus,
  LoaderCircle,
  Power,
  UserRound,
  UserRoundCheck,
  X,
} from "lucide-react";
import {
  AgentAll,
  AssignTicket,
  TicketAll,
  UpdateAgentStatus,
} from "@/utils/GetApi";
import EmptyState from "@/components/common/EmptyState";
import LoadingState from "@/components/common/LoadingState";
import TopBar from "@/components/layout/TopBar";

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(true);
  const [agentsError, setAgentsError] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [ticketsError, setTicketsError] = useState("");
  const [assigningTicketId, setAssigningTicketId] = useState("");
  const [updatingAgentId, setUpdatingAgentId] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    async function loadAgents() {
      try {
        setAgents(await AgentAll());
      } catch (error) {
        console.error("Unable to load agents", error);
        setAgentsError(error.response?.data?.message || error.message);
      } finally {
        setLoadingAgents(false);
      }
    }

    loadAgents();
  }, []);

  async function openAssignmentDialog(agent) {
    setSelectedAgent(agent);
    setTickets([]);
    setTicketsError("");
    setLoadingTickets(true);

    try {
      const response = await TicketAll();
      if (!response.success) {
        throw new Error(response.message || "Unable to load tickets.");
      }
      setTickets((response.tickets || []).filter((ticket) => !ticket.assignedTo));
    } catch (error) {
      console.error("Unable to load unassigned tickets", error);
      setTicketsError(error.message || "Unable to load tickets.");
    } finally {
      setLoadingTickets(false);
    }
  }

  async function assignTicket(ticketId) {
    setAssigningTicketId(ticketId);
    setTicketsError("");

    try {
      const response = await AssignTicket({
        ticketId,
        agentId: selectedAgent._id,
      });
      if (!response.success) {
        throw new Error(response.message || "Unable to assign ticket.");
      }
      setTickets((currentTickets) =>
        currentTickets.filter((ticket) => ticket._id !== ticketId),
      );
    } catch (error) {
      console.error("Unable to assign ticket", error);
      setTicketsError(
        error.response?.data?.message || error.message || "Unable to assign ticket.",
      );
    } finally {
      setAssigningTicketId("");
    }
  }

  async function toggleAgentStatus(agent) {
    const status = agent.status === "active" ? "inactive" : "active";
    setUpdatingAgentId(agent._id);
    setActionError("");

    try {
      const response = await UpdateAgentStatus({ agentId: agent._id, status });
      if (!response.success) {
        throw new Error(response.message || "Unable to update agent status.");
      }
      setAgents((currentAgents) =>
        currentAgents.map((currentAgent) =>
          currentAgent._id === agent._id ? response.agent : currentAgent,
        ),
      );
    } catch (error) {
      console.error("Unable to update agent status", error);
      setActionError(
        error.response?.data?.message ||
          error.message ||
          "Unable to update agent status.",
      );
    } finally {
      setUpdatingAgentId("");
    }
  }

  return (
    <>
      <TopBar title="Agents" subtitle="Monitor your support team" />
      <main className="flex-1 bg-slate-50 p-6 lg:p-8">
        {actionError && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700"
          >
            {actionError}
          </p>
        )}
        {loadingAgents ? (
          <LoadingState message="Loading agents..." />
        ) : agentsError ? (
          <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {agentsError}
          </p>
        ) : (
          <>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Total Agents", value: agents.length, color: "text-slate-900" },
                {
                  label: "Active Agents",
                  value: agents.filter((agent) => agent.status === "active").length,
                  color: "text-emerald-600",
                },
                {
                  label: "Inactive Agents",
                  value: agents.filter((agent) => agent.status !== "active").length,
                  color: "text-slate-500",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <p className="mb-1 text-xs text-slate-500">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
            {agents.length === 0 ? (
              <EmptyState message="No agents found." />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {agents.map((agent) => {
                  const isAvailable = agent.availability === "online";
                  const isActive = agent.status === "active";
                  return (
                    <article
                      key={agent._id}
                      className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                          {isAvailable ? (
                            <UserRoundCheck size={18} />
                          ) : (
                            <UserRound size={18} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h2 className="truncate font-semibold text-slate-900">
                            {agent.name}
                          </h2>
                          <p className="truncate text-sm text-slate-500">
                            {agent.email}
                          </p>
                          <span
                            className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              isActive
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => toggleAgentStatus(agent)}
                          disabled={Boolean(updatingAgentId)}
                          aria-label={`${isActive ? "Deactivate" : "Activate"} ${agent.name}`}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                          {updatingAgentId === agent._id ? (
                            <LoaderCircle size={16} className="animate-spin" />
                          ) : (
                            <Power size={16} />
                          )}
                          {isActive ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          type="button"
                          onClick={() => openAssignmentDialog(agent)}
                          disabled={!isActive}
                          title={!isActive ? "Activate this agent to assign tickets." : undefined}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
                        >
                          <ClipboardPlus size={16} />
                          Assign ticket
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="assign-ticket-title"
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
          >
            <header className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2
                  id="assign-ticket-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  Assign a ticket
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select an unassigned ticket for {selectedAgent.name}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAgent(null)}
                aria-label="Close ticket assignment"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </header>
            <div className="overflow-y-auto p-6">
              {ticketsError && (
                <p
                  role="alert"
                  className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                >
                  {ticketsError}
                </p>
              )}
              {loadingTickets ? (
                <LoadingState message="Loading unassigned tickets..." />
              ) : tickets.length === 0 && !ticketsError ? (
                <EmptyState message="There are no unassigned tickets right now." />
              ) : (
                <div className="divide-y divide-slate-100">
                  {tickets.map((ticket) => (
                    <article
                      key={ticket._id}
                      className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-slate-800">
                          {ticket.subject}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {ticket.userId?.name || "Customer"} · {ticket.category}
                          {" · "}
                          {ticket.priority}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {ticket.status}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => assignTicket(ticket._id)}
                        disabled={Boolean(assigningTicketId)}
                        className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {assigningTicketId === ticket._id ? (
                          <LoaderCircle size={16} className="animate-spin" />
                        ) : null}
                        Assign
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
