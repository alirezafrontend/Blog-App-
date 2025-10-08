import { Link, useLocation } from "react-router-dom";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/AuthSlice";

export default function Navbar() {
  const auth = useSelector((state) => state.auth.authUser);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <nav className="hidden xl:block shadow-md bg-[#0a2239] w-full h-[80px] fixed top-0 left-0 z-[1000]">
      <Container className="flex justify-between h-full">
        <div className="w-[20%] h-full flex items-center">
          <Link className="text-[25px] text-white" to="/">
            Blog App
          </Link>
        </div>
        <ul className="w-4/6 h-full flex justify-center items-center gap-[20px] text-white">
          <li>
            <Link
              className={
                location.pathname === "/" ? "text-[#51b6ff]" : "text-white"
              }
              to="/"
            >
              مقالات
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/react" ? "text-[#51b6ff]" : "text-white"
              }
              to="/react"
            >
              ریکت
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/next" ? "text-[#51b6ff]" : "text-white"
              }
              to="/next"
            >
              نکست
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/javascript"
                  ? "text-[#51b6ff]"
                  : "text-white"
              }
              to="/javascript"
            >
              جاوااسکریپت
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/authors"
                  ? "text-[#51b6ff]"
                  : "text-white"
              }
              to="/authors"
            >
              نویسندگان
            </Link>
          </li>
          <li>
            {auth ? (
              <Link
                className={
                  location.pathname === "/newPost"
                    ? "text-[#51b6ff]"
                    : "text-white"
                }
                to="/newPost"
              >
                پست جدید
              </Link>
            ) : (
              <Link to="/login">پست جدید</Link>
            )}
          </li>
        </ul>
        <div className="w-[20%] h-full text-white flex items-center justify-end gap-[25px]">
          {auth ? (
            <div className="flex gap-[10px] items-center">
              <p>{user.name}</p>
              <div className="w-[2px] h-[25px] bg-white"></div>
              <Link
                onClick={() => dispatch(logOut())}
                className="text-red-600"
                to="/login"
              >
                خروج
              </Link>
            </div>
          ) : (
            <Link
              className="bg-[#51b6ff] px-[15px] py-[5px] rounded-[5px]"
              to="/login"
            >
              ورود
            </Link>
          )}
        </div>
      </Container>
    </nav>
  );
}
