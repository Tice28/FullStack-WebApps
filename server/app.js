const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const express = require("express");
const app = express();
const db = require("./db/connect");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const DateHelper = require("./middleware/Date");

// Models
const User = require("./models/User").User;
const Habit = require("./models/User").Habit;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
    },
  })
);

db.connect();

app.get("/api/user", async (req, res) => {
  if (req.session.user !== undefined) {
    const user = await User.findOne({ _id: req.session.user });
    res.send(user.habits);
  } else {
    res.sendStatus(403);
  }
});

app.post("/api/user", async (req, res) => {
  if (await User.exists({ email: req.body.email })) {
    res.status(409).send("User already exists.");
  } else {
    try {
      const pw = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        email: req.body.email,
        password: pw,
      });
      await user.save();
      res.status(200).send("Success!");
    } catch (err) {
      res.send(err);
    }
  }
});

app.post("/api/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.user = user._id;
      req.session.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Send Session");
          res.send(req.session.user);
        }
      });
    }
  } else {
    res.status(401).send("Email or Password were invalid");
  }
});

app.post("/api/habit/create", async (req, res) => {
  if (req.session.user !== undefined) {
    try {
      const user = await User.findOne({ _id: req.session.user });
      const habit = new Habit({
        title: req.body.title,
        dateStarted: DateHelper.dateNow(),
        datesCompleted: [],
      });
      user.habits.push(habit);
      await user.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.sendStatus(403);
  }
});

app.post("/api/habit/update", async (req, res) => {
  if (req.session.user !== undefined) {
    try {
      if (req.body.habit_status == "complete") {
        const user = await User.findById(req.session.user);

        if (user) {
          const habit = user.habits.find(
            (h) => h._id.toString() === req.body.habit_id
          );
          if (habit) {
            habit.datesCompleted.push(DateHelper.dateNow());
            user.markModified("habits");
            await user.save();
            res.sendStatus(200);
          } else {
            res.status(404).send("Habit not found");
          }
        } else {
          res.status(404).send("User not found");
        }
      }
      if (req.body.habit_status === "incomplete") {
        const user = await User.findById(req.session.user);

        if (user) {
          const habit = user.habits.find(
            (h) => h._id.toString() === req.body.habit_id
          );
          if (habit) {
            habit.datesCompleted = habit.datesCompleted.filter(
              (date) => date !== DateHelper.dateNow()
            );
            user.markModified("habits");
            await user.save();
            res.sendStatus(200);
          } else {
            res.status(404).send("Habit not found");
          }
        } else {
          res.status(404).send("User not found");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  } else {
    res.sendStatus(403);
  }
});

app.post("/api/habit/delete", async (req, res) => {
  if (req.session.user !== undefined) {
    try {
      console.log(req.body.habit_id);
      await User.findOneAndUpdate(
        { _id: req.session.user },
        {
          $pull: {
            habits: { _id: new mongoose.Types.ObjectId(req.body.habit_id) },
          },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  } else {
    res.sendStatus(403);
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
