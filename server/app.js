const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./middlewares/logger");
const userRouter = require("./routers/user");
const translateRouter = require("./routers/translate");
const dashboardRouter = require("./routers/dashboard");

//Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/users", userRouter);
app.use("/spanish/games/translate", translateRouter);
app.use("/student/dashboard", dashboardRouter);

module.exports = app;
