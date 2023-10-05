const {
  getAllPractice,
  addToDatabase,
  tryAllQueries,
} = require("../controller/practiceController");
const { authorizeRoles } = require("../middlewares/authorizeRoles");

const practiceRouter = require("express").Router();

practiceRouter.use(authorizeRoles("basic"));

practiceRouter
  .route("/")
  .get(getAllPractice)
  .post(addToDatabase)
  .patch(tryAllQueries);

module.exports = { practiceRouter };
