"use client";

import { useState } from "react";
import TopBar from "@/components/layout/TopBar";

export default function CustomerSettingsPage() {
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <>
      <TopBar title="Settings" subtitle="Manage your account preferences" />
      <main className="flex-1 bg-slate-50 p-6 lg:p-8">
        <section className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Notifications</h2>
          <label className="mt-5 flex items-center justify-between gap-4">
            <span>
              <span className="block text-sm font-medium text-slate-700">
                Email updates
              </span>
              <span className="text-xs text-slate-500">
                Receive updates about your support tickets.
              </span>
            </span>
            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={(event) => setEmailUpdates(event.target.checked)}
            />
          </label>
        </section>
      </main>
    </>
  );
}
