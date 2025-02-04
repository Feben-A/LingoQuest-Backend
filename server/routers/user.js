const { Router } = require("express");
const userController = require("../controllers/users");
const authentication = require("../middlewares/authentication");

const userRouter = Router();

userRouter.get("/login", authentication, userController.login);
userRouter.get(
  "/student/dashboard/:student_login",
  authentication,
  userController.show
);
userRouter.post("/register", userController.register);

module.exports = userRouter;
