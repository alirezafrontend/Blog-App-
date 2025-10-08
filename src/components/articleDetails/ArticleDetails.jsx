import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { fetchAuthors, getArticleById, getArticles } from "../../utils/httpReq";
import { FileText, TimerReset } from "lucide-react";
import Loading from "../Loading";
import { useEffect } from "react";
import AddCommentsUser from "./AddCommentsUser";
import CommentCard from "./CommentCard";
import RelatedArticle from "./RelatedArticle";

export default function ArticleDetails() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles", id],
    queryFn: () => getArticleById({ id: id }),
  });

  const { data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  const { data: authors } = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
  });

  const author = authors?.find((author) => author.userId === article?.userId);

  const latestArticles = articles
    ?.filter((article) => article.id !== id)
    .slice(0, 5);

  let content;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    content = <p>error...</p>;
  }

  if (article) {
    content = (
      <div className="flex flex-col xl:flex-row gap-[20px]">
        <div className="flex flex-col gap-[30px] w-full xl:w-3/4 text-white">
          <div className="flex flex-col gap-[20px] bg-[#0e2338] px-[30px] py-[50px] rounded-[10px]">
            <div>
              <img src={article.coverImage} alt={article.title} />
            </div>
            <div className="flex flex-col xl:flex-row items-center gap-[15px]">
              <div className="ml-6 flex items-center space-x-2 space-x-reverse sm:mb-0 mb-5">
                <Link
                  to={`/${article.category}`}
                  className="flex items-center justify-center gap-[10px] rounded-lg text-blue-700 hover:text-white hover:bg-blue-700 transition duration-200  font-semibold  px-5 py-2 bg-blue-50"
                >
                  <span>
                    <FileText />
                  </span>
                  <span>{article.category}</span>
                </Link>
              </div>
              <div className="flex gap-[5px] items-center">
                <span>
                  <TimerReset />
                </span>
                <span>زمان مطالعه: {article.time} دقیقه</span>
              </div>
            </div>
            <div className="mt-[20px] xl:mt-0">
              <h1 className="text-[18px] md:text-[34px] font-bold text-center xl:text-start">{article.title}</h1>
            </div>
            <div className="leading-10 mt-[20px]">{article.body}</div>
          </div>
          <div className="bg-[#0e2338] px-[30px] py-[50px] rounded-[10px]">
            <div className="flex flex-col gap-[30px]">
              <div>
                <h3 className="text-[22px] font-bold">
                  {article?.comments?.length || 0} دیدگاه
                </h3>
              </div>
              <div className="flex flex-col gap-[20px]">
                {article?.comments?.map((comment) => (
                  <CommentCard key={comment.text} comment={comment} />
                ))}
              </div>
              <div className="mt-[20px] py-[20px]">
                <AddCommentsUser id={id} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] w-full xl:w-1/4 text-white">
          <div className="flex flex-col xl:flex-row items-center gap-[10px] bg-[#1B344D] p-[20px]">
            {author && (
              <>
                <div className="flex justify-center items-center w-[100px] h-[100px] rounded-full overflow-y-hidden border-[2px] border-[#51b6ff] ml-[5px]">
                  <img
                    className="object-cover"
                    src={author.img}
                    alt={author.name}
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-[10px] min-w-[50px]">
                  <div className="text-[17px] font-bold">{author.name}</div>
                  <Link to={`/author/${author.userId}`}>
                    <button className="bg-[#51b6ff] text-[14px] max-w-[90px] px-[8px] py-[3px] rounded-[5px] cursor-pointer">
                      تمام مقالات
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col bg-[#1B344D] p-[20px]">
            <div className="flex flex-col gap-[5px]">
              <h5 className="text-[16px] font-extrabold text-center xl:text-right">۵ مقاله اخیر</h5>
              <p className="text-[12px] text-center xl:text-right">
                ۵ مقاله اخیر از این قسمت برای شما در دسترس است
              </p>
            </div>
            <div className="flex flex-col gap-[15px] justify-center mt-[25px]">
              <RelatedArticle latestArticles={latestArticles} />
              <Link to="/">
                <button className="w-full py-[10px] px-[20px] border-[#51b6ff] border-[1px] rounded-[3px] hover:bg-[#51b6ff] transition-colors duration-200 cursor-pointer">
                  مشاهده همه مقالات
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div className="pt-[50px] pb-[120px]">{content}</div>;
}
