const { Router } = require("express");
const userController = require("../controllers/users");

const userRouter = Router();

userRouter.get("/students/", userController.index);
userRouter.post("/register/", userController.register);

module.exports = userRouter;
