const express = require("express");
const bodyparser = require("body-parser");
const { connectDb } = require("./src/config/db");
const { APP_PORT } = require("./src/config/allEnv");
const authRouter = require("./src/routes/authRoutes");
const { practiceRouter } = require("./src/routes/practiceRoutes");

const app = express();
app.use(bodyparser.json());

app.use("/auth", authRouter);
app.use("/practice", practiceRouter);

connectDb().then((res) => {
  app.listen(APP_PORT, () =>
    console.log(
      `server is running on port=${APP_PORT} and connected to db=${res.dbName}`
    )
  );
});
