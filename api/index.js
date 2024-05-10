const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://mish1450:mlsmls@cluster0.sig22z7.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error Connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("server running on port ", port);
});

const Habit = require("./models/habit");
const Tag = require("./models/tag");

// Habits
//fetchlist
app.get("/habitslist", async (req, res) => {
  try {
    const allHabits = await Habit.find({});
    res.status(200).json(allHabits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create
app.post("/habits", async (req, res) => {
  try {
    const { title, reminder, tags } = req.body;
    const newHabit = new Habit({
      title,
      reminder,
      tags,
    });

    console.log("trying to add habit: ", newHabit);

    const savedHabit = await newHabit.save();
    res.status(200).json(savedHabit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//complete
app.put("/habits/:habitId/completed", async (req, res) => {
  const habitId = req.params.habitId;
  const updatedCompletion = req.body.completed;

  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      habitId,
      { completed: updatedCompletion },
      { new: true }
    );

    if (!updatedHabit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    res.status(200).json({ message: "Habit completion status updated" });
  } catch (error) {
    res.status(500).json({ error: error.messsage });
  }
});

// update

// delete
app.delete("/habits/:habitId", async(req, res) => {
  try {
    const {habitId} = req.params;
    await Habit.findByIdAndDelete(habitId);
    res.status(200).json({message: "habit deleted successfully"})

  } catch(error) {
    res.status(500).json({error:"unable to delete habit"});
  }
})

// Tags

//fetchlist
app.get("/tagslist", async (req, res) => {
  try {
    const allTags = await Tag.find({});
    res.status(200).json(allTags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create
app.post("/tags", async (req, res) => {
  try {
    const { name } = req.body;
    const newTag = new Tag({
      name,
    });
    const savedTag = await newTag.save();
    res.status(200).json(savedTag);
  } catch (error) {
    res.status(500).json({ error: "Network error", error });
  }
});

// update

// delete
