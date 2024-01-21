import { useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

const GoalForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text }));
    setText("");
  };
  return (
    <section className="font-[700] mb-[20px] py-0 px-[20px] text-white flex flex-col justify-center items-center ">
      <form
        className="border-solid bg-vdark_db  flex items-center justify-center w-[380px] md:w-[450px] px-4 py-2 rounded-lg gap-3"
        onSubmit={onSubmit}
      >
        <div className="w-5 h-5 rounded-full bg-gray-400 dark:bg-vdark_db flex items-center justify-center border-solid border-[1px] border-vdg_blue"></div>
        <input
          type="text"
          name="text"
          id="text"
          required
          value={text}
          placeholder="Create a new todo..."
          onChange={(e) => setText(e.target.value)}
          className="dark:bg-vdark_db outline-none border-0 py-[6px] w-full"
        />
        <button className="text-[30px] dark:hover:text-green-400 hover:text-green-400 transition duration-300 dark:text-white text-gray-600 ease-in-out">
          <TiTickOutline />
        </button>
      </form>
    </section>
  );
};

export default GoalForm;
