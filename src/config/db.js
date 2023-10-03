const mongoose = require("mongoose");
const { MONGO_DB } = require("./allEnv");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_DB, {
      dbName: "mobile_programming",
    });
    const { name, host, port } = conn.connections[0];
    return {
      dbName: name,
      host,
      port,
      message: `mongo connected to db=${name}, port=${port}, host=${host}`,
    };
  } catch (error) {
    console.log(error.message);
    return "unable to connect to database";
  }
};

module.exports = { connectDb };
