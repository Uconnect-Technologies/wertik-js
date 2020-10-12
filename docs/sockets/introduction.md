### Sockets - Beta

Wertik-js uses `ws` for SocketIO integration, Please see https://github.com/socketio/socket.io. To see how Sockets is enabled please see https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/socket/index.ts. This file enables SocketIO with Wertik-js.

By default the socket server runs at port `ws://localhost:2000`. You can detect events for connected, message received and client disconnected by:

```javascript
let object = {
  // Rest of the configuration
  sockets: {
    disable: false,
    onClientConnected: function () {
      console.log("onClientConnected");
    },
    onMessageReceived: function () {
      console.log("onMessageReceived");
    },
    onClientDisconnect: function () {
      console.log("onClientDisconnect");
    },
  },
};
```

#### Sending a message in Rest API handler

Consider this handler in your rest api handler, SocketIO comes with `req.socketio`, So you can send data,

```javascript
async function(req, res) {
  req.socketio.send("Test Message"); // This will send test message to all clients
}
```

In GraphQL, SocketIO can be accessed by `context.socketio`,

```javascript
function (_, args, context,info) {
  context.socketio.send("Test Message"); // Tis will send test message to all clients from GraphQL
}
```

Currently Web Sockets in wertik-js are in beta, So more features are coming.
