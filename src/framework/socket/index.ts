import { ISocketConfiguration } from "../types/servers";
import { get } from "lodash";
import isIPAllowed from "../security/isIPAllowed";
import { IConfiguration } from "../types/configuration";
import { successMessage } from "../logger/consoleMessages";
import { defaultSocketOptions } from "../defaults/options/index";

export const defaultSocketInstance = (options: ISocketConfiguration) => {
  const WebSocket = require("ws");
  const port = get(options, "port", 2000);
  const disable = get(options, "disable", false);
  if (disable === true) {
    return null;
  }

  const wss = new WebSocket.Server({
    port: port,
    ...defaultSocketOptions,
  });
  wss.on("connection", function connection(ws, req) {
    let f = isIPAllowed(req.connection.remoteAddress, options.security.allowedIpAddresses, "ws", { ws });
    if (f === true) {
      ws.on("message", function incoming(message) {
        options.onMessageReceived(ws, message, wss);
      });
      ws.on("close", function close() {
        options.onClientDisconnect(wss);
      });
      options.onClientConnected(ws, req, wss);
      ws.send("Socket connected, message from server side.");
    }
  });

  successMessage(`WebSocket server started at`, `ws://localhost:${port}`);

  return wss;
};

export default function (options: IConfiguration) {
  let ws = defaultSocketInstance({
    onClientConnected: options.sockets.onClientConnected,
    onMessageReceived: options.sockets.onMessageReceived,
    onClientDisconnect: options.sockets.onClientDisconnect,
    disable: options.sockets.disable,
    port: options.sockets.port,
    security: options.security,
  });
  return ws;
}
