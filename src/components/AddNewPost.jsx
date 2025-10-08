import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function AddNewPost({ onHandleArticle, user }) {
  const [SelectImg, setSelectImg] = useState("");
  const [article, setArticle] = useState({
    title: "",
    body: "",
    author: user.name,
    comments: [],
    userId: user.userId,
    category: "",
    slug: "",
    coverImage: "",
    time: "",
  });

  const handleFormArticle = (e) => {
    e.preventDefault();
    if (
      article.title &&
      article.body &&
      article.author &&
      article.userId &&
      article.category &&
      article.slug &&
      article.coverImage &&
      article.time
    ) {
      onHandleArticle(article);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormArticle}>
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="title">موضوع مقاله :</label>
            <input
              className="w-full px-[20px] bg-[#ffffff13] py-[10px] border-[1px] border-[#3a97da] rounded-[5px] outline-none focus:border-[#5abafe] transition-colors duration-200"
              placeholder="موضوع مقاله را وارد کنید ..."
              type="text"
              id="title"
              name="title"
              value={article.title}
              onChange={(e) =>
                setArticle({ ...article, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="body">متن مقاله :</label>
            <textarea
              className="w-full px-[20px] bg-[#ffffff13] py-[10px] border-[1px] border-[#3a97da] rounded-[5px] outline-none focus:border-[#5abafe] transition-colors duration-200"
              placeholder="متن مقاله را وارد کنید ..."
              type="text"
              id="body"
              name="body"
              rows="7"
              value={article.body}
              onChange={(e) => setArticle({ ...article, body: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[10px] relative">
            <label htmlFor="category">دسته بندی :</label>
            <select
              className="custom-select appearance-none w-full px-[20px] py-[10px] border border-[#3a97da] rounded-[5px] outline-none focus:border-[#5abafe] transition-colors duration-200 cursor-pointer"
              name="category"
              id="category"
              value={article.category}
              onChange={(e) =>
                setArticle({ ...article, category: e.target.value })
              }
            >
              <option value="">انتخاب دسته بندی مقاله</option>
              <option value="react">react</option>
              <option value="next">next</option>
              <option value="javascript">javascript</option>
            </select>
            <ChevronDown
              size={20}
              className="absolute left-[15px] top-[70%] -translate-y-1/2 pointer-events-none text-[#5abafe]"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="slug">آدرس مقاله :</label>
            <input
              className="w-full px-[20px] bg-[#ffffff13] py-[10px] border-[1px] border-[#3a97da] rounded-[5px] outline-none focus:border-[#5abafe] transition-colors duration-200"
              placeholder="آدرس مقاله را وارد کنید ..."
              type="text"
              id="slug"
              name="slug"
              value={article.slug}
              onChange={(e) => setArticle({ ...article, slug: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="time">زمان مطالعه :</label>
            <input
              className="w-full px-[20px] bg-[#ffffff13] py-[10px] border-[1px] border-[#3a97da] rounded-[5px] outline-none focus:border-[#5abafe] transition-colors duration-200"
              placeholder="زمان مطالعه را وارد کنید ..."
              type="text"
              id="time"
              name="time"
              value={article.time}
              onChange={(e) =>
                setArticle({ ...article, time: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="comments">انتخاب عکس مقاله :</label>
            <div className="w-full flex justify-between gap-[10px]">
              <div
                onClick={() => {
                  setSelectImg("react");
                  setArticle({ ...article, coverImage: "/react.webp" });
                }}
                className={`flex justify-center items-center w-[30%] max-h-[100px] overflow-hidden cursor-pointer border-[5px] transition-all duration-200 ${
                  SelectImg === "react"
                    ? "border-[#5abafe]"
                    : "border-[#1b344d]"
                }`}
              >
                <img
                  className="w-full object-cover"
                  src="/react.webp"
                  alt="react"
                />
              </div>
              <div
                onClick={() => {
                  setSelectImg("next");
                  setArticle({ ...article, coverImage: "/next.webp" });
                }}
                className={`flex justify-center items-center w-[30%] max-h-[100px] overflow-hidden cursor-pointer border-[5px] transition-all duration-200 ${
                  SelectImg === "next" ? "border-[#5abafe]" : "border-[#1b344d]"
                }`}
              >
                <img
                  className="w-full object-cover"
                  src="/next.webp"
                  alt="next"
                />
              </div>
              <div
                onClick={() => {
                  setSelectImg("js");
                  setArticle({ ...article, coverImage: "/js.png" });
                }}
                className={`flex justify-center items-center w-[30%] max-h-[100px] overflow-hidden cursor-pointer border-[5px] transition-all duration-200 ${
                  SelectImg === "js" ? "border-[#5abafe]" : "border-[#1b344d]"
                }`}
              >
                <img className="w-full object-cover" src="/js.png" alt="js" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-[30px]">
          <button className="w-full px-[20px] py-[10px] bg-transparent border-[1px] border-[#5abafe] text-white rounded-[5px] hover:bg-[#5abafe] transition-colors duration-200 cursor-pointer">
            ارسال مقاله
          </button>
        </div>
      </form>
    </div>
  );
}
