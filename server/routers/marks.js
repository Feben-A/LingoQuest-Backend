const { Router } = require("express");
const marksRouter = Router();
const authentication = require("../middlewares/authentication");
const marksControllers = require("../controllers/marks");

marksRouter.get("/leaders", marksControllers.showLeaderboard);
marksRouter.patch("/:score", authentication, marksControllers.updateMarks);

module.exports = marksRouter;
