const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  reminder: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    items: [],
  },

  completed: {
    type: Object,
    default: {},
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
