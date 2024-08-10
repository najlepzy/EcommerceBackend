import app from "./app";
import connectDB from "./config/db";
import http from "http";
import { Server as SocketServer } from "socket.io";

const server = http.createServer(app);
const io = new SocketServer(server);

const PORT = 8080;

io.on("connection", (socket) => {
  console.log("A user connected with socket:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const start = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

export { io };
start();
