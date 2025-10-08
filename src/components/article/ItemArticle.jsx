import { useQuery } from "@tanstack/react-query";
import { Heart, MessageSquareText, TimerReset } from "lucide-react";
import { Link } from "react-router";
import { fetchAuthors } from "../../utils/httpReq";

export default function ItemArticle({ article }) {
  const { data } = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
  });

  const author = data?.find((item) => item.userId === article.userId);
  return (
    <div className="shadow-sm p-4 flex flex-col bg-[#0e2338] rounded h-full">
      <div className="rounded flex w-full md:h-40 sm:h-60 h-44 overflow-hidden">
        <Link to={`/articles/${article.slug}/${article.id}`}>
          <img src={article.coverImage} />
        </Link>
      </div>
      <div className="flex flex-col flex-grow">
        <h4 className="mt-3 mb-4 line-clamp-2">
          <Link
            to={`/articles/${article.slug}/${article.id}`}
            className="font-bold text-white text-[18px] text-justify transition duration-200 hover:text-[#51b6ff] h-16 overflow-hidden"
          >
            {article.title}
          </Link>
        </h4>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between">
            {author && (
              <div className="flex items-center gap-2">
                <img
                  className="rounded-full border-[2px] border-white w-7 h-7 object-cover"
                  src={author.img}
                  alt={author.name}
                />
                <p className="text-white font-semibold text-xs">
                  {author.name}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-reverse space-x-2">
            <Link
              className="flex text-white bg-blue-500  items-center font-semibold text-xs py-2 px-4 rounded bg-blue-40 transition duration-200 hover:bg-[#204d82] hover:text-white"
              to={`/${article.category}`}
            >
              {article.category}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-[5px] items-center">
          <span className="group flex items-center gap-[5px] py-0.5 px-2 rounded-[2px] bg-[#6074961a] hover:bg-[#D2DDEC] transition-all duration-200 cursor-pointer">
            <MessageSquareText className="w-[15px] text-gray-300 group-hover:text-gray-700 transition-all duration-200" />
            <span className="text-gray-300 group-hover:text-gray-700 transition-all duration-200">
              {article.comments.length}
            </span>
          </span>
          <span className="group flex items-center gap-[5px] py-0.5 px-2 rounded-[2px] bg-[#cd25251a] hover:bg-[#c71818] transition-all duration-200 cursor-pointer">
            <Heart className="w-[15px] text-[#c71818] group-hover:text-[#fff] transition-all duration-200" />
            <span className="text-[#c71818] group-hover:text-[#fff] transition-all duration-200">
              {article.likes}
            </span>
          </span>
        </div>
        <div className="flex gap-[5px] items-center font-medium text-xs text-gray-400">
          <TimerReset className="w-[14px]" />
          <span>زمان مطالعه {article.time} دقیقه</span>
        </div>
      </div>
    </div>
  );
}
