const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://jayakrish10s10:v8naHfexDYc9C35M@cluster0.ook0mhj.mongodb.net/",
  {
    serverSelectionTimeoutMS: 5000,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log("MongoDB connection error:", error);
});

module.exports = mongoose;
