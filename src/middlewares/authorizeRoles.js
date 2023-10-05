const jwt = require("jsonwebtoken");
const userModel = require("../model/authModel/userModel");
const { ACCESS_TOKEN_SECRET } = require("../config/allEnv");
const { getTokenFromHeader } = require("../helper/commonValidation");

const authorizeRoles = (role) => async (req, res, next) => {
  const token = getTokenFromHeader(req, res);

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const decodedEmail = decoded.email;

    // Check if the user has the required role
    if (decodedEmail) {
      const user = await userModel.findOne({ email: decodedEmail });
      if (user && user.roles.includes(role)) {
        req.user = user.email;
        req.allUser = user;
        next();
      } else {
        return res.status(403).json({ message: "Access forbidden" });
      }
    } else {
      return res.status(401).json({ message: "Access denied 1" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Access denied 2" });
  }
};

module.exports = { authorizeRoles };
