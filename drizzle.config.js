import dotenv from "dotenv";
dotenv.config({path: ".env.local"});

console.log("Using DB URL:", process.env.NEXT_PUBLIC_DB_CONNECTION_STRING);

/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./configs/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,  // ✅ Make sure this matches the log above
  },
};
