import {ISocketInitializeOptions,ISocketConfiguration } from "../types/servers";

export const defaultSocketInstance = (options: ISocketInitializeOptions) => {
  const WebSocket = require('ws');

  const wss = new WebSocket.Server({
    port: 2000,
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
      // should not be compressed.
    }
  });
  wss.on('connection', function connection(ws,req) {
    ws.on('message', function incoming(message) {
      options.onMessageReceived(message, wss);
    });

    ws.on('close', function close() {
      options.onClientDisconnect(wss);
    });

    options.onClientConnected(req,wss);
  
    ws.send('Socket connected, message from server side.');
  });

  console.log("Websocket server is running at ws://localhost:2000 ")

  return wss;
}

export default function (options: ISocketConfiguration) {
  let ws = defaultSocketInstance({
    onClientConnected: options.onClientConnected,
    onMessageReceived: options.onMessageReceived,
    onClientDisconnect: options.onClientDisconnect
  });
  return ws;
}