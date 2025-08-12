const express = require("express");
const authRoute = require("./routes/authRoute");
const taskRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");
const dashboardRoute = require("./routes/dashboard.route");
const cors = require("cors");
const dbConnection = require("./loaders/connection");
const { sequelize } = require("./models");
require("dotenv").config();

const app = express();
dbConnection();
app.listen(process.env.PORT);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);
app.use("/api/user", userRoute);
app.use("/api/dashboard", dashboardRoute);
app.use((req, res, next) => {
  res.status(404).json("invalid call");
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. shutting down...");
  await sequelize.close();
  process.exit(0);
});
