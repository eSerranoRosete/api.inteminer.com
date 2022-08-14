const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const usersRoutes = require("./api/routes/user.routes");

const app = express();

app.use(cors());
app.use("/users", usersRoutes);
app.use("/public", express.static("public"));

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000 ...");
});

mongoose.connect(process.env.DB_CONNECTION, (err) => {
  if (err) throw err;
  console.log("🔥 Connected to database ...");
});
