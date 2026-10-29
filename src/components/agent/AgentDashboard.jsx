"use client";

import { useEffect, useState } from "react";

import TopBar from "@/components/layout/TopBar";
import StatusPill from "@/components/ui/StatusPill";
import EmptyState from "@/components/common/EmptyState";
import LoadingState from "@/components/common/LoadingState";
import TicketDetailModal from "./TicketDetailModal";
import {
  AssignedTickets,
  UpdateAssignedTicketStatus,
} from "@/utils/GetApi";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "Open", label: "Open" },
  { value: "In Progress", label: "In Progress" },
  { value: "Resolved", label: "Resolved" },
];

const PRIORITY_STYLES = {
  low: "text-emerald-600",
  medium: "text-amber-600",
  high: "text-red-600",
  urgent: "text-red-700",
};

export default function AgentDashboard() {
  const [tickets, setTickets] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [updatingTicketId, setUpdatingTicketId] = useState("");

  useEffect(() => {
    async function loadTickets() {
      try {
        setTickets(await AssignedTickets());
      } catch (error) {
        console.error("Unable to load assigned tickets", error);
        setLoadError(
          error.response?.data?.message ||
            error.message ||
            "Unable to load tickets.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

  async function handleStatusChange(ticketId, newStatus) {
    setUpdatingTicketId(ticketId);
    setStatusError("");

    try {
      const response = await UpdateAssignedTicketStatus({
        ticketId,
        status: newStatus,
      });
      if (!response.success) {
        throw new Error(response.message || "Unable to update ticket status.");
      }
      setTickets((currentTickets) =>
        currentTickets.map((ticket) =>
          ticket._id === ticketId
            ? { ...ticket, status: newStatus }
            : ticket,
        ),
      );
    } catch (error) {
      console.error("Unable to update ticket status", error);
      setStatusError(
        error.response?.data?.message ||
          error.message ||
          "Unable to update ticket status.",
      );
    } finally {
      setUpdatingTicketId("");
    }
  }

  const counts = {
    all: tickets.length,
    Open: tickets.filter((ticket) => ticket.status === "Open").length,
    "In Progress": tickets.filter(
      (ticket) => ticket.status === "In Progress",
    ).length,
    Resolved: tickets.filter((ticket) => ticket.status === "Resolved").length,
  };

  const visibleTickets = tickets.filter(
    (ticket) =>
      selectedFilter === "all" || ticket.status === selectedFilter,
  );
  const selectedTicket = tickets.find(
    (ticket) => ticket._id === selectedTicketId,
  );

  function openTicket(ticketId) {
    setStatusError("");
    setSelectedTicketId(ticketId);
  }

  function closeTicket() {
    setSelectedTicketId(null);
    setStatusError("");
  }

  return (
    <>
      <TopBar
        title="Ticket Queue"
        subtitle={`${counts.Open} open — ${counts["In Progress"]} in progress`}
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex gap-2 mb-5 flex-wrap">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setSelectedFilter(value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                selectedFilter === value
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-slate-300 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {label} ({counts[value]})
            </button>
          ))}
        </div>

        {loadError ? (
          <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {loadError}
          </p>
        ) : loading ? (
          <LoadingState message="Loading tickets..." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <div className="min-w-[950px]">
              <div className="grid grid-cols-[190px_220px_minmax(260px,1fr)_100px_120px] gap-3 px-5 py-3 border-b border-slate-100 text-[10px] font-bold text-slate-400 tracking-wide">
                <span>Ticket</span>
                <span>Customer</span>
                <span>Subject</span>
                <span>Priority</span>
                <span>Status</span>
              </div>

              {visibleTickets.length === 0 ? (
                <EmptyState message="No tickets in this view." />
              ) : (
                visibleTickets.map((ticket) => (
                  <button
                    key={ticket._id}
                    type="button"
                    onClick={() => openTicket(ticket._id)}
                    className="grid w-full grid-cols-[190px_220px_minmax(260px,1fr)_100px_120px] gap-3 border-b border-slate-50 px-5 py-3.5 text-left last:border-0 hover:bg-slate-50"
                  >
                    <span className="whitespace-nowrap text-xs text-slate-400">
                      #{ticket._id}
                    </span>
                    <span className="whitespace-nowrap text-sm text-slate-700">
                      {ticket.userId?.name || "Customer"}
                    </span>
                    <span className="whitespace-normal break-words text-sm font-semibold text-slate-800">
                      {ticket.subject}
                    </span>
                    <span
                      className={`text-xs font-bold capitalize ${PRIORITY_STYLES[ticket.priority?.toLowerCase()] || "text-slate-600"}`}
                    >
                      {ticket.priority}
                    </span>
                    <StatusPill status={ticket.status} />
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={closeTicket}
          onUpdateStatus={handleStatusChange}
          isUpdatingStatus={updatingTicketId === selectedTicket._id}
          statusError={statusError}
        />
      )}
    </>
  );
}
