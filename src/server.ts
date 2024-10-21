import http from "http";
import app from "./app";
import { env } from "@config/dotenv";
import connectDB from "@config/db";
import { Server as SocketServer } from "socket.io";

const server = http.createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket) => {
  console.log("A user connected with socket:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const start = async () => {
  try {
    await connectDB();
    server.listen(env.PORT, () => {
      console.log(`Server is running on PORT ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

export { io };
start();
