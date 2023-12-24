const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

const ticked = new mongoose.Schema();
ticked.add(goalSchema).add({
  ticked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Goal", ticked);
