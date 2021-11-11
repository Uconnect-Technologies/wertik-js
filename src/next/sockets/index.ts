import { isFunction } from "lodash";
import { Server as SocketIOServer } from "socket.io";
import {
  Server as WebSocketServer,
  ServerOptions as WebSocketServerOptions,
} from "ws";

export const useWebSockets = (configuration: WebSocketServerOptions = {}) => {
  return (props, app) => {
    if (!configuration.path) {
      throw new Error("Path must be passed for useWebSockets");
    }
    console.log(
      `Web Sockets server starting at ws://localhost:${props.port}${configuration.path}`
    );
    return new WebSocketServer({
      server: app.httpServer,
      ...configuration,
    });
  };
};

export const useIndependentWebSocketsServer = (
  configuration: WebSocketServerOptions = {}
) => {
  return (props, app) => {
    console.log(
      `Web Sockets server starting at ws://localhost:${configuration.port}${configuration.path}`
    );
    return new WebSocketServer({
      ...configuration,
    });
  };
};

export const useSocketIO = (configuration: any = {}) => {
  return (props, app) => {
    console.log(
      `Socket.IO server starting at http://localhost:${props.port}${
        configuration.path ?? "/socket.io"
      }`
    );
    return new SocketIOServer(app.httpServer, configuration);
  };
};

export default function (props, app) {
  Object.keys(props.sockets).forEach((element) => {
    const socket = props.sockets[element];
    if (isFunction(socket)) {
      socket(props, app);
    }
  });
}
