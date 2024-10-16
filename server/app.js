const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const express = require("express");
const app = express();
const db = require("./db/connect");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const User = require("./models/User").User;
const Habit = require("./models/Habit").Habit;

// Middleware
const checkToken = require("./middleware/checkToken").checkToken;
app.use(cors());
app.use(express.json());

db.connect();

app.get("/api/user", checkToken, async (req, res) => {
  console.log(req.token);
  //verify the JWT token generated for the user
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res
        .status(403)
        .send("Could not verify user, please login and try again.");
    } else {
      //If token is successfully verified, we can send the autorized data
      res.json({
        authorizedData,
      });
      console.log("SUCCESS: Connected to protected route");
    }
  });
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
      jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.log(err);
            res.status(500).send("Server error, please login again.");
          }
          res.send(token);
        }
      );
    } else {
      res.status(401).send("Email or Password were invalid");
    }
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
