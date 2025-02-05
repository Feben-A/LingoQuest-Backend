const { Router } = require("express");
const dashboardRouter = Router();
const dashboardControllers = require("../controllers/dashboard");

dashboardRouter.get("/", dashboardControllers.index);
