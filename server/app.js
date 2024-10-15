const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const express = require("express");
const app = express();
const db = require("./db/connect");
const cors = require("cors");
const bcrypt = require("bcrypt");

// Models
const User = require("./models/User").User;
const Habit = require("./models/Habit").Habit;

// Middleware
app.use(cors());
app.use(express.json());

db.connect();

app.get("/api/user", async (req, res) => {
  const user = await User.find({ email: "test" });
  res.json(user);
});

app.post("/api/user", async (req, res) => {
  if (await User.exists({ email: req.body.email })) {
    res.status(409).json({ message: "User already exists" });
  } else {
    try {
      const pw = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        email: req.body.email,
        password: pw,
      });
      await user.save();
      res.status(200).json({ message: "Success!" });
    } catch (err) {
      res.json({ message: err });
    }
  }
});

app.get("/", async (req, res) => {
  console.log(await User.exists({ email: "Test" }));
  res.send(await User.find({ email: "test" }));
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
