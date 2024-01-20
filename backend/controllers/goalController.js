const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc Get goals
// @route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// @desc Set goals
// @route POST /api/goals
// @access private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text to the field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @desc Update goals
// @route PATCH /api/goals/:id
// @access private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(401);
    throw new error("goal not found");
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }

  //ensure logged in user matches goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc Update ticked
// @route PATCH /api/goals/:id
// @access private
const updateTicked = asyncHandler(async (req, res) => {
  const goalId = await Goal.findById(req.params.id);

  try {
    // Find the goal by ID and update the ticked value using $set
    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: goalId },
      { $set: { ticked: !ticked } }, // Toggle the ticked value
      { new: true } // Return the updated document
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json(updatedGoal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc Delete goals
// @route DELETE /api/goals/:id
// @access private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(401);
    throw new Error("goal not found");
  }

  //check for user
  if (!req.user) {
    res.status(400);
    throw new Error("user not found");
  }

  //ensure logged in user matches goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await goal.deleteOne();

  res.status(200).json({ id: req.params.id });
});

const deleteAllGoals = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Delete all goals for the logged-in user
  const deleteResult = await Goal.deleteMany({ user: req.user.id });

  if (deleteResult.deletedCount === 0) {
    // No goals were deleted, you may want to handle this case based on your requirements
    res.status(404);
    throw new Error("No goals found for the user");
  }

  res.status(200).json({ message: "All user goals deleted" });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
  deleteAllGoals,
  updateTicked,
};
