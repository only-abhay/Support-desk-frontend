import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Headset,
  Layers3,
  MessageCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const FEATURES = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Keep every request organized",
    description:
      "Create support tickets with the details your team needs. Find each request by its subject, category, priority, and status.",
    iconStyle: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Keep the conversation together",
    description:
      "Replies live alongside the ticket, so customers and support teams can follow the same conversation and its context.",
    iconStyle: "bg-sky-50 text-sky-600",
  },
  {
    icon: Layers3,
    number: "03",
    title: "Give each role the right view",
    description:
      "Customers track their requests, agents work their assigned queue, and admins oversee the support operation.",
    iconStyle: "bg-violet-50 text-violet-600",
  },
];

const STEPS = [
  {
    number: "1",
    title: "Tell us what you need",
    description: "Create a ticket and include the details that will help us.",
  },
  {
    number: "2",
    title: "Follow the progress",
    description: "Check its status and see replies from your support team.",
  },
  {
    number: "3",
    title: "Get to a resolution",
    description: "Keep the updates and outcome together in your account.",
  },
];

const TEAMS = [
  {
    icon: UserRound,
    eyebrow: "FOR CUSTOMERS",
    title: "Get help without losing track.",
    description:
      "Create a support request, review its status, and come back to the same conversation when you need it.",
    action: "Create an account",
    href: "/register",
    tone: "bg-indigo-50 text-indigo-700",
  },
  {
    icon: Headset,
    eyebrow: "FOR SUPPORT AGENTS",
    title: "A focused place to work tickets.",
    description:
      "Open assigned requests, reply with context, and move each ticket through its status.",
    action: "Agent sign in",
    href: "/login",
    tone: "bg-sky-50 text-sky-700",
  },
  {
    icon: ShieldCheck,
    eyebrow: "FOR ADMINS",
    title: "Keep an eye on the operation.",
    description:
      "Manage tickets, agents, and the people using your support workspace.",
    action: "Admin sign in",
    href: "/login",
    tone: "bg-violet-50 text-violet-700",
  },
];

export default function Features() {
  return (
    <>
      <section id="features" className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.18em] text-indigo-600">
              SUPPORT THAT STAYS ORGANIZED
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              The details matter.
              <br className="hidden sm:block" /> Keep them all together.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
              A shared support workspace makes it easier to understand what
              happened, what needs attention, and what comes next.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, number, title, description, iconStyle }) => (
              <article
                key={number}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-950/[0.05] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-slate-300">
                    {number}
                  </span>
                </div>
                <h3 className="mt-7 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 border-y border-slate-200 bg-slate-50 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-indigo-600">
              A SIMPLE FLOW
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
              From question to
              <br className="hidden sm:block" /> clear next step.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
              No scattered updates. Each request has a place, an owner, and a
              status you can check.
            </p>
            <Link
              href="/register"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-indigo-700 transition hover:text-indigo-800"
            >
              Start with a support request
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <article
                key={step.number}
                className="relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {step.number}
                </span>
                <h3 className="mt-5 text-sm font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {step.description}
                </p>
                {index < STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-8 z-10 hidden h-5 w-5 rounded-full bg-slate-50 text-indigo-400 sm:block" />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="for-every-team"
        className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-indigo-600">
                ONE WORKSPACE, THREE VIEWS
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Support works better together.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              Choose the view that fits your role. Your signed-in workspace is
              always one click away in the top navigation.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {TEAMS.map(({ icon: Icon, eyebrow, title, description, action, href, tone }) => (
              <article
                key={eyebrow}
                className="flex flex-col rounded-2xl border border-slate-200 p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-[10px] font-bold tracking-[0.14em] text-slate-400">
                    {eyebrow}
                  </p>
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
                  {description}
                </p>
                <Link
                  href={href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-700 transition hover:text-indigo-900"
                >
                  {action}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50 px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
          <p>SupportDesk. Support, made simpler.</p>
          <div className="flex items-center gap-5">
            <Link href="/login" className="transition hover:text-indigo-700">
              Sign in
            </Link>
            <Link href="/register" className="transition hover:text-indigo-700">
              Create account
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
