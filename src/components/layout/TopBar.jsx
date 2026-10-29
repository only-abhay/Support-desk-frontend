export default function TopBar({ title, subtitle, right }) {
  return (
    <header className="h-[68px] shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <div>
        <h1 className="text-lg font-bold text-slate-900">{title}</h1>

        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      {right && right}
    </header>
  );
}
