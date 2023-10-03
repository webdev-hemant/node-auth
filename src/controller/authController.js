const signupModel = require("../model/authModel/signupModel");
const { handleErrors } = require("../handleErrors");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    await signupModel.create({ email, password });
    res.send({ message: "user successfully registered!" });
  } catch (error) {
    res.status(500);
    handleErrors(error, req, res);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signupModel.create({ email, password });
    res.send({ message: "user successfully added!" });
  } catch (error) {
    res.status(500);
    handleErrors(error, req, res);
  }
};

module.exports = { signupController, loginController };
