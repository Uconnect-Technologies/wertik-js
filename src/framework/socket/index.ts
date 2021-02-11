import { ISocketConfiguration } from "../types/servers";
import { get } from "lodash";
import { IConfiguration } from "../types/configuration";
import SocketIO from "socket.io";

export const defaultSocketInstance = (
  sockets: ISocketConfiguration,
  context: any
) => {
  const { disable, options, onClientConnected, middlewares } = sockets;

  if (disable === true) {
    return null;
  }
  const { httpServer, cache } = context;
  const io = SocketIO(httpServer, options);
  middlewares &&
    middlewares.forEach((fn) => {
      io.use((socket, next) => {
        fn({ socket, next, context });
      });
    });

  io.on("connection", (socket) => {
    onClientConnected({
      socket,
      context,
    });
  });

  return io;
};

export default function (options: IConfiguration, context: any) {
  let ws = defaultSocketInstance(
    {
      onClientConnected: get(
        options,
        "sockets.onClientConnected",
        function () {}
      ),
      disable: get(options, "sockets.disable", false),
      options: get(options, "sockets.options", {}),
      middlewares: get(options, "sockets.middlewares", []),
    },
    context
  );
  return ws;
}
