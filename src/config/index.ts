require("dotenv").config();

// Current ENV
const CURRENT_ENV = process.env.CURRENT_ENV || "production";

// Port
const PORT = process.env.PORT || "4000";

// Database
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://kondratjev:123654342a@remeds0.mwhrz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// JWT
const JWT_TOKEN_SECRET =
  process.env.JWT_TOKEN_SECRET || "my-secret-token-to-change-in-production";
const JWT_REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_TOKEN_SECRET ||
  "my-secret-refresh-token-to-change-in-production";

export default {
  CURRENT_ENV,
  PORT,
  MONGODB_URI,
  JWT_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET
};
