export default function EmptyState({ message = "Nothing to show yet." }) {
  return (
    <div className="py-12 text-center text-sm text-slate-400">{message}</div>
  );
}
