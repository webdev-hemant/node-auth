const cron = require("node-cron");

const cleanupRefreshTokens = () => {
  console.log("Cleaning up refresh tokens...");
};

const cronJobExpression = "*/1 * * * *";

const cronJob = cron.schedule(
  cronJobExpression,
  () => {
    cleanupRefreshTokens();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

console.log("Cron job for token cleanup scheduled.");

process.on("SIGINT", () => {
  console.log("Stopping cron job...");
  cronJob.stop();
  process.exit();
});
