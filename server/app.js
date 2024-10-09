const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const express = require("express");
const app = express();
const db = require("./db/connect");
const cors = require("cors");

// Models
const User = require("./models/User").User;

// Middleware
app.use(cors());

db.connect();

app.get("/api/user", async (req, res) => {
  const user = await User.find({ email: "test" });
  res.json(user);
});

app.post("/api/user", async (req, res) => {
  //TODO: Encryption, Update User Schema, Add Habit Schema
  try {
    const user = new User({ email: req.email, password: req.password });
    await user.save();
    res.send("Sucess!");
  } catch (err) {
    res.send(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
