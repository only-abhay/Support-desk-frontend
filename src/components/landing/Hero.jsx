import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  Clock3,
  Headset,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";

const PREVIEW_TICKETS = [
  {
    initials: "JL",
    name: "Jordan Lee",
    subject: "My order hasn't arrived yet",
    category: "Shipping",
    status: "Open",
    tone: "bg-amber-100 text-amber-700",
  },
  {
    initials: "SK",
    name: "Sam Kim",
    subject: "Need help updating my account",
    category: "Account",
    status: "In progress",
    tone: "bg-indigo-100 text-indigo-700",
  },
  {
    initials: "MR",
    name: "Morgan Reed",
    subject: "Question about a recent payment",
    category: "Billing",
    status: "Resolved",
    tone: "bg-emerald-100 text-emerald-700",
  },
];

export default function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#101329] text-white">
        <div className="pointer-events-none absolute -left-48 top-0 h-[540px] w-[540px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-36 bottom-[-260px] h-[620px] w-[620px] rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[size:28px_28px] opacity-30" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold tracking-wide text-indigo-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
              CUSTOMER SUPPORT, MADE CLEAR
            </div>
            <h1 className="text-[2.75rem] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[4.25rem]">
              Every request.
              <br />
              <span className="bg-gradient-to-r from-indigo-300 via-violet-200 to-sky-200 bg-clip-text text-transparent">
                A better answer.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              A calmer way to handle customer support. Raise a ticket, follow
              progress, and keep every conversation in one place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-indigo-950/20 transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                Get support
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore the platform
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-300">
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" />
                Keep ticket updates together
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" />
                Know what needs attention
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[600px]">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-violet-400/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Headset className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Support inbox</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      A sample of your ticket workspace
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Search sample tickets"
                  className="rounded-lg border border-slate-200 p-2 text-slate-400"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
                {[
                  { label: "Open", value: "12", tone: "text-amber-600" },
                  { label: "In progress", value: "08", tone: "text-indigo-600" },
                  { label: "Resolved", value: "24", tone: "text-emerald-600" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-100 bg-white px-3 py-3"
                  >
                    <p className="text-[10px] font-semibold text-slate-500 sm:text-xs">
                      {stat.label}
                    </p>
                    <p className={`mt-1 text-xl font-bold ${stat.tone}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="px-5 py-4 sm:px-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Recent tickets
                  </p>
                  <span className="text-xs font-semibold text-indigo-600">
                    Workspace preview
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {PREVIEW_TICKETS.map((ticket) => (
                    <div
                      key={ticket.initials}
                      className="flex items-center gap-3 py-3.5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                        {ticket.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {ticket.subject}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {ticket.name}
                          <span className="mx-1.5">·</span>
                          {ticket.category}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${ticket.tone}`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 bg-white px-5 py-3.5 sm:px-6">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Clock3 className="h-4 w-4 text-indigo-500" />
                  Updates stay with each ticket
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white px-4 py-3 shadow-xl sm:flex lg:-left-10">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Clear ownership</p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  Every ticket has a next step
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-100 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
          {[
            { icon: CircleHelp, label: "One place to ask for help" },
            { icon: MessageCircle, label: "Conversations with context" },
            { icon: Check, label: "Updates you can follow" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-3 py-5 text-sm font-semibold text-slate-600 sm:py-6"
            >
              <Icon className="h-4 w-4 text-indigo-600" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
