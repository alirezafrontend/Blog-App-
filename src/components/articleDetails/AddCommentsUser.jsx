import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addComment, queryClient } from "../../utils/httpReq";
import { toast } from "sonner";

export default function AddCommentsUser({ id }) {
  const [commentForm, setCommentForm] = useState({ user: "", text: "" });

  const { mutate } = useMutation({
    mutationFn: ({ id, comment }) => addComment({ id, comment }),
    onMutate: async ({ comment }) => {
      await queryClient.cancelQueries(["articles", id]);
      const prevComment = queryClient.getQueryData(["articles", id]);

      queryClient.setQueryData(["articles", id], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          comments: [...(oldData.comments || []), comment],
        };
      });

      setCommentForm({ user: "", text: "" });

      return { prevComment };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["articles", id], context.prevComment);
      toast.error("خطا در ثبت نظر ❌", {
        cancel: {
          label: "بستن",
          className: "!bg-[#FF6B6B] !hover:bg-[#e05555] !text-white px-3 py-1 rounded-md",
          onClick: (toastId) => toast.dismiss(toastId),
        },
      });
    },
    onSuccess: () => {
      toast.success("نظر شما با موفقیت ثبت شد ✅", {
        cancel: {
          label: "بستن",
          className: "!bg-[#51B6FF] !hover:bg-[#3a94d6] !text-white px-3 py-1 rounded-md",
          onClick: (toastId) => toast.dismiss(toastId),
        },
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["articles", id]);
    },
  });

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!commentForm.user || !commentForm.text) return;
    mutate({ id, comment: commentForm });
  };
  return (
    <>
      <form onSubmit={handleSendComment}>
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="name">نام کاربر:</label>
            <input
              onChange={(e) =>
                setCommentForm({ ...commentForm, user: e.target.value })
              }
              className="w-full py-[10px] px-[20px] border-[1px] border-white rounded-[5px] outline-none"
              id="name"
              type="text"
              name="user"
              value={commentForm.user}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="comment">نظر:</label>
            <textarea
              onChange={(e) =>
                setCommentForm({ ...commentForm, text: e.target.value })
              }
              className="w-full py-[10px] px-[20px] border-[1px] border-white rounded-[5px] outline-none"
              id="comment"
              name="text"
              value={commentForm.text}
            />
          </div>
        </div>
        <div className="w-full mt-[20px]">
          <button className="w-full py-[15px] px-[20px] rounded-[5px] bg-[#51B6FF] text-white cursor-pointer">
            ارسال نظر
          </button>
        </div>
      </form>
    </>
  );
}
