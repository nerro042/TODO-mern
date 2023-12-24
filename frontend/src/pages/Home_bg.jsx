import { NavLink, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Home_bg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [user, setUser] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const onLogOut = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/");
    localStorage.removeItem("user");
  };

  return (
    <div className="flex justify-between px-14 py-[30px] max-sm:px-[30px]">
      <div>
        <NavLink
          to={"/"}
          className="text-2xl text-white font-bold tracking-[5px]"
        >
          TODO
        </NavLink>
      </div>
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
