import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalForm from "../pages/GoalForm";
import GoalItem from "../pages/GoalItem";
import Spinner from "../pages/Spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    setTicked((prevState) => !prevState);
    // dispatch(updateTicked(goal._id));
  };

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getGoals());
  }, [user, navigate, isError, message, dispatch]);

  const getTime = () => {
    const currentTime = new Date().getHours();

    if (currentTime >= 6 && currentTime < 12) {
      return "morning";
    } else if (currentTime >= 12 && currentTime < 16) {
      return "afternoon";
    } else {
      return "evening";
    }
  };
  const timeOfDay = getTime();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="text-[2rem] font-[700] mb-[20px] py-0 px-[20px] text-white flex flex-col justify-center items-center ">
        <h1>
          Good {timeOfDay} {user && user.name}
        </h1>
      </section>
      <GoalForm />

      <section className="flex flex-col md:w-[450px] w-[380px] bg-vdark_db justify-center mx-auto rounded p-2 items-center">
        {goals.length > 0 ? (
          <>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </>
        ) : (
          <div className="text-gray-300 text-xl font-bold">
            <h3>You have no current goals!</h3>
          </div>
        )}

        {goals.length > 0 ? (
          <div className="bg-vdark_db text-vdg_blue2 flex justify-between w-full text-[12px] font-bold py-2 max-sm:px-3">
            <p>{goals.length} items left</p>
            <div className="flex gap-3 max-sm:hidden">
              <button className="hover:text-b_blue transition duration-300 ease-in-out">
                All
              </button>
              <button className="hover:text-b_blue transition duration-300 ease-in-out">
                Active
              </button>
              <button className="hover:text-b_blue transition duration-300 ease-in-out">
                completed
              </button>
            </div>
            <button className="hover:text-b_blue transition duration-300 ease-in-out">
              Clear Completed
            </button>
          </div>
        ) : (
          <p>{""}</p>
        )}
      </section>

      {goals.length > 0 ? (
        <div className=" bg-vdark_db text-dg_blue flex justify-center items-center gap-12 mx-auto rounded py-4 text-[14px] font-bold mt-5 w-[380px] sm:hidden">
          <button className="hover:text-b_blue transition duration-300 ease-in-out">
            All
          </button>
          <button className="hover:text-b_blue transition duration-300 ease-in-out">
            Active
          </button>
          <button className="hover:text-b_blue transition duration-300 ease-in-out">
            completed
          </button>
        </div>
      ) : (
        <p>{""}</p>
      )}

      {goals.length > 0 ? (
        <div className="text-center mt-7 text-vdg_blue2 font-semibold">
          <p>Drag an drop to reorder list</p>
        </div>
      ) : (
        <p>{""}</p>
      )}
    </>
  );
};

export default Dashboard;
