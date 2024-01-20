import axios from "axios";

const API_URL = "http://localhost:5000/api/goals/";

//create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

//get all user goals
const getGoal = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

//delete user goals

const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + goalId, config);

  return response.data;
};

const deleteAllGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL, config);

  return response.data;
};

//update ticked
const updateTicked = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + goalId, config);

  return response.data;
};

const goalService = {
  createGoal,
  getGoal,
  deleteGoal,
  deleteAllGoals,
  updateTicked,
};

export default goalService;
