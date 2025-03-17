import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.listen(port, () => {
  console.log("Server is Running Live");
});
