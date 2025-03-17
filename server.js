import express from "express";

import { User } from "./models/User.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "restApi" });
    console.log("Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

const port = process.env.PORT || 3000;
const app = express();
connectDB();

app.listen(port, () => {
  console.log("Server is Running Live");
});
