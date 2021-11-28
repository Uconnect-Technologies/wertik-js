import {
  Server as SocketIOServer,
  ServerOptions as SocketIOServerOptions,
} from "socket.io";
import {
  Server as WebSocketServer,
  ServerOptions as WebSocketServerOptions,
} from "ws";
import { WertikApp, WertikConfiguration } from "../types";

/**
 * Creates WS instance attaches to http server.
 * @param props see interface WebSocketServerOptions
 * @returns WebSocketServer instance
 */
export const useWebSockets = (props: WebSocketServerOptions = {}) => {
  return ({
    configuration,
    wertikApp,
  }: {
    configuration: WertikConfiguration;
    wertikApp: WertikApp;
  }) => {
    if (!props.path) {
      throw new Error("Path must be passed for useWebSockets");
    }
    console.log(
      `Web Sockets server starting at ws://localhost:${configuration.port}${props.path}`
    );
    return new WebSocketServer({
      server: wertikApp.httpServer,
      ...props,
    });
  };
};

/**
 * Create independent web sockets server that runs on different port.
 * @param props see interface WebSocketServerOptions
 * @returns WebSocketServer instance
 */
export const useIndependentWebSocketsServer = (
  props: WebSocketServerOptions = {}
) => {
  return ({
    configuration,
    wertikApp,
  }: {
    configuration: WertikConfiguration;
    wertikApp: WertikApp;
  }) => {
    console.log(
      `Web Sockets server starting at ws://localhost:${props.port}/${
        props.path ?? ""
      }`
    );
    return new WebSocketServer({
      ...props,
    });
  };
};

/**
 * Creates sockets io server on current http server.
 * @param props see interface SocketIOServerOptions from socket.io
 * @returns SocketIOServer
 */
export const useSocketIO = (props: any = {}) => {
  return ({
    configuration,
    wertikApp,
  }: {
    configuration: WertikConfiguration;
    wertikApp: WertikApp;
  }) => {
    console.log(
      `Socket.IO server starting at http://localhost:${configuration.port}${
        props.path ?? "/socket.io"
      }`
    );
    return new SocketIOServer(wertikApp.httpServer, props ?? {});
  };
};
