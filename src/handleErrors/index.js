const { ENVIRONMENT } = require("../config/allEnv");
const { errorCodeConstants } = require("../constants/errCodes");

const handleErrors = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  console.log(err, statusCode);
  const errObject = {
    err: "",
    // message: err.message,
    ...(ENVIRONMENT === "dev" && { stackTrace: err.stack }),
  };
  switch (statusCode) {
    case errorCodeConstants.VALIDATION_ERROR:
      errObject.err = "Validation Failed";
      res.json(errObject);
      break;

    case errorCodeConstants.NOT_FOUND:
      errObject.err = "Not Found";
      res.json(errObject);
      break;

    case errorCodeConstants.UNAUTHORIZED:
      errObject.err = "Unauthorized";
      res.json(errObject);
      break;

    case errorCodeConstants.FORBIDDEN:
      errObject.err = "Forbidden";
      res.json(errObject);
      break;

    case errorCodeConstants.SERVER_ERROR:
      errObject.err = "Server Error";
      res.json(errObject);
      break;

    default:
      console.log("No Error, All good !");
      break;
  }
};

module.exports = { handleErrors };
