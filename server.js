import express from "express";

import { User } from "./models/User.js";
import mongoose from "mongoose";
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
  .put(async (req, res) => {
    const { name, age, email } = req.body;
    try {
      if (!email || (!name && !age)) {
        return res.status(400).send("Email and one other field is required");
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send("User Not Found");
      }
      user.name = name || user.name;
      user.age = age || user.age;

      await user.save();
      res.send("user has been updated");
    } catch (error) {
      res.send(500).send("Server is down" + error.message);
    }
  });

app
  .get(`/test/:name`, (res, req) => {
    const { name } = req.params;
    res.send("Welcome To Rest Api " + name);
  })

  .delete();

app.listen(port, () => {
  console.log("Server is Running Live");
});
