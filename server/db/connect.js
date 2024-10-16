const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connected");
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connect };
