import RelatedArticleItem from "./RelatedArticleItem";

export default function RelatedArticle({ latestArticles }) {
  return (
    <div className="flex flex-col gap-[15px]">
      {latestArticles?.map((article) => (
        <RelatedArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
}
