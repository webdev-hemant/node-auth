const authRouter = require("express").Router();
const authController = require("../controller/authController");

authRouter.post("/signup", authController.signupController);
authRouter.post("/login", authController.signupController);

module.exports = authRouter;
