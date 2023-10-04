const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../config/allEnv");

const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  user.refreshToken = refreshToken;
  await user.save();

  return refreshToken;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = { generateAccessToken, generateRefreshToken, hashPassword };
