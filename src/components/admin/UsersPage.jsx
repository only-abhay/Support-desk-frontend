"use client";

import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import LoadingState from "@/components/common/LoadingState";
import TopBar from "@/components/layout/TopBar";
import { AdminUsers, ConvertUserToAgent } from "@/utils/GetApi";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [convertingUserId, setConvertingUserId] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setUsers(await AdminUsers());
      } catch (requestError) {
        console.error("Unable to load users", requestError);
        setError(
          requestError.response?.data?.message ||
            requestError.message ||
            "Unable to load users.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  async function convertToAgent(user) {
    setConvertingUserId(user._id);
    setError("");

    try {
      const response = await ConvertUserToAgent(user._id);
      if (!response.success) {
        throw new Error(response.message || "Unable to convert user to agent.");
      }
      setUsers((currentUsers) =>
        currentUsers.filter((currentUser) => currentUser._id !== user._id),
      );
    } catch (requestError) {
      console.error("Unable to convert user to agent", requestError);
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to convert user to agent.",
      );
    } finally {
      setConvertingUserId("");
    }
  }

  return (
    <>
      <TopBar title="Users" subtitle="Manage users and convert them to agents" />
      <main className="flex-1 bg-slate-50 p-6 lg:p-8">
        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        {loading ? (
          <LoadingState message="Loading users..." />
        ) : users.length === 0 ? (
          <EmptyState message="No users found." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {users.map((user) => (
              <article
                key={user._id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                    <UserRound size={18} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold text-slate-900">
                      {user.name}
                    </h2>
                    <p className="truncate text-sm text-slate-500">
                      {user.email}
                    </p>
                    <p className="mt-1 text-sm capitalize text-slate-400">
                      {user.role}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => convertToAgent(user)}
                  disabled={Boolean(convertingUserId)}
                  className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {convertingUserId === user._id
                    ? "Converting..."
                    : "Convert to agent"}
                </button>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
