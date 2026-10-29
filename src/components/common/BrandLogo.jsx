export default function BrandLogo({ compact = false, light = false }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
        S
      </div>
      {!compact && (
        <span
          className={`font-bold ${light ? "text-white" : "text-slate-900"}`}
        >
          SupportDesk
        </span>
      )}
    </div>
  );
}
