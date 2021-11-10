import { isFunction } from "lodash";
import { Server } from "socket.io";
import {
  Server as WebSocketServer,
  ServerOptions as WebSocketServerOptions,
} from "ws";

export const useWebSockets = (configuration: WebSocketServerOptions = {}) => {
  return (props, app) => {
    return new WebSocketServer({
      server: app.server,
      ...configuration,
    });
  };
};

export const useIndependentWebSocketsServer = (
  configuration: WebSocketServerOptions = {}
) => {
  return (props, app) => {
    console.log(
      `[Wertik JS] Web Sockets server starting at ws://localhost:${configuration.port}`
    );
    return new WebSocketServer({
      ...configuration,
    });
  };
};

export const useSocketIO = (configuration = {}) => {
  return (props) => {
    return new Server(props.server, {
      ...configuration,
    });
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
