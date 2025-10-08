import { useQuery } from "@tanstack/react-query";
import { getArticlesByUserId } from "../../utils/httpReq";
import { useParams } from "react-router";
import ItemArticle from "../article/ItemArticle";
import { useEffect } from "react";

export default function AuthorPage() {
  const { id } = useParams();

  const { data: articles } = useQuery({
    queryKey: ["articles", id],
    queryFn: () => getArticlesByUserId({ userId: id }),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 py-[30px]">
        {Array.isArray(articles) &&
          articles.map((article) => (
            <ItemArticle key={article.id} article={article} />
          ))}
      </div>
    </div>
  );
}
