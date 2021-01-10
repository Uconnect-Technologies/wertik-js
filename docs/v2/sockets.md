#### sockets - beta

**Type:** Object
**Default Value:**
**Description:** For sockets we use Socket.IO.

```javascript
{
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
};
```

For please visit https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/socket/index.ts.