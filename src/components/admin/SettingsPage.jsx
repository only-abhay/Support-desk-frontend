"use client";

import { useState } from "react";
import TopBar from "@/components/layout/TopBar";

export default function AdminSettingsPage() {
  const [companyName, setCompanyName] = useState("Acme Inc.");

  return (
    <>
      <TopBar title="Settings" subtitle="Manage organization settings" />
      <main className="flex-1 bg-slate-50 p-6 lg:p-8">
        <form
          className="mx-auto max-w-2xl space-y-5 rounded-xl border border-slate-200 bg-white p-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <div>
            <h2 className="font-semibold text-slate-900">
              Organization profile
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              This information is shown to your support team.
            </p>
          </div>
          <label className="block text-sm font-medium text-slate-700">
            Company name
            <input
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-indigo-500"
            />
          </label>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            Save changes
          </button>
        </form>
      </main>
    </>
  );
}
