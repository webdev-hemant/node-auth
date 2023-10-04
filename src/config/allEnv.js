require("dotenv").config({});

const APP_PORT = process.env.APP_PORT;
const MONGO_DB = process.env.MONGO_DB;
const ENVIRONMENT = process.env.ENVIRONMENT;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

module.exports = {
  APP_PORT,
  MONGO_DB,
  ENVIRONMENT,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
};
