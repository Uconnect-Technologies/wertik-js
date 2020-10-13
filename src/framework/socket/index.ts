import { ISocketConfiguration } from "../types/servers";
import { get } from "lodash";
import { IConfiguration } from "../types/configuration";
import SocketIO from "socket.io";

export const defaultSocketInstance = (sockets: ISocketConfiguration, context: any) => {
  const {disable,options, onMessageReceived, onClientConnected, onClientDisconnect} = sockets;
  if (disable === true) {
    return null;
  }
  const { httpServer } = context;
  const io = SocketIO(httpServer, options);
  io.on("connection", (socket) => {
    onClientConnected({
      socket,
    });
    socket.on("message", onMessageReceived);
    socket.on("disconnect", onClientDisconnect);
  });

  return io;
};

export default function (options: IConfiguration, context: any) {
  let ws = defaultSocketInstance(
    {
      onClientConnected: get(options,'sockets.onClientConnected', function ()  {}),
      onMessageReceived: get(options,'sockets.onMessageReceived', function ()  {}),
      onClientDisconnect: get(options,'sockets.onClientDisconnect', function ()  {}),
      disable: get(options,'sockets.disable', false),
      options: get(options,'sockets.options',{}),
    },
    context
  );
  return ws;
}
