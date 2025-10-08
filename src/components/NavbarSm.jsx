import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/AuthSlice";
import Container from "./Container";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavbarSm() {
  const [showMenu, setShowMenu] = useState(false);
  const auth = useSelector((state) => state.auth.authUser);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const closeMenuHandle = () => {
    setShowMenu(false);
  };

  const openMenuHandle = () => {
    setShowMenu(true);
  };

  return (
    <nav className="block xl:hidden shadow-md bg-[#0a2239] w-full h-[80px] fixed top-0 left-0 z-[1000]">
      <div className="relative flex items-center h-full">
        <Container className="flex justify-between items-center h-full">
          <div className="w-[20%] h-full flex items-center">
            <Link className="text-[18px] text-white" to="/">
              Blog App
            </Link>
          </div>
          <div className="h-full flex justify-center items-center">
            <Menu onClick={openMenuHandle} className="text-white" />
          </div>
          {showMenu && (
            <ul className="absolute top-0 left-0 w-full min-h-screen flex flex-col items-center py-[20px] text-[22px] gap-[20px] bg-white text-black z-[200]">
              <X
                onClick={closeMenuHandle}
                className="absolute top-1.5 left-1.5"
              />
              <li>
                <Link
                  onClick={closeMenuHandle}
                  className={
                    location.pathname === "/" ? "text-[#51b6ff]" : "text-black"
                  }
                  to="/"
                >
                  مقالات
                </Link>
              </li>
              <li>
                <Link
                  onClick={closeMenuHandle}
                  className={
                    location.pathname === "/react"
                      ? "text-[#51b6ff]"
                      : "text-black"
                  }
                  to="/react"
                >
                  ریکت
                </Link>
              </li>
              <li>
                <Link
                  onClick={closeMenuHandle}
                  className={
                    location.pathname === "/next"
                      ? "text-[#51b6ff]"
                      : "text-black"
                  }
                  to="/next"
                >
                  نکست
                </Link>
              </li>
              <li>
                <Link
                  onClick={closeMenuHandle}
                  className={
                    location.pathname === "/javascript"
                      ? "text-[#51b6ff]"
                      : "text-black"
                  }
                  to="/javascript"
                >
                  جاوااسکریپت
                </Link>
              </li>
              <li>
                <Link
                  onClick={closeMenuHandle}
                  className={
                    location.pathname === "/authors"
                      ? "text-[#51b6ff]"
                      : "text-black"
                  }
                  to="/authors"
                >
                  نویسندگان
                </Link>
              </li>
              <li>
                {auth ? (
                  <Link
                    onClick={closeMenuHandle}
                    className={
                      location.pathname === "/newPost"
                        ? "text-[#51b6ff]"
                        : "text-black"
                    }
                    to="/newPost"
                  >
                    پست جدید
                  </Link>
                ) : (
                  <Link onClick={closeMenuHandle} to="/login">
                    پست جدید
                  </Link>
                )}
              </li>
            </ul>
          )}
          <div className="w-[20%] h-full text-white flex items-center justify-end gap-[25px]">
            {auth ? (
              <div className="flex flex-col items-center gap-[5px]">
                <p>{user.name}</p>
                <div className="w-full h-[2px] bg-white"></div>
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
      </div>
    </nav>
  );
}
