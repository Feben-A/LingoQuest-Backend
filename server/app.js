const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./logger");
const userRouter = require("./routers/user");

//Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/users", userRouter);

module.exports = app;
