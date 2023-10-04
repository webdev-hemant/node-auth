const jwt = require("jsonwebtoken");
const { getTokenFromHeader } = require("./commonValidation");

const validateToken = async (req, res, next) => {
  const token = getTokenFromHeader(req, res);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401);
      throw new Error("User is not Authorized");
    }
    req.user = decodedToken.userId;
    next();
  });
};

module.exports = { validateToken };
