import mongoose from "mongoose";
import { env } from "./dotenv";
import { messages } from "@utils/messages";
import logger from "@config/logger";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI as string);
    logger.info(messages.dbConnectionSuccess(conn.connection.host));
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message}`);
    } else {
      logger.error(messages.dbConnectionError);
    }
    process.exit(1);
  }
};

export default connectDB;
``;
