const mongoose = require("mongoose");

const connectDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not configured");
  }

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGO_DB_NAME || "placement-sahay",
  });

  console.log("MongoDB connected successfully");
};

module.exports = connectDatabase;
