import { BookOpen, Plus } from "lucide-react";
import { KB_SNIPPETS } from "@/lib/data";
import TopBar from "@/components/layout/TopBar";

export default function AdminKnowledgeBasePage() {
  return (
    <>
      <TopBar
        title="Knowledge Base"
        subtitle="Manage help articles for your customers"
        right={
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            <Plus size={16} /> New article
          </button>
        }
      />
      <main className="flex-1 bg-slate-50 p-6 lg:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          {KB_SNIPPETS.map((article) => (
            <article
              key={article.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <BookOpen size={20} className="mb-4 text-indigo-600" />
              <h2 className="font-semibold text-slate-900">{article.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {article.answer}
              </p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
