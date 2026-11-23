"use cient"
import React from 'react'
import { useEffect, useState } from "react";
import { GetArticle } from '@/utils/GetApi';
import { BookOpen, Search } from "lucide-react";


function Article() {
      const [articles, setArticles] = useState([]);

    useEffect(() => {
      const data = async () => {
        const response = await GetArticle();
        if(response.data.success){
          setArticles(response.data.article)
        }
      };
    
      data(); // Call the async function
    }, []);

  return(
  <>
     {
             articles?.map((article) => (
              <article
                key={article._id}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <BookOpen className="mb-4 text-indigo-600" size={20} />
                <h2 className="mb-2 font-semibold text-slate-900">
                  {article.article}
                </h2>
                <p className="text-sm leading-6 text-slate-500">
                  {article.content}
                </p>
              </article>
            ))
        
     }
  </>
  )
}

export default Article