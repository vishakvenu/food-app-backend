import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vishakvenu1998:0iudafTdTp8nbNRH@cluster0.ptouzuh.mongodb.net/food-app?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas", error); 
  }
};

export default connectDB;
