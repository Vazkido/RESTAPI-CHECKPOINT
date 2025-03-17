import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "restApi" });
    console.log("Connected SuccessFully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
