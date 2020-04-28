# Wertik Configuration

This is the default configuration for Wertik used in source code.

```javascript
export default {
  name: "Wertik",
  builtinModules: "user,auth,forgetPassword,permission,role,rolePermission,userPermission,userRole,me,storage",
  database: {
    dbDialect: "mysql",
    dbUsername: "root",
    dbPassword: "pass",
    dbName: "graphql",
    dbHost: "localhost",
    dbPort: "3306",
  },
  frontendAppUrl: "http://localhost:8080/",
  frontendAppActivationUrl: "http://localhost:8080/activate-account",
  frontendAppPasswordResetUrl: "http://localhost:8080/reset-password",
  context: {
    data: {
      myName: "My powerful app",
    },
    createContext: async function (mode, context) {
      return {
        value: "Value 1",
      };
    },
  },
  graphql: {
    disable: false,
    port: 4000,
  },
  restApi: {
    disable: false,
    port: 7000,
  },
  forceStartGraphqlServer: true,
  forceStartRestApiServer: true,
  ports: {
    graphql: 4000,
    restApi: 7000,
  },
  modules: [], // For modules please see http://wapgee.com/wertik-js/getting-started/custom-modules,
  events: {
    beforeGraphqlStart: function () {
      console.log("beforeGraphqlStart");
    },
    beforeRestApiStart: function () {
      console.log("beforeRestApiStart");
    },
    database: {
      Permission: {
        afterCreate() {
          console.log("permision created");
        },
      },
    },
  },
  seeds: {
    Role: [{ name: "Admin" }, { name: "Kako" }],
    Permission: [
      { name: "ca", cant: "true", can: "true" },
      { name: "ca1", cant: "true1", can: "true1" },
      { name: "ca2", cant: "true2", can: "true2" },
    ],
  },
  sockets: {
    disable: false,
    port: 2000,
    onClientConnected: function (req, wss) {
      console.log("on client connected", `Total connections right now ${wss.clients.size}`);
    },
    onMessageReceived: function (message) {
      console.log("on message received: " + message);
    },
    onClientDisconnect: function (wss) {
      console.log("on client disconnected", `Total connections right now ${wss.clients.size}`);
    },
  },
  security: {
    allowedIpAddresses: ["*"],
  },
  storage: {
    storageDirectory: "./storage/",
  },
};
```

Now run your app and you see logs something like this if everything went fine

    ✔ [Wertik-js]: WebSocket server started at ws://localhost:2000
    ✔ [Wertik-js]: Rest API server started at http://localhost:7000
    ✔ [Wertik-js]: GraphQL voyager is running at server: http://localhost:9090
    ✔ [Wertik-js]: GraphQL subscriptions started at ws://localhost:4000/subscriptions
    ✔ [Wertik-js]: GraphQL server started at http://localhost:4000/
    ✔ [Wertik-js]: Datbase Connected

For Dependencies you can check wertik-js package.json file.
