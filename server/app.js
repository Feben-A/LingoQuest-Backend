const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./logger");

//Middleware
app.use(cors());
app.use(express.json);
app.use(logger);

module.exports = app;
