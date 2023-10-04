const mongoose = require("mongoose");
const { MONGO_DB, DATABASE_NAME } = require("./allEnv");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_DB, {
      dbName: DATABASE_NAME,
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
