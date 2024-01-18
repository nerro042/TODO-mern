import { NavLink, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaRegMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Home_bg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dark, setDark] = useState(() => {
    const storedTheme = localStorage.getItem("dark");
    if (storedTheme) {
      return storedTheme;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  });

  // const handleThemeSwitch = () => {
  //   setDark(dark === "dark" ? "light" : "dark");
  // };

  const handleThemeSwitch = () => {
    const newTheme = dark === "dark" ? "light" : "dark";
    setDark(newTheme);
    localStorage.setItem("dark", newTheme);
  };

  useEffect(() => {
    if (dark === "light") {
      document.body.style.backgroundColor = "white";
    } else {
      document.body.style.backgroundColor = "";
    }
  }, [dark]);

  useEffect(() => {
    if (dark === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const onLogOut = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/");
    localStorage.removeItem("user");
  };

  return (
    <div className="flex justify-between px-14 py-[30px] max-sm:px-[30px]">
      <div>
        <h3 className="text-2xl text-white font-bold tracking-[5px]">TODO</h3>
      </div>

      <button onClick={handleThemeSwitch} className="text-white text-xl">
        {dark === "dark" ? <GoSun /> : <FaRegMoon />}
      </button>

      <ul className="flex gap-3 text-white">
        {user ? (
          <li>
            <button
              onClick={onLogOut}
              className="flex text-[18px] justify-center gap-1 items-center"
            >
              <FaSignOutAlt className="text-white" /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink
                to={"/login"}
                className="flex text-[18px] justify-center gap-1 items-center"
              >
                <FaSignInAlt /> Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/register"}
                className="flex text-[18px] justify-center gap-1 items-center"
              >
                <FaUser /> Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Home_bg;
