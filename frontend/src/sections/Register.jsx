import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../pages/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error("Sign up error");
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("passwords does not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="text-[2rem] font-[700] mb-[30px] py-0 px-[20px] text-white flex flex-col justify-center items-center ">
        <h1 className="flex gap-1 justify-center items-center">
          <FaUser /> Register
        </h1>

        <p className="text-center">Please create an account</p>
      </section>

      <section className="w-[70%] my-0 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full p-[10px] rounded-lg mb-[10px]">
            <input
              type="name"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              className="w-full p-[10px] rounded-lg"
            />
          </div>

          <div className="w-full p-[10px] rounded-lg mb-[10px]">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email address"
              className="w-full p-[10px] shadow-lg rounded-lg"
            />
          </div>

          <div className="w-full p-[10px] rounded-lg mb-[10px]">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              className="w-full p-[10px] shadow-lg rounded-lg"
            />
          </div>

          <div className="w-full p-[10px] rounded-lg mb-[10px]">
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
              className="w-full p-[10px] shadow-lg rounded-lg"
            />
          </div>

          <div className="w-full p-[10px] text-blue-900 rounded-lg">
            <button
              type="submit"
              className="check-bg py-[10px] px-[20px] text-[18px] cursor-pointer shadow-lg rounded-lg font-[700] w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
