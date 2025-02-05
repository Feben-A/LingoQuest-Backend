const { Router } = require("express");
const userController = require("../controllers/users");
const authentication = require("../middlewares/authentication");

const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);

module.exports = userRouter;
