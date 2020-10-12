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
    requestContext: async function (mode, context) {
      return {
        value: "Value 1",
      };
    },
  },
  graphql: {
    disable: false,
  },
  restApi: {
    onCustomApiFailure: function ({ path, res }) {
      res.send("failed at " + path);
    },
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
  storage: {
    storageDirectory: "./storage/",
  },
};
```

Now run your app and you see logs something like this if everything went fine

√  [Wertik-js]:  Socket.IO server running at http://localhost:5000
√  [Wertik-js]:  Rest API server started at http://localhost:5000
√  [Wertik-js]:  GraphQL Voyager running at http://localhost:5000/graphql-voyager
√  [Wertik-js]:  GraphQL Server started at http://localhost:5000/graphql
√  [Wertik-js]:  GraphQL Subscriptions are running at ws://localhost:5000/subscriptions
√  [Wertik-js]:  SQL: Database Connected

For Dependencies you can check wertik-js package.json file.
