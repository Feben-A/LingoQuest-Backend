const express = require("express");
const app = express();

//Middleware
app.use(cors());
app.use(express.json);
app.use(logger);

module.exports = app;
