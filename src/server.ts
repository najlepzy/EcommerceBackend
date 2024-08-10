import app from "./app";
import connectDB from "./config/db";

const PORT = 8080;

const start = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

start();
