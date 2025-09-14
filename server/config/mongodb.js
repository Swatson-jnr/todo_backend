import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
      mongoose.connection.on("connected", () => console.log("DB Connected"));
  await mongoose.connect(`${process.env.MONGO_URI}/Todo`);
  } catch (error) {
    console.log(error)
  }

};

export default connectDB;
