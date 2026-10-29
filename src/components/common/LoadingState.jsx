export default function LoadingState({ message = "Loading..." }) {
  return (
    <div className="py-12 text-center text-sm text-slate-400">{message}</div>
  );
}
