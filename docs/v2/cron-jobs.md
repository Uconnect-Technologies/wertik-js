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

#### storage - beta

**Type:** Object
**Default Value:**

```javascript
{
    storageDirectory: "./uploads/",
},
```

**Description:** Its a module for storage functionality in your app.

For please visit: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/builtinModules/storage/index.ts.

### Cron - beta

**Type:** Object
**Default Value:** {}
**Description:** Under the we use node-cron library for cron jobs. Please see https://www.npmjs.com/package/node-cron. 

For more please check [Default Configuration](https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/defaults/defaultConfigurations/defaultConfiguration.ts) to get an idea about cron jobs.
