const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
  updateTicked,
} = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoals);
router
  .route("/:id/")
  .patch(protect, updateGoals)
  .patch(protect, updateTicked)
  .delete(protect, deleteGoals);

module.exports = router;
