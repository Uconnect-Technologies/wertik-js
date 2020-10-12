import { ISocketConfiguration } from "../types/servers";
import { get } from "lodash";
import { IConfiguration } from "../types/configuration";
import { successMessage } from "../logger/consoleMessages";
import { defaultSocketOptions } from "../defaults/options/index";
import SocketIO from "socket.io";

export const defaultSocketInstance = (options: ISocketConfiguration, context: any) => {
  const disable = get(options, "disable", false);
  if (disable === true) {
    return null;
  }
  const { httpServer } = context;
  const io = SocketIO(httpServer);
  io.on("connection", (socket) => {
    options.onClientConnected({
      socket,
    });
    socket.on("message", options.onMessageReceived);
    socket.on("disconnect", options.onClientDisconnect);
  });
  return io;
};

export default function (options: IConfiguration, context: any) {
  let ws = defaultSocketInstance(
    {
      onClientConnected: options.sockets.onClientConnected,
      onMessageReceived: options.sockets.onMessageReceived,
      onClientDisconnect: options.sockets.onClientDisconnect,
      disable: options.sockets.disable,
    },
    context
  );
  return ws;
}
