import { Clock } from "lucide-react";

export default function ComingSoon({ label }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <Clock className="w-6 h-6 text-slate-400" />
        </div>
        <p className="text-slate-700 font-semibold mb-1">
          {label} is coming soon
        </p>
        <p className="text-sm text-slate-500">
          This part of the build isn&apos;t wired up yet &mdash; marked here on
          purpose rather than faked.
        </p>
      </div>
    </div>
  );
}
