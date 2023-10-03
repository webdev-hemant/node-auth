const {
  getAllPractice,
  addToDatabase,
  tryAllQueries,
} = require("../controller/practiceController");

const practiceRouter = require("express").Router();

practiceRouter
  .route("/")
  .get(getAllPractice)
  .post(addToDatabase)
  .patch(tryAllQueries);

module.exports = { practiceRouter };
