const jwt = require("jsonwebtoken");
const { getTokenFromHeader } = require("./commonValidation");
const { ACCESS_TOKEN_SECRET } = require("../config/allEnv");

const validateToken = async (req, res, next) => {
  const token = getTokenFromHeader(req, res);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401);
      throw new Error("User is not Authorized");
    }
    req.user = decodedToken.email;
    next();
  });
};

module.exports = { validateToken };
