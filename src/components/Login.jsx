import { useQuery } from "@tanstack/react-query";
import { fetchAuthors } from "../utils/httpReq";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";

export default function Login() {
  const [author, setAuthor] = useState({
    userName: "",
    password: "",
  });

  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: users } = useQuery({
    queryKey: ["author"],
    queryFn: fetchAuthors,
  });

  const existAuthor = users?.find(
    (user) =>
      user.userName === author.userName && user.password === author.password
  );

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(existAuthor));
    if (existAuthor) {
      navigate("/");
    } else {
      alert("نام کاربری یا رمز عبور اشتباه است!");
    }
  };

  const handleCheckbox = (user) => {
    setSelectedId(user.id);
    setAuthor({
      userName: user.userName,
      password: user.password,
    });
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="w-full max-w-[700px] mx-auto bg-white px-[40px] py-[30px] rounded-lg shadow-md">
        <form onSubmit={loginHandler}>
          <div className="flex flex-col gap-[25px]">
            
            <div className="flex flex-col gap-[10px]">
              <label htmlFor="userName">نام کاربری :</label>
              <input
                className="w-full px-[20px] bg-[#00000013] py-[10px] border border-[#3a97da] rounded-[5px] outline-none focus:border-[#5abafe] transition-colors duration-200"
                type="text"
                id="userName"
                value={author.userName}
                onChange={(e) =>
                  setAuthor({ ...author, userName: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-[10px]">
              <label htmlFor="password">رمز عبور :</label>
              <input
                className="w-full px-[20px] bg-[#00000013] py-[10px] border border-[#3a97da] rounded-[5px] outline-none focus:border-[#5abafe] transition-colors duration-200"
                type="password"
                id="password"
                value={author.password}
                onChange={(e) =>
                  setAuthor({ ...author, password: e.target.value })
                }
              />
            </div>

            
            <div className="flex flex-col gap-[10px]">
              <p className="font-semibold mb-[5px]">انتخاب نویسنده برای تست:</p>
              <div className="flex flex-col gap-[5px]">
                {users?.map((user) => (
                  <label
                    key={user.id}
                    className="flex items-center gap-[8px] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedId === user.id}
                      onChange={() => handleCheckbox(user)}
                    />
                    <span>{user.name}</span>
                  </label>
                ))}
              </div>
            </div>

            
            <div>
              <button
                className="w-full flex justify-center items-center bg-[#3a97da] px-[20px] py-[10px] text-white rounded-[5px] cursor-pointer hover:bg-[#5abafe] transition-colors duration-200"
                type="submit"
              >
                ورود
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
