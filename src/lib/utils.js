import { KB_SNIPPETS } from "./data";

export function timeAgo(ts) {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function findSuggestion(text) {
  const lower = text.toLowerCase();
  return (
    KB_SNIPPETS.find((k) => k.keywords.some((w) => lower.includes(w))) || null
  );
}
