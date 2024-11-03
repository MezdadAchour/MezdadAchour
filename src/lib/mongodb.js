import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connecté");
  } catch (error) {
    console.log("Erreur de connexion MongoDB:", error);
  }
};

export default connectDB;
