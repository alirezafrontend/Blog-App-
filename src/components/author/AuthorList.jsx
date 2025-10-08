import { useQuery } from "@tanstack/react-query";
import AuthorItem from "./AuthorItem";
import { fetchAuthors } from "../../utils/httpReq";

export default function AuthorList() {
  const { data: authors } = useQuery({
    queryKey: ["author"],
    queryFn: fetchAuthors,
  });

  return (
    <div className="w-full min-h-screen py-[50px]">
      <div className="flex flex-wrap gap-y-[20px] md:gap-[2%]">
        {authors?.map((author) => {
          return <AuthorItem key={author.id} author={author} />;
        })}
      </div>
    </div>
  );
}
