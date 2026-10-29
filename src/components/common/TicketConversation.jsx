"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { GetTicketMessages, SendTicketMessage } from "@/utils/GetApi";
import { socket } from "@/utils/socket";

export default function TicketConversation({
  ticketId,
  currentRole,
  otherPartyName,
  showComposer = true,
}) {
  const [messages, setMessages] = useState([]);
  const [messageDraft, setMessageDraft] = useState("");
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [chatError, setChatError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let active = true;

    socket.connect();
    socket.emit("joinTicket", ticketId);

    socket.on("newMessage", (payload) => {
      if (!payload || payload.ticketId !== ticketId) return;

      const incomingMessage = payload.message;
      setMessages((prev) => {
        const isDuplicate = prev.some(
          (item) =>
            item._id === incomingMessage._id ||
            (item.createdAt === incomingMessage.createdAt &&
              item.message === incomingMessage.message),
        );

        return isDuplicate ? prev : [...prev, incomingMessage];
      });
    });

    GetTicketMessages(ticketId)
      .then((ticketMessages) => {
        if (active) {
          setMessages(ticketMessages);
        }
      })
      .catch((error) => {
        if (active) {
          setChatError(
            error.response?.data?.message ||
              error.message ||
              "Unable to load this conversation.",
          );
        }
      })
      .finally(() => {
        if (active) setMessagesLoading(false);
      });

    return () => {
      active = false;
      socket.off("newMessage");
      socket.emit("leaveTicket", ticketId);
    };
  }, [ticketId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMessage(event) {
    event.preventDefault();
    const message = messageDraft.trim();
    if (!message || sendingMessage || !showComposer) return;

    setSendingMessage(true);
    setChatError("");
    try {
      const response = await SendTicketMessage({ ticketId, message });
      if (!response.success || !response.chatMessage) {
        throw new Error(response.message || "Unable to send your reply.");
      }
      setMessages((prev) => [...prev, response.chatMessage]);
      socket.emit("sendMessage", {
        ticketId,
        message: response.chatMessage,
      });
      setMessageDraft("");
    } catch (error) {
      setChatError(
        error.response?.data?.message ||
          error.message ||
          "Unable to send your reply.",
      );
    } finally {
      setSendingMessage(false);
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">Conversation</h3>
      </div>

      <div
        aria-live="polite"
        className="min-h-36 flex-1 space-y-3 overflow-y-auto rounded-2xl bg-slate-50 p-4"
      >
        {messagesLoading ? (
          <p className="py-8 text-center text-sm text-slate-400">
            Loading conversation...
          </p>
        ) : messages.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">
            No messages yet.
          </p>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.senderRole === currentRole;
            return (
              <div
                key={message._id}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                    isOwnMessage
                      ? "rounded-br-sm bg-indigo-600 text-white"
                      : "rounded-bl-sm bg-white text-slate-700 shadow-sm"
                  }`}
                >
                  <p
                    className={`mb-1 text-[11px] font-semibold ${
                      isOwnMessage ? "text-indigo-100" : "text-slate-500"
                    }`}
                  >
                    {isOwnMessage
                      ? "You"
                      : message.senderName || otherPartyName}
                  </p>
                  <p className="whitespace-pre-wrap break-words text-sm">
                    {message.message}
                  </p>
                  <time
                    className={`mt-1 block text-right text-[10px] ${
                      isOwnMessage ? "text-indigo-200" : "text-slate-400"
                    }`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {chatError && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {chatError}
        </p>
      )}

      {showComposer && (
        <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
          <textarea
            aria-label="Write a reply"
            value={messageDraft}
            onChange={(event) => setMessageDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            maxLength={5000}
            rows={2}
            placeholder="Write a reply... (Enter to send)"
            className="min-w-0 flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          <button
            type="submit"
            disabled={sendingMessage || !messageDraft.trim()}
            aria-label="Send reply"
            className="self-end rounded-xl bg-indigo-600 p-3 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
