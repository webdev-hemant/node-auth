const signupModel = require("../model/authModel/signupModel");
const { handleErrors } = require("../handleErrors");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signupModel.create({ email, password });
    res.send({ message: "user successfully added!" });
  } catch (error) {
    res.status(500);
    handleErrors(error, req, res);
  }
};

module.exports = { signupController };
