export default {
  name: "Wertik",
  builtinModules: "user,auth,forgetPassword,permission,role,rolePermission,userPermission,userRole,me,storage,mail,backup",
  database: {
    dbDialect: process.env.dbDialect,
    dbUsername: process.env.dbUsername,
    dbPassword: process.env.dbPassword,
    dbName: process.env.dbName,
    dbHost: process.env.dbHost,
    dbPort: process.env.dbPort,
  },
  port: 5000,
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
    disable: false,
  },
  restApi: {
    useCors: true,
    useBodyParser: true,
    useMorgan: true,
    showWertik404Page: true,
    onCustomApiFailure: function ({ path, res, err }) {
      res.send("failed at " + path);
    },
    // Below function for custom 404 page or response.
    // restApi404Handler: function () {}
  },
  backup: {
    digitalOceanSpaces: {
      accessKeyId: "",
      secretAccessKey: "",
      spacesEndpoint: "",
      uploadParams: {
        Bucket: "",
        ACL: "",
      },
    },
    dropbox: {
      accessToken: "",
    },
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
      User: {
        beforeBulkCreate() {
          throw new Error("Use signup mutation.");
        }
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
