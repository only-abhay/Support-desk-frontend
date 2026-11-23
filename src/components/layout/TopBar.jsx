export default function TopBar({ title, subtitle, right }) {
  return (
    <header className="flex min-h-[68px] shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
      <div className="min-w-0">
        <h1 className="text-base font-bold text-slate-900 sm:text-lg">{title}</h1>

        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      {right && <div className="shrink-0">{right}</div>}
    </header>
  );
}
