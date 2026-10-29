import { CreditCard, Check } from "lucide-react";
import TopBar from "@/components/layout/TopBar";

export default function AdminBillingPage() {
  return (
    <>
      <TopBar title="Billing" subtitle="Manage your SupportDesk subscription" />
      <main className="flex-1 bg-slate-50 p-6 lg:p-8">
        <section className="mx-auto max-w-2xl rounded-2xl border border-indigo-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Current plan</p>
              <h2 className="text-xl font-bold text-slate-900">Professional</h2>
            </div>
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Your plan includes unlimited tickets and access for all support
            agents.
          </p>
          <ul className="mt-5 space-y-3 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <Check size={16} className="text-emerald-600" /> Unlimited tickets
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-emerald-600" /> Team analytics
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
