const { Router } = require("express");
const marksRouter = Router();
const authentication = require("../middlewares/authentication");
const marksControllers = require("../controllers/marks");

marksRouter.get("/leaders", authentication, marksControllers.showLeaderboard);
marksRouter.patch("/score", authentication, marksControllers.update);

module.exports = marksRouter;
