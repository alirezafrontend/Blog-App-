import { Search } from "lucide-react";

export default function ArticleSearch({ onChange, value }) {
  return (
    <div className="w-full xl:w-1/2 relative text-white rounded-[12px]">
      <input
        className="w-full XL:max-w-[450px] bg-[#0e2338] py-[10px] px-[40px] border-none outline-none rounded-[12px]"
        type="text"
        placeholder="جستجو مقاله..."
        value={value}
        onChange={onChange}
      />
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Search className="w-[15px]" />
      </span>
    </div>
  );
}
