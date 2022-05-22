const mongoose = require("mongoose");
let connection;
async function connect() {
  if (connection) return;
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/todaymenu";

  connection = mongoose.connection;

  mongoose.connection.once("open", () => {
    console.log("Database successfully connected");
  });

  mongoose.connection.on("error", () => {
    console.log("Something went wrong");
  });
  await mongoose.connect(uri);
}

async function disconnect() {
  if (!connection) return;

  await mongoose.disconnect();
}

async function cleanup() {
  if (connection) {
    const promises = [];

    for (const collection in connection.collections) {
      promises.push(connection.collections[collection].deleteMany({}));
    }

    await Promise.all(promises);
  }
}

module.exports = { connect, disconnect, cleanup };
