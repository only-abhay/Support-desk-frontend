"use client";

import { useEffect, useState } from "react";
import { Eye, MessageSquareText, Trash2, X } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import StatusPill from "@/components/ui/StatusPill";
import LoadingState from "@/components/common/LoadingState";
import EmptyState from "@/components/common/EmptyState";
import TicketConversation from "@/components/common/TicketConversation";
import { DeleteTicket, TicketAll } from "@/utils/GetApi";

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [deletingTicketId, setDeletingTicketId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const unresolvedTickets = tickets.filter((ticket) => ticket.status !== "Resolved");
  const resolvedTickets = tickets.filter((ticket) => ticket.status === "Resolved");

  useEffect(() => {
    async function loadTickets() {
      try {
        const response = await TicketAll();
        setTickets(response.tickets || []);
      } catch (error) {
        console.error("Unable to load tickets", error);
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

  const handleDeleteTicket = async (ticketId) => {
    const ticketToDelete = tickets.find((ticket) => ticket._id === ticketId);
    const confirmed = window.confirm(
      `Delete ticket "${ticketToDelete?.subject || "this ticket"}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingTicketId(ticketId);
    setDeleteError("");

    try {
      const response = await DeleteTicket(ticketId);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to delete this ticket.");
      }

      setTickets((currentTickets) =>
        currentTickets.filter((ticket) => ticket._id !== ticketId),
      );

      if (selectedTicket?._id === ticketId) {
        setSelectedTicket(null);
      }
    } catch (error) {
      setDeleteError(error.message || "Unable to delete this ticket.");
    } finally {
      setDeletingTicketId(null);
    }
  };

  return (
    <>
      <TopBar title="Tickets" subtitle="View and manage every support request" />

      <main className="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-8">
        <div className="mb-6 grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3">
          <div className="rounded-lg border border-indigo-100 bg-gradient-to-br from-indigo-600 to-violet-600 p-2.5 text-white shadow-sm sm:p-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-indigo-100">Open</p>
            <p className="mt-1 text-base font-bold sm:text-[17px]">{unresolvedTickets.length}</p>
          </div>
          <div className="rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 text-white shadow-sm sm:p-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-emerald-100">Resolved</p>
            <p className="mt-1 text-base font-bold sm:text-[17px]">{resolvedTickets.length}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm sm:p-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Total</p>
            <p className="mt-1 text-base font-bold text-slate-900 sm:text-[17px]">{tickets.length}</p>
          </div>
        </div>

        <div className="space-y-6">
          {[
            { title: "Tickets to Resolve", items: unresolvedTickets },
            { title: "Resolved Tickets", items: resolvedTickets },
          ].map(({ title, items }) => (
            <section
              key={title}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-sm font-semibold text-slate-800">
                  {title} <span className="text-slate-400">({items.length})</span>
                </h2>
              </div>

              {loading ? (
                <LoadingState message="Loading tickets..." />
              ) : items.length === 0 ? (
                <EmptyState
                  message={
                    title === "Resolved Tickets"
                      ? "No resolved tickets."
                      : "No tickets to resolve."
                  }
                />
              ) : (
                <div className="divide-y divide-slate-100">
                  {items.map((ticket) => (
                    <div key={ticket._id} className="px-5 py-4">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-base font-semibold text-slate-900">
                              {ticket.subject}
                            </p>
                            <StatusPill status={ticket.status} />
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">
                              {ticket.category}
                            </span>
                            <span>•</span>
                            <span>{ticket.userId?.name || "Customer"}</span>
                            <span>•</span>
                            <span>{ticket.assignedTo ? ticket.assignedTo.name : "Unassigned"}</span>
                          </div>

                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                            {ticket.issue || "No issue description provided."}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedTicket(ticket)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700"
                          >
                            <Eye size={14} />
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTicket(ticket._id)}
                            disabled={deletingTicketId === ticket._id}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Trash2 size={14} />
                            {deletingTicketId === ticket._id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                        <MessageSquareText size={14} className="text-indigo-500" />
                        <span>{ticket.messages?.length || 0} messages in conversation</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {deleteError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {deleteError}
          </div>
        )}
      </main>

      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-2 sm:p-4">
          <section
            role="dialog"
            aria-modal="true"
            className="flex max-h-[calc(100vh-0.75rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-900 to-indigo-900 px-4 py-4 text-white sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.28em] text-indigo-200">
                  Ticket details
                </p>
                <h3 className="mt-1 truncate text-lg font-bold sm:text-xl">
                  {selectedTicket.subject}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/95 text-slate-900 shadow-lg transition hover:scale-105 hover:bg-white"
                aria-label="Close ticket details"
              >
                <X size={18} className="stroke-[2.5]" />
              </button>
            </div>

            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Customer</p>
                  <p className="mt-1 truncate font-semibold text-slate-800">
                    {selectedTicket.userId?.name || "Customer"}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <StatusPill status={selectedTicket.status} />
                  <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 ring-1 ring-slate-200">
                    #{selectedTicket._id?.slice(-8)}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 py-4 sm:px-6">
              <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Issue</p>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700 sm:leading-7">
                  {selectedTicket.issue || "No issue description provided."}
                </p>
              </div>

              <div className="flex h-[55vh] min-h-[320px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <TicketConversation
                  key={selectedTicket._id}
                  ticketId={selectedTicket._id}
                  currentRole="admin"
                  otherPartyName={selectedTicket.userId?.name || "Customer"}
                  showComposer={true}
                />
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
