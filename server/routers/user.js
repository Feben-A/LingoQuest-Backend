const { Router } = require("express");
const userController = require("../controllers/users");

const userRouter = Router();

userRouter.post("/", userController.register);

module.exports = userRouter;
