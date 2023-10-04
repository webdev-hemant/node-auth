const authRouter = require("express").Router();
const authController = require("../controller/authController");

authRouter.post("/signup", authController.signupController);
authRouter.post("/login", authController.loginController);

module.exports = authRouter;
