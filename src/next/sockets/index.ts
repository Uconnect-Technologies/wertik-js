import { Server as SocketIOServer } from "socket.io";
import {
  Server as WebSocketServer,
  ServerOptions as WebSocketServerOptions,
} from "ws";
import { WertikApp } from "../types/types";
import { WertikConfiguration } from "../types/types.v2";

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
      `Web Sockets server starting at ws://localhost:${configuration.port}${props.path}`
    );
    return new WebSocketServer({
      ...props,
    });
  };
};

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
    return new SocketIOServer(wertikApp.httpServer, props);
  };
};
