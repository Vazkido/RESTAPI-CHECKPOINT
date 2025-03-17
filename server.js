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

app
  .route("/")
  .get(async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send("Error with Server");
    }
  })
  .post(async (req, res) => {
    const { name, email } = req.body;
    try {
      const exists = await User.findOne({
        email,
      });
      if (exists) {
        return res.status(400).send("User already exists");
      }
      await User.create({
        name,
        email,
      });
      res.send("User Created Successfully");
    } catch (error) {
      res.status(500).send("Server is down");
    }
  })
  .put()
  .delete();

app.listen(port, () => {
  console.log("Server is Running Live");
});
