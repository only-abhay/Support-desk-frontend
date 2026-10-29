"use client";

import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";

export default function LiveChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "SupportDesk", text: "Hi! How can we help you today?" },
  ]);

  function sendMessage(event) {
    event.preventDefault();
    if (!message.trim()) return;

    setMessages((current) => [
      ...current,
      { from: "You", text: message.trim() },
    ]);
    setMessage("");
  }

  return (
    <>
      <TopBar title="Live Chat" subtitle="Chat with our support team" />
      <main className="flex-1 bg-slate-50 p-6 lg:p-8">
        <div className="mx-auto flex h-full max-w-3xl flex-col rounded-2xl bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
            <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
              <MessageCircle size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Support team</h2>
              <p className="text-xs text-emerald-600">
                Usually replies in a few minutes
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-4 p-6">
            {messages.map((item, index) => (
              <div
                key={`${item.from}-${index}`}
                className={
                  item.from === "You"
                    ? "ml-auto max-w-md text-right"
                    : "max-w-md"
                }
              >
                <p className="mb-1 text-xs text-slate-400">{item.from}</p>
                <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex gap-3 border-t border-slate-100 p-4"
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a message..."
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
            <button
              className="rounded-lg bg-indigo-600 px-4 text-white hover:bg-indigo-700"
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
