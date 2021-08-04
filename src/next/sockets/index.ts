import { isFunction } from "lodash";
import { Server } from "socket.io";
import { Server as WebSocketServer } from "ws";

export const useWebSockets = (configuration) => {
  return (props) => {
    return new WebSocketServer({
      server: props.server,
      ...configuration,
    });
  };
};

export const useIndependentWebSocketsServer = (configuration) => {
  return (props) => {
    return new WebSocketServer({
      ...configuration,
    });
  };
};

export const useSocketIO = (configuration) => {
  return (props) => {
    return new Server(props.server, {
      ...configuration,
    });
  };
};

export default function (props) {
  Object.keys(props.sockets).forEach((element) => {
    const socket = props.sockets[element];
    if (isFunction(socket)) socket(props);
  });
}
