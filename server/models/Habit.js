const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  title: String,
  datesCompleted: [Date],
});

const Habit = mongoose.model("Habit", HabitSchema);
module.exports = { Habit };
