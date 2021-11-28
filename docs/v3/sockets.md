# Sockets

Wertik JS allows using both Socket.IO and WebSockets on same http server as well as creating an independent Web Sockets server. To create socket servers Wertik-js provides these functions: `useWebSockets`, `useIndependentWebSocketsServer`, and `useSocketIO`.

### useWebSockets

useWebSockets allows you to creating a websockets server on current http server.

```js
import wertik, { useWebSockets } from "wertik-js/lib/next";

wertik({
  port: 1200,
  sockets: {
    mySockets: useWebSockets({
      path: "/websockets",
    }),
  },
});
```

Now run your code you will see something like this in your console:

```log
Web Sockets server starting at ws://localhost:1200/websockets
Wertik JS app listening at http://localhost:1200
```

Your Web Sockets server is up an running at ws://localhost:1200/websockets.

### useIndependentWebSocketsServer

useIndependentWebSocketsServer allows you creating a websockets server that runs on different port.

```js
import wertik, { useIndependentWebSocketsServer } from "wertik-js/lib/next";

wertik({
  port: 1200,
  sockets: {
    mySockets2: useIndependentWebSocketsServer({
      port: 1500,
    }),
  },
});
```

Now run your code you will see something like this in your console:

```log
Web Sockets server starting at ws://localhost:1500/
Wertik JS app listening at http://localhost:1200
```

### useSocketIO

useSocketIO allows you creating a Socket IO server that runs on same http server.

```js
import wertik, { useSocketIO } from "wertik-js/lib/next";

wertik({
  port: 1200,
  sockets: {
    socketio: useSocketIO({
      path: "/mysocketioserver",
    }),
  },
});
```

Now run your code you will see something like this in your console:

```log
[DevServer] Socket.IO server starting at http://localhost:1200/mysocketioserver
[DevServer] Wertik JS app listening at http://localhost:1200
```
