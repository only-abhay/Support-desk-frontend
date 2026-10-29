import { BookOpen, Search } from "lucide-react";
import { KB_SNIPPETS } from "@/lib/data";
import TopBar from "@/components/layout/TopBar";

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
            {KB_SNIPPETS.map((article) => (
              <article
                key={article.title}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <BookOpen className="mb-4 text-indigo-600" size={20} />
                <h2 className="mb-2 font-semibold text-slate-900">
                  {article.title}
                </h2>
                <p className="text-sm leading-6 text-slate-500">
                  {article.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
