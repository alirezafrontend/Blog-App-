import { Link } from "react-router";

export default function RelatedArticleItem({ article }) {
  return (
    <div className="flex flex-col gap-[20px] bg-[#0e2338] py-[15px] rounded-[5px]">
      <div className="border-r-[5px] border-[#51b6ff] px-[15px]">
        <Link to={`/articles/${article.slug}/${article.id}`}>
          <h3 className="text-white hover:text-[#51b6ff] transition-colors duration-200 cursor-pointer">
            {article.title}
          </h3>
        </Link>
      </div>
      <div className="flex justify-end px-[15px]">
        <div className="flex items-center gap-[10px]">
          <div>
            <span></span>
            <span className="text-[12px] text-[#ffffffd0]">
              {article.author}
            </span>
          </div>
          <div className="w-[2px] h-[12px] bg-white"></div>
          <div>
            <span></span>
            <span className="text-[12px] text-[#ffffffd0]">
              زمان مطالعه: {article.time} دقیقه
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
