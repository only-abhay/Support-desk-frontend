"use client";

import { useEffect, useState } from "react";
import { Plus, Eye } from "lucide-react";

import TopBar from "@/components/layout/TopBar";
import StatusPill from "@/components/ui/StatusPill";
import LoadingState from "@/components/common/LoadingState";
import EmptyState from "@/components/common/EmptyState";
import NewTicketForm from "./NewTicketForm";
import TicketDetailsModal from "./TicketDetailsModal";

import { timeAgo } from "@/lib/utils";
import axiosCat from "@/utils/helper";

export default function CustomerDashboard() {
  const [tickets, setTickets] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch User Tickets
  // ==========================

  const getMyTickets = async () => {
    try {
      setLoading(true);

      const response = await axiosCat.get("/query/my", {
        withCredentials: true,
      });
      console.log(response, "ticket")
      setTickets(
        Array.isArray(response.data.tickets) ? response.data.tickets : [],
      );
    } catch (error) {
      console.log(
        "Ticket Fetch Error:",
        error?.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadTickets() {
      await getMyTickets();
    }

    loadTickets();
  }, []);

  // ==========================
  // Ticket Stats
  // ==========================

  const counts = {
    open: tickets.filter((item) => item.status === "Open").length,

    pending: tickets.filter(
      (item) =>
        item.status === "In Progress" || item.status === "Waiting For Customer",
    ).length,

    resolved: tickets.filter(
      (item) => item.status === "Resolved" || item.status === "Closed",
    ).length,
  };

  return (
    <>
      <TopBar
        title="My Tickets"
        subtitle="Manage and track your support requests"
        right={
          <button
            onClick={() => setShowForm(true)}
            className="
flex
items-center
gap-2
bg-indigo-600
hover:bg-indigo-700
text-white
px-5
py-2.5
rounded-xl
text-sm
font-medium
shadow-sm
transition
"
          >
            <Plus size={17} />
            New Ticket
          </button>
        }
      />

      <div
        className="
flex-1
overflow-y-auto
bg-slate-50
p-6
lg:p-8
space-y-6
"
      >
        {/* Stats */}

        <div
          className="
grid
grid-cols-1
sm:grid-cols-3
gap-5
"
        >
          {[
            {
              title: "Open",
              value: counts.open,
              icon: "🟣",
            },

            {
              title: "Pending",
              value: counts.pending,
              icon: "🟠",
            },

            {
              title: "Resolved",
              value: counts.resolved,
              icon: "🟢",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
bg-white
rounded-2xl
px-5
py-4
shadow-sm
flex
items-center
justify-between
"
            >
              <div>
                <p
                  className="
text-sm
text-slate-500
"
                >
                  {item.title}
                </p>

                <h3
                  className="
text-2xl
font-bold
text-slate-900
mt-1
"
                >
                  {item.value}
                </h3>
              </div>

              <span
                className="
text-xl
"
              >
                {item.icon}
              </span>
            </div>
          ))}
        </div>

        {/* Ticket List */}

        <div
          className="
bg-white
rounded-2xl
shadow-sm
overflow-hidden
"
        >
          <div
            className="
px-6
py-5
flex
justify-between
items-center
"
          >
            <div>
              <h2
                className="
font-semibold
text-slate-900
"
              >
                Recent Tickets
              </h2>

              <p
                className="
text-xs
text-slate-500
mt-1
"
              >
                {tickets.length} total tickets
              </p>
            </div>
          </div>

          {loading ? (
            <LoadingState message="Loading tickets..." />
          ) : tickets.length === 0 ? (
            <EmptyState message="No tickets found" />
          ) : (
            <div
              className="
divide-y
divide-slate-100
"
            >
              {tickets.map((ticket, index) => (
                <div
                  key={ticket._id}
                  className={`
relative
px-6
py-4
transition
hover:bg-slate-50

${index === 0 ? "bg-indigo-50/40" : ""}

`}
                >
                  {/* status line */}

                  <div
                    className={`
absolute
left-0
top-0
h-full
w-1

${ticket.status === "Open"
                        ? "bg-indigo-500"
                        : ticket.status === "Resolved" || ticket.status === "Closed"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                      }

`}
                  />

                  <div
                    className="
flex
items-center
justify-between
gap-5
"
                  >
                    {/* Ticket Info */}

                    <div
                      className="
flex
items-center
gap-4
min-w-0
"
                    >
                      <div
                        className="
w-9
h-9
rounded-xl
bg-slate-100
flex
items-center
justify-center
text-slate-600
font-bold
text-sm
"
                      >
                        #
                      </div>

                      <div
                        className="
min-w-0
"
                      >
                        <h3
                          className="
text-sm
font-semibold
text-slate-900
truncate
"
                        >
                          {ticket.subject}
                        </h3>

                        <div
                          className="
flex
items-center
gap-3
mt-1
text-xs
text-slate-400
"
                        >
                          <span>{ticket.category}</span>

                          <span>•</span>

                          <span>Priority {ticket.priority}</span>

                          <span>•</span>

                          <span>{timeAgo(ticket.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}

                    <div
                      className="
flex
items-center
gap-4
"
                    >
                      <StatusPill status={ticket.status} />

                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="
flex
items-center
gap-1
text-xs
font-semibold
text-indigo-600
hover:text-indigo-700
"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <NewTicketForm
          onClose={() => {
            setShowForm(false);

            getMyTickets();
          }}
        />
      )}

      {selectedTicket && (
        <TicketDetailsModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </>
  );
}
