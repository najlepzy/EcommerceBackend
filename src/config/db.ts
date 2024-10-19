import mongoose from "mongoose";
import { env } from "./dotenv";
import { messages } from "@utils/messages";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI as string);
    console.log(messages.dbConnectionSuccess(conn.connection.host));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(messages.dbConnectionError);
    }
    process.exit(1);
  }
};

export default connectDB;
