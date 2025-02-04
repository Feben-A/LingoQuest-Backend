const { Router } = require("express");
const translateController = require("../controllers/translate");
const translateRouter = Router();

translateRouter.get("/:level", translateController.show);

module.exports = translateRouter;
