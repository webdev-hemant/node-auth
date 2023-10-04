const jwt = require("jsonwebtoken");
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

module.exports = { generateAccessToken, generateRefreshToken };
