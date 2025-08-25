require("dotenv").config();
const express = require("express");
const authRoute = require("./routes/authRoute");
const taskRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const imageStreamRoute = require("./routes/imageStreamRoute");
const cors = require("cors");
const dbConnection = require("./loaders/connection");
const { sequelize } = require("./models");
const path = require("path");

const app = express();
dbConnection();
app.listen(process.env.PORT);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);
app.use("/api/user", userRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/uploads", imageStreamRoute);
app.use((req, res, next) => {
  res.status(404).json("invalid call");
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. shutting down...");
  await sequelize.close();
  process.exit(0);
});
