const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  title: String,
  dateStarted: Date,
  datesCompleted: [Date],
});

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  habits: [
    {
      type: mongoose.Schema.Types.Mixed,
      ref: "habit",
    },
  ],
});

const Habit = mongoose.model("Habit", HabitSchema, "habit");
const User = mongoose.model("User", UserSchema, "user");
module.exports = { User, Habit };
