import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getArticles } from "../utils/httpReq";
import Loading from "./Loading";
import ItemArticle from "./article/ItemArticle";
import ArticleSearch from "./ArticleSearch";

export default function ArticlesCategoryPage({ filter }) {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["articles", { searchTerm, filter }],
    queryFn: ({ pageParam = 1 }) =>
      getArticles({ page: pageParam, limit: 8, searchTerm, filter: filter }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 8) return pages.length + 1;
      return undefined;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchTerm, filter]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = <div>Error...</div>;
  } else if (data?.pages.flat().length === 0) {
    content = (
      <div className="w-full h-[calc(100vh-200px)] flex flex-col gap-[10px] items-center justify-center">
        <p className="text-white text-[22px] md:text-[25px]">
          مقاله ای یافت نشد!
        </p>
        <button
          onClick={() => setSearchTerm("")}
          className="w-[200px] text-[18px] md:text-[22px] bg-[#0e2338] hover:bg-[#091929] text-white px-[20px] py-[10px] rounded-[5px] cursor-pointer transition-colors duration-200"
        >
          همه مقالات
        </button>
      </div>
    );
  } else {
    const articles = data.pages.flat();
    content = (
      <>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 py-[30px]">
          {articles.map((article) => (
            <ItemArticle key={article.id} article={article} />
          ))}
        </div>
        {hasNextPage && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="bg-[#0e2338] hover:bg-[#091929] text-white px-6 py-2 rounded-md transition-colors duration-200"
            >
              {isFetchingNextPage ? "در حال بارگذاری..." : "بارگذاری بیشتر"}
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-[30px] py-[30px]">
      <div className="flex justify-between items-center">
        <ArticleSearch value={searchTerm} onChange={handleSearchInput} />
      </div>
      <div className="pb-[50px]">{content}</div>
    </div>
  );
}
