export default function CommentCard({ comment }) {
  return (
    <div className="flex flex-col gap-[20px] bg-[#1b344d] px-[20px] py-[30px] rounded-[10px]">
      <div className="flex items-center gap-[10px]">
        <div className="w-[40px] h-[40px] rounded-full border-[3px] border-white overflow-hidden">
          <img src="/author.png" alt="user" />
        </div>
        <span className="text-[14px] font-extrabold">{comment?.user}</span>
      </div>
      <div className="w-full h-[1px] bg-[#ffffff93]"></div>
      <div className="text-[16px] font-extrabold mt-[10px]">{comment?.text}</div>
    </div>
  );
}
