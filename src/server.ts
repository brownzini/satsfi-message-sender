import http from "http";
import { app } from "./app";

import cors from "cors";
import validHash from "./shared/infra/middleware/validHash";

const socketIo = require("socket.io");
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

interface ParamProps {
  keyHub: string;
  data: string;
  channel: string;
}

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.use((socket: any, next: any) => {
  const { keyHub, handle } = socket.handshake.auth;

  if (!keyHub) next(new Error("Unable to connect"));

  socket.userData = keyHub;
  socket.address = socket.handshake.address;

  next();
});

io.on("connection", (socket: any) => {
  const channelID = socket.userData;

  socket.join(channelID);

  //Canal para repassar os dados de doação
  socket.on("processor_pass_on_data", async (param: ParamProps) => {
    const middleware = await validHash(param.data);
    const hasKeyHub = param.hasOwnProperty("keyHub");
    const hasChannel = param.hasOwnProperty("channel");
    if (middleware && hasKeyHub && hasChannel) {
      const dashboardChannel = param.keyHub + param.channel;
      const parsedData = JSON.parse(param.data);
      delete parsedData.token;
      const userKeyhub = parsedData.name;
      io.to(param.keyHub).emit(dashboardChannel, JSON.stringify(parsedData));
      io.to(userKeyhub).emit(userKeyhub + "_confirmed", "paid");
    }
  });
  socket.on("disconnect", () => {});
});

server.listen(PORT);
