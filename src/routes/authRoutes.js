const authRouter = require("express").Router();
const authController = require("../controller/authController");

authRouter.post("/signup", authController.signupController);

module.exports = authRouter;
