const STATUS_STYLES = {
  open: {
    label: "Open",
    dot: "bg-indigo-500",
    pill: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  "in progress": {
    label: "In Progress",
    dot: "bg-amber-500",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
  },
  resolved: {
    label: "Resolved",
    dot: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

export default function StatusPill({ status }) {
 let s = null
 if(status === "Open") {
  s = STATUS_STYLES.open;
 } else if(status === "In Progress") {
  s = STATUS_STYLES["in progress"];
 } else if(status === "Resolved") {
  s = STATUS_STYLES.resolved;
 } else {
  s = {
    label: status,
    dot: "bg-gray-500",
    pill: "bg-gray-50 text-gray-700 border-gray-200",
  };
 }
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.pill}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
