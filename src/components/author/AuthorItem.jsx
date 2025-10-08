import { useQuery } from "@tanstack/react-query";
import { getArticlesByUserId } from "../../utils/httpReq";
import { Link } from "react-router";

export default function AuthorItem({ author }) {
  const userId = author?.userId;

  const { data: articles } = useQuery({
    queryKey: ["articles", { userId: userId }],
    queryFn: () => getArticlesByUserId({ userId }),
    enabled: !!userId,
  });

  console.log("articles--:", articles);

  return (
    <div className="flex flex-col xl:flex-row gap-y-[1%] items-center w-full md:w-[32%] text-white bg-[#0e2338] rounded-[10px] xl:py-[30px] py-[20px] px-[10px] xl:px-[40px]">
      <div className="w-[49%]">
        <img
          className="w-[150px] h-[150px] rounded-full border-[5px] border-white"
          src={author.img}
          alt="a"
        />
      </div>
      <div className="flex flex-col gap-[15px] w-[49%] mt-[20px]">
        <div className="flex flex-col items-center xl:items-start gap-[5px]">
          <span className="text-[18px] font-extrabold">{author.name}</span>
          <span>برنامه نویس فرانت اند</span>
        </div>
        <div className="w-full h-[2px] rounded-full bg-white"></div>
        <div className="flex flex-col items-center xl:items-start gap-[10px]">
          <span>
            تعداد پست ها : <span>{articles ? articles.length : 0}</span>
          </span>
          <Link to={`/author/${author.userId}`}>
            <span className="w-[150px] bg-[#51b6ff] py-[5px] px-[10px] rounded-[5px] cursor-pointer">
              دیدن همه پست ها
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
