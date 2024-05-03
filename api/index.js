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

// create

// update

// delete

// Tags

//fetchlist
app.get("/tagslist", async(req, res) => {
  try {
    const allTags = await Tag.find({})
    res.status(200).json(allTags);
  } catch (error) {
    res.status(500).json({error: error.message});
  }

});

// create
app.post("/tags", async (req, res) => {
  try {
    const {name} = req.body;
    const newTag = new Tag({
      name,
    });
    const savedTag = await newTag.save();
    res.status(200).json(savedTag);
  } catch (error) {
    res.status(500).json({error: "Network error", error});
  }
});

// update

// delete