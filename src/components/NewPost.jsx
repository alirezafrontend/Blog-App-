import { useMutation } from "@tanstack/react-query";
import AddNewPost from "./AddNewPost";
import { addArticle } from "../utils/httpReq";
import { useSelector } from "react-redux";

export default function NewPost() {
  const user = useSelector((state) => state.auth.user);

  const { mutate } = useMutation({
    mutationFn: addArticle,
    onSuccess: () => {
      console.log("موفق");
      alert("موفق");
    },
  });
  const handleArticle = (article) => {
    mutate(article);
  };

  return (
    <div className="flex flex-col gap-[50px] min-h-screen py-[50px] text-white">
      <div>
        <h1 className="text-center text-[22px] md:text-[25px] font-extrabold">
          افزودن مقاله جدید
        </h1>
      </div>
      <div className="w-full max-w-[700px] mx-auto">
        <AddNewPost onHandleArticle={handleArticle} user={user} />
      </div>
    </div>
  );
}
