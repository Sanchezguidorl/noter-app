import mongoose from "mongoose";

const connectDB = async () => {
  try {
    return mongoose.connect(
      "mongodb+srv://admin1999:admin1999@noter-app.g3adbk9.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (error) {
    throw new Error("No se pudo establecer la conexión a la base de datos");
  }
};


export default connectDB;