const bcrypt = require("bcrypt");
const userModel = require("../model/authModel/userModel");
const { handleErrors } = require("../handleErrors");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../config/allEnv");
const {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} = require("../helper/authHelper");

const signupController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dob,
      roles = ["basic"],
      email,
      password,
    } = req.body;

    if (!email || !password || !firstName || !lastName || !dob) {
      return res.status(400).json({ message: "all fields are required." });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await userModel.create({
      firstName,
      lastName,
      dob,
      roles,
      email,
      password: hashedPassword,
    });

    res.send({ message: "user successfully registered!", newUser });
  } catch (error) {
    res.status(500);
    handleErrors(error, req, res);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  const foundUser = await userModel.findOne({ email });
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  console.log(password, foundUser.password);
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWTs
    const accessToken = generateAccessToken(foundUser);
    const refreshToken = await generateRefreshToken(foundUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, refreshToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { signupController, loginController };
