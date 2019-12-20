import {ISocketConfiguration } from "../types/servers";
import {get} from "lodash";
import isIPAllowed from "../security/isIPAllowed";
import { IConfiguration } from "../types/configuration";

export const defaultSocketInstance = (options: ISocketConfiguration) => {
  const WebSocket = require('ws');
  const port = get(options,'port',2000);
  const disable = get(options,'disable',false);
  if (disable === true) {
    return null;
  }

  const wss = new WebSocket.Server({
    port: port,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024 // Size (in bytes) below which messages
    }
  });
  wss.on('connection', function connection(ws,req) {
    let f = isIPAllowed(req.connection.remoteAddress,options.security.allowedIpAddresses,'ws',{ws});
    if (f === true) {
      ws.on('message', function incoming(message) {
        options.onMessageReceived(message, wss);
      });
      ws.on('close', function close() {
        options.onClientDisconnect(wss);
      });
      options.onClientConnected(req,wss);
      ws.send('Socket connected, message from server side.');
    }
  });

  console.log(`WebSocket server started at ws://localhost:${port}`)

  return wss;
}

export default function (options: IConfiguration) {
  let ws = defaultSocketInstance({
    onClientConnected: options.sockets.onClientConnected,
    onMessageReceived: options.sockets.onMessageReceived,
    onClientDisconnect: options.sockets.onClientDisconnect,
    disable: options.sockets.disable,
    port: options.sockets.port,
    security: options.security
  });
  return ws;
}