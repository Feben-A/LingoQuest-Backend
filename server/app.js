const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./middlewares/logger");
const userRouter = require("./routers/user");
const translateRouter = require("./routers/translate");
const marksRouter = require("./routers/marks");

//Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/users", userRouter);
app.use("/spanish/games/translate", translateRouter);
app.use("/student/marks", marksRouter);

module.exports = app;
