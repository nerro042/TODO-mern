import { useState, useEffect } from "react";
import img from "../../images/icon-check.svg";
import { useDispatch } from "react-redux";
import { updateTicked, deleteGoal } from "../features/goals/goalSlice";
import { FaRegTrashAlt } from "react-icons/fa";

const GoalItem = ({ goal }) => {
  const initialTicked = localStorage.getItem(`ticked_${goal._id}`) === "true";
  const [ticked, setTicked] = useState(initialTicked);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem(`ticked_${goal._id}`, ticked);
  }, [ticked, goal._id]);

  // Save the state to local storage whenever it changes

  const onClick = () => {
    setTicked((prevState) => !prevState);
    // dispatch(updateTicked(goal._id));
  };

  return (
    <div>
      <div className="border-solid bg-vdark_db  flex items-center border-b-[2px] border-b-vdg_blue3 justify-center w-[380px] md:w-[450px] px-4 py-2 gap-3">
        {ticked ? (
          <div className="check-bg w-5 h-5 rounded-full flex items-center justify-center cursor-pointer">
            <img src={img} className="h-3 w-3" onClick={onClick} />
          </div>
        ) : (
          <div
            className="w-5 h-5 rounded-full bg-vdark_db flex items-center justify-center border-solid border-[1px] border-vdg_blue cursor-pointer"
            onClick={onClick}
          ></div>
        )}

        <div
          className={`bg-vdark_db flex outline-none border-0 py-[6px] text-lg_blue2 font-semibold w-full ${
            ticked && "text-vdg_blue2"
          }`}
        >
          {ticked ? (
            <div className="relative inline-block">
              <span className="relative z-20 transition duration-500">
                {goal.text}
              </span>
              <span className="absolute top-[60%] left-0 w-full h-0.5 bg-gray-500 transform -translate-y-1/2 z-30 transition duration-500"></span>
            </div>
          ) : (
            <p className="transition duration-500">{goal.text}</p>
          )}
        </div>

        <div>
          {ticked ? (
            <button
              className="text-red-500"
              onClick={() => dispatch(deleteGoal(goal._id))}
            >
              <FaRegTrashAlt />
            </button>
          ) : (
            <p>{""}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalItem;
