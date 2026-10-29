"use client";

import { X } from "lucide-react";
import TicketConversation from "@/components/common/TicketConversation";

const STATUSES = ["Open", "In Progress", "Resolved"];

export default function TicketDetailModal({
  ticket,
  onClose,
  onUpdateStatus,
  isUpdatingStatus,
  statusError,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-detail-title"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-xs text-slate-400">
              #{ticket._id} — {ticket.userId?.name || "Customer"}
            </p>

            <h2 id="ticket-detail-title" className="mt-1 font-bold text-slate-900">
              {ticket.subject}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close ticket details"
            className="text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="border-b border-slate-100 bg-slate-50 px-6 py-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-700">Issue: </span>
          {ticket.issue || "No description provided."}
        </div>

        <div className="border-b border-slate-100 px-6 py-3">
          <label className="mb-2 block text-xs font-semibold text-slate-700">
            Update status
          </label>
          {statusError && (
            <p role="alert" className="mb-2 rounded-lg bg-red-50 p-2 text-sm text-red-700">
              {statusError}
            </p>
          )}
          <div className="grid grid-cols-3 gap-2">
            {STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onUpdateStatus(ticket._id, status)}
                disabled={isUpdatingStatus || ticket.status === status}
                className={`py-2 rounded-lg text-xs font-semibold capitalize border ${
                  ticket.status === status
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-[55vh] min-h-[320px] flex-col px-6 py-4">
          <TicketConversation
            key={ticket._id}
            ticketId={ticket._id}
            currentRole="agent"
            otherPartyName={ticket.userId?.name || "Customer"}
          />
          <button
            type="button"
            onClick={onClose}
            className="mt-3 self-end text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Done
          </button>
        </div>
      </section>
    </div>
  );
}
