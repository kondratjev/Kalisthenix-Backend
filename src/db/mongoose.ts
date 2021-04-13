import CONFIG from "../config";
import mongoose from "mongoose";

mongoose.set("debug", CONFIG.CURRENT_ENV === "development");

mongoose.connect(CONFIG.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

mongoose.connection.on("error", err => {
  console.error(err);
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});
