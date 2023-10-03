const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let authHeader = req.header.Authorization || req.headers.authorization;
  if (!authHeader) {
    res.status(401);
    throw new Error("User is not Authorized or token is missing");
  }
  let token;
  if (authHeader?.startWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401);
      throw new Error("User is not Authorized or token is missing");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401);
        throw new Error("User is not Authorized");
      }
      req.user = decodedToken.user;
      next();
    });
  }
};

module.exports = { validateToken };
