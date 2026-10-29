export const SEED_TICKETS = [
  {
    id: "1042",
    subject: "Order not delivered yet",
    category: "Shipping",
    priority: "high",
    status: "open",
    customer: "Aditi Sharma",
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    description: "It's been 9 days and my order still says processing.",
  },
  {
    id: "1041",
    subject: "Payment deducted twice",
    category: "Billing",
    priority: "high",
    status: "open",
    customer: "Rohan Mehta",
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    description: "Charged me twice for the same order, please refund.",
  },
  {
    id: "1039",
    subject: "Refund not processed",
    category: "Billing",
    priority: "medium",
    status: "pending",
    customer: "Priya Nair",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    description: "Requested a refund 6 days ago, still nothing.",
  },
  {
    id: "1031",
    subject: "Unable to update billing address",
    category: "Account",
    priority: "low",
    status: "resolved",
    customer: "Kabir Khan",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
    description: "The save button doesn't respond on the address form.",
  },
];

export const KB_SNIPPETS = [
  {
    keywords: ["order", "delivery", "shipped", "delivered"],
    title: "Delivery delays",
    answer:
      "Most orders arrive within 5-7 business days. If it has been longer than that, this gets automatically escalated to a human agent.",
  },
  {
    keywords: ["refund", "payment", "charged", "billing"],
    title: "Refunds & billing",
    answer:
      "Refunds are processed within 3-5 business days after approval. Duplicate charges are reversed automatically once confirmed.",
  },
  {
    keywords: ["password", "login", "account"],
    title: "Account access",
    answer:
      "You can reset your password from the login screen. If you're locked out, an agent can manually verify your identity.",
  },
];

export const AGENTS = [
  { name: "Riya Kapoor", status: "8 open", tone: "text-emerald-600" },
  { name: "Arjun Verma", status: "5 open", tone: "text-emerald-600" },
  { name: "Meera Joshi", status: "Away", tone: "text-slate-400" },
  { name: "Vikram Rao", status: "12 open", tone: "text-amber-600" },
];

export const WEEKLY_CHART_BASE = [
  { day: "Mon", tickets: 3 },
  { day: "Tue", tickets: 5 },
  { day: "Wed", tickets: 4 },
  { day: "Thu", tickets: 6 },
  { day: "Fri", tickets: 4 },
  { day: "Sat", tickets: 2 },
];
