import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../pages/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="text-[2rem] font-[700] mb-[50px] py-0 px-[20px] text-white flex flex-col justify-center items-center ">
        <h1 className="flex gap-1 justify-center items-center">
          <FaSignInAlt /> Login
        </h1>

        <p className="text-center">Please login to set your goals!</p>
      </section>

      <section className="w-[70%] my-0 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full p-[10px] rounded-lg mb-[10px]">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email address"
              className="w-full p-[10px] rounded-lg"
            />
          </div>

          <div className="w-full p-[10px] rounded-lg mb-[10px]">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              className="w-full p-[10px] rounded-lg"
            />
          </div>

          <div className="w-full p-[10px] text-blue-900 rounded-lg">
            <button
              type="submit"
              className="check-bg py-[10px] px-[20px] text-[18px] cursor-pointer rounded-lg font-[700] w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
