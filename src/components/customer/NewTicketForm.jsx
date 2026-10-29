"use client";

import { useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import { toast } from "sonner";
import { findSuggestion } from "@/lib/utils";
import axiosCat from "@/utils/helper";

const CATEGORIES = [
  "Billing",
  "Shipping",
  "Account",
  "Technical",
  "Order",
  "Refund",
  "Payment",
  "Other",
];

const PRIORITIES = ["Low", "Medium", "High", "Urgent"];

export default function NewTicketForm({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    subject: "",
    category: "Billing",
    priority: "Medium",
    issue: "",
  });

  const [loading, setLoading] = useState(false);

  const suggestion = findSuggestion(`${formData.subject} ${formData.issue}`);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.subject.trim()) {
      toast.error("Subject is required.");
      return false;
    }

    if (formData.subject.trim().length < 5) {
      toast.error("Subject must be at least 5 characters.");
      return false;
    }

    if (!formData.issue.trim()) {
      toast.error("Please describe your issue.");
      return false;
    }

    if (formData.issue.trim().length < 15) {
      toast.error("Issue description should be at least 15 characters.");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormData({
      subject: "",
      category: "Billing",
      priority: "Medium",
      issue: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await axiosCat.post("/query/create", {
        subject: formData.subject,
        category: formData.category,
        priority: formData.priority,
        issue: formData.issue,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response , "form")

        resetForm();

        onClose();
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-bold">Raise a Support Ticket</h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter ticket subject"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 outline-none"
              >
                {CATEGORIES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 outline-none"
              >
                {PRIORITIES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Issue */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Describe your issue
            </label>

            <textarea
              rows={6}
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              placeholder="Explain your issue in detail..."
              className="w-full border rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* AI Suggestion */}
          {suggestion && (
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
              <p className="text-sm font-semibold text-indigo-700 mb-2">
                Suggested Help
              </p>

              <h4 className="font-semibold text-slate-800">
                {suggestion.title}
              </h4>

              <p className="text-sm text-gray-700 mt-1">{suggestion.answer}</p>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="border rounded-lg px-6 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-2 flex items-center gap-2 disabled:opacity-60"
            >
              {loading && <LoaderCircle size={18} className="animate-spin" />}

              {loading ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
