const checkIfEmail = (email = "") => {
  const checkIfEmailRgx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return checkIfEmailRgx.test(email);
};

const getTokenFromHeader = (req, res) => {
  const authHeader = req.header.Authorization || req.headers.authorization;
  let token = "";
  if (
    authHeader &&
    authHeader?.includes("Bearer") &&
    authHeader?.split(" ")[1]
  ) {
    token = authHeader?.split(" ")[1];

    return token;
  } else {
    res.status(401);
    throw new Error("User is not Authorized or token is missing");
  }
};

module.exports = { checkIfEmail, getTokenFromHeader };
