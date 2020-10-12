export default {
  name: "Wertik",
  builtinModules: "user,auth,forgetPassword,permission,role,rolePermission,userPermission,userRole,me,storage",
  database: {
    dbDialect: "mysql",
    dbUsername: "root",
    dbPassword: "pass",
    dbName: "wertik",
    dbHost: "localhost",
    dbPort: "3306",
  },
  port: 5000,
  startServers: true,
  frontendAppUrl: "http://localhost:8080/",
  frontendAppActivationUrl: "http://localhost:8080/activate-account",
  frontendAppPasswordResetUrl: "http://localhost:8080/reset-password",
  context: {
    initializeContext: function (mode, context) {
      return {
        someKey: "somekeyvalue",
      };
    },
    requestContext: async function (mode, context) {
      return {
        value: "Value 1",
      };
    },
  },
  email: {
    disable: true,
  },
  graphql: {
    disable: false
  },
  restApi: {
    showWertik404Page: true,
    onCustomApiFailure: function ({ path, res }) {
      res.send("failed at " + path);
    }
  },
  modules: [
    {
      name: "Article",
      graphql: {
        crud: {
          query: {
            generate: true,
            operations: "*",
          },
          mutation: {
            generate: true,
            operations: "*",
          },
        },
        schema: `
          type Article {
            id: Int
            title: String
            description: String
            created_at: String
            updated_at: String
          }
          input ArticleInput {
            title: String
            description: String
          }
        `,
        mutation: {
          schema: ``,
          resolvers: {},
        },
        query: {
          schema: ``,
          resolvers: {},
        },
      },
      restApi: {
        endpoints: [
          {
            path: "/apple/response",
            methodType: "get",
            handler: function (req, res) {
              res.json({
                message: true,
              });
            },
          },
        ],
      },
      database: {
        sql: {
          tableName: "article",
          fields: {
            title: {
              type: "STRING",
            },
            description: {
              type: "STRING",
            },
          },
        },
        mongodb: {
          tableName: "article",
          fields: {
            title: String,
            description: String,
            created_at: String,
            updated_at: String,
          },
        },
      },
    },
  ],
  events: {
    beforeGraphqlStart: function () {
      console.log("beforeGraphqlStart");
    },
    beforeRestApiStart: function () {
      console.log("beforeRestApiStart");
    },
    database: {
      Permission: {},
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
    onClientConnected: function ({ ws, req, wss }) {
      ws.id = Math.floor(Math.random() * 1000000);
      console.log("on client connected", `Total connections right now ${wss.clients.size}`);
    },
    onMessageReceived: function ({ ws, message }) {
      console.log("on message received: " + message);
    },
    onClientDisconnect: function ({ wss }) {
      console.log("on client disconnected", `Total connections right now ${wss.clients.size}`);
    },
  },
  security: {
    allowedIpAddresses: ["*"],
  },
  storage: {
    storageDirectory: "./uploads/",
  },
  cron: {
    cronList: [
      {
        expression: "* * * * *",
        function: (context) => {
          // app context is available in context variable.
        },
        options: {},
        events: {
          initialized(i) {},
        },
      },
    ],
  },
};
