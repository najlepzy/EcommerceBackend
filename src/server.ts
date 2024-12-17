import http from "http";
import app from "./app";
import { env } from "@config/dotenv";
import connectDB from "@config/db";
import { Server as SocketServer } from "socket.io";
import logger from "@config/logger";

const server = http.createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket) => {
  logger.info(`A user connected with socket ID: ${socket.id}`);
  socket.on("disconnect", () => {
    logger.info(`User with socket ID: ${socket.id} disconnected`);
  });
});

const start = async () => {
  try {
    await connectDB();
    server.listen(env.PORT, () => {
      logger.info(`Server is running on PORT ${env.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

export { io };
start();
