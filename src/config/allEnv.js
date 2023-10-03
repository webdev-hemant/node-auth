require("dotenv").config({});

const APP_PORT = process.env.APP_PORT;
const MONGO_DB = process.env.MONGO_DB;
const ENVIRONMENT = process.env.ENVIRONMENT;

module.exports = { APP_PORT, MONGO_DB, ENVIRONMENT };
