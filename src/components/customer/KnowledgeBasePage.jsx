import { BookOpen, Search } from "lucide-react";
import { KB_SNIPPETS } from "@/lib/data";
import TopBar from "@/components/layout/TopBar";
import Article from "./Article";

export default function CustomerKnowledgeBasePage() {
  return (
    <>
      <TopBar
        title="Knowledge Base"
        subtitle="Find quick answers to common questions"
      />
      <main className="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
            <Search size={18} className="text-slate-400" />
            <input
              placeholder="Search articles..."
              className="w-full text-sm outline-none"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
           <Article/>
          </div>
        </div>
      </main>
    </>
  );
}
