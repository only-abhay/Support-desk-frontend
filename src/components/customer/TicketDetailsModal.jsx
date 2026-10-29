"use client";

import { X } from "lucide-react";
import TicketConversation from "@/components/common/TicketConversation";

export default function TicketDetailsModal({ ticket, onClose }) {
  if (!ticket) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/40
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
      px-4
    "
    >
      <div
        className="
        bg-white
        w-full
        max-w-xl
        max-h-[90vh]
        rounded-2xl
        shadow-xl
        overflow-hidden
        flex
        flex-col
      "
      >
        {/* Header */}

        <div
          className="
          flex
          justify-between
          items-center
          px-6
          py-4
          border-b
        "
        >
          <div>
            <h2
              className="
              text-lg
              font-bold
              text-slate-900
            "
            >
              Ticket Details
            </h2>

            <p
              className="
              text-xs
              text-slate-400
            "
            >
              #{ticket._id.slice(-6)}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              p-2
              rounded-lg
              hover:bg-slate-100
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div
          className="
          p-6
          space-y-5
          overflow-y-auto
        "
        >
          <div>
            <p
              className="
              text-xs
              text-slate-400
            "
            >
              Subject
            </p>

            <p
              className="
              font-semibold
              text-slate-800
            "
            >
              {ticket.subject}
            </p>
          </div>

          <div
            className="
            grid
            grid-cols-2
            gap-4
          "
          >
            <div>
              <p className="text-xs text-slate-400">Category</p>

              <p className="font-medium">{ticket.category}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Priority</p>

              <p className="font-medium">{ticket.priority}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-400">Status</p>

            <span
              className="
              inline-block
              mt-1
              px-3
              py-1
              rounded-full
              text-xs
              bg-indigo-100
              text-indigo-700
            "
            >
              {ticket.status}
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-400">Issue Description</p>

            <p
              className="
              text-sm
              text-slate-700
              mt-1
              leading-relaxed
            "
            >
              {ticket.issue}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Created At</p>

            <p className="text-sm">
              {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex h-[360px] min-h-[300px] flex-col border-t border-slate-100 pt-5">
            <TicketConversation
              key={ticket._id}
              ticketId={ticket._id}
              currentRole="customer"
              otherPartyName={ticket.assignedTo?.name || "Support"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
