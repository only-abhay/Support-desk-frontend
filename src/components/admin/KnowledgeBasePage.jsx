 "use client";

import { useEffect, useState } from "react";
import { BookOpen, Plus, X } from "lucide-react";
import { KB_SNIPPETS } from "@/lib/data";
import TopBar from "@/components/layout/TopBar";
import axiosCat from "@/utils/helper";
import { DeleteById, GetArticle } from "@/utils/GetApi";
import { useRouter } from "next/navigation";
import {  Trash2 } from "lucide-react";

export default function AdminKnowledgeBasePage() {
  const router = useRouter()
  const [articles, setArticles] = useState();
  const [data, setData] = useState({
    article:"",
    content:""
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

   useEffect(() => {
  const data = async () => {
    const response = await GetArticle();
    if(response.data.success){
      setArticles(response.data.article)
    }
  };

  data(); // Call the async function
}, []);

  const handleChange = (e)=>{
   const {name , value} = e.target
   setData((prev)=>({
     ...prev,
     [name]:value
   }))
  }
 async function handleSubmit(event) {
    event.preventDefault();
    const response = await axiosCat.post("/article/create",{data})
    if(response.data.success){
      setArticles(response.data.article)
    }
    setIsFormOpen(false);
    ClearForm()
  }
  const handleDelete = async (id) => {
  try {
    console.log(id)
    const response = await DeleteById(id);
     if (response.data.success) {
      setArticles((prev) =>
        prev.filter((article) => article._id !== id)
      );
    }
    ClearForm()
  } catch (error) {
    console.log("Error deleting article:", error);
  }
};
   
  const ClearForm = ()=>{
    data.article = ""
    data.content = ""
    router.refresh()
  }
  return (
    <>
      <TopBar
        title="Knowledge Base"
        subtitle="Manage help articles for your customers"
        right={
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Plus size={16} /> New article
          </button>
        }
      />
      <main className="flex-1 bg-slate-50 p-6 lg:p-8">
        <div className="grid gap-4 md:grid-cols-3">
         {articles?.map((article) => (
  <article
    key={article._id}
    className="relative rounded-xl border border-slate-200 bg-white p-5"
  >
    <button
      onClick={() => handleDelete(article._id)}
      className="absolute right-4 top-4 rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
      title="Delete Article"
    >
      <Trash2 size={18} />
    </button>

    <BookOpen size={20} className="mb-4 text-indigo-600" />

    <h2 className="font-semibold text-slate-900">
      {article.article}
    </h2>

    <p className="mt-2 text-sm leading-6 text-slate-500">
      {article.content}
    </p>
  </article>
))}
        </div>
      </main>
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6"
        >
          <section
            className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2
                className="text-lg font-bold text-slate-900"
              >
                New article
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Article title
                </label>
                <input
                  name="article"
                  value={data.article}
                  onChange={handleChange}
                  required
                  autoFocus
                  placeholder="e.g. How to update your account"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Article content
                </label>
                <textarea
                  name="content"
                   value={data.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Write the answer or helpful information..."
                  className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Create article
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
