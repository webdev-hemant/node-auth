const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/authModel/userModel");
const { handleErrors } = require("../handleErrors");
const { REFRESH_TOKEN_SECRET } = require("../config/allEnv");
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

const refreshTokenController = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).send("Refresh token is missing.");
  }

  // Verify and decode the refresh token
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).send("Invalid refresh token.");
    }

    // Find the user in the database based on the username in the refresh token
    const dbUser = await userModel.findOne({ email: user.email });

    if (!dbUser) {
      return res.status(403).send("User not found.");
    }

    // Check if the stored refresh token matches the provided refresh token
    if (dbUser.refreshToken !== refreshToken) {
      return res.status(403).send("Invalid refresh token.");
    }

    // Generate a new access token and send it back
    const accessToken = generateAccessToken(dbUser);
    res.json({ accessToken });
  });
};

module.exports = { signupController, loginController, refreshTokenController };
