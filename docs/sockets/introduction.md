### Sockets - Beta

Wertik-js uses `ws` for websockets integration, Please see https://github.com/websockets/ws. To see how Sockets is enabled please see https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/socket/index.ts. This file enables Websockets with Wertik-js.

By default the socket server runs at port `ws://localhost:2000`. You can detect events for connected, message received and client disconnected by:

```javascript
let object = {
  // Rest of the configuration
  sockets: {
  disable: false,
  port: 2000,
  onClientConnected: function(req, wss) {
      console.log("on client connected", `Total connections right now ${wss.clients.size}`);
    },
    onMessageReceived: function(message) {
      console.log("on message received: " + message);
    },
    onClientDisconnect: function(wss) {
      console.log("on client disconnected", `Total connections right now ${wss.clients.size}`);
    }
  },
}
```

#### Sending a message in Rest API handler

Consider this handler in your rest api handler, Websockets comes with `req.ws`, So you can send data,

```javascript
async function(req, res) {
  req.ws.send("Test Message"); // This will send test message to all clients
}
```

In GraphQL, WebSockets can be accessed by `context.ws`,

```javascript
function (_, args, context,info) {
  context.ws.send("Test Message"); // Tis will send test message to all clients from GraphQL
}
```


Currently Web Sockets in wertik-js are in beta, So more features are coming.