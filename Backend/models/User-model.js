const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    boards: {
      type: [String], // Change this to an array of strings
      default: [], // Initialize as an empty array
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
