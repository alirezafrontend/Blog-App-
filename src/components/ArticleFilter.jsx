import { ChevronDown } from "lucide-react";

export default function ArticleFilter({ value, onChange }) {
  

  return (
    <div className="w-full xl:w-1/2 flex justify-end relative">
      <select
        className="w-full xl:max-w-[150px] bg-[#0e2338] text-white py-[10px] px-[12px] border border-white rounded-[8px] appearance-none"
        name="category"
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">همه مقالات</option>
        <option value="react">ریکت</option>
        <option value="next">نکست</option>
        <option value="javascript">جاوااسکریپت</option>
      </select>
      <span className="pointer-events-none absolute left-[8px] top-1/2 -translate-y-1/2 text-white">
        <ChevronDown className="w-[20px]" />
      </span>
    </div>
  );
}
