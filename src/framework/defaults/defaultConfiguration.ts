export default {
  dbDialect: "mysql",
  name: "Wertik",
  builtinModules: "user,auth,permission,role,rolePermission,userPermission,userRole,me",
  mysqlOptions: {
    dbUsername: "root",
    dbPassword: "",
    dbName: "graphql",
    dbHost: "localhost",
    dbPort: "3306"
  },
  frontendAppUrl: "http://localhost:8080/",
  frontendAppActivationUrl: "http://localhost:8080/activate-account",
  frontendAppPasswordResetUrl: "http://localhost:8080",
  context: {
    data: {
      myName: "My powerful app"
    },
    createContext: async function(mode,context) {
      return {
        value: "Value 1"
      };
    }
  },
  graphql: {
    disable: false,
    port: 4000,
  },
  restApi: {
    disable: false,
    port: 7000
  },
  forceStartGraphqlServer: true,
  forceStartRestApiServer: true,
  ports: {
    graphql: 4000,
    restApi: 7000
  },
  modules: [],
  modulesa: [
    {
      name: "Article",
      graphql: {
        crud: {
          query: {
            generate: true,
            operations: "*"
          },
          mutation: {
            generate: true,
            operations: "*"
          }
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
          resolvers: {}
        },
        query: {
          schema: ``,
          resolvers: {}
        }
      },
      restApi: {
        endpoints: [
          {
            docs: {
              title: "Apple module response.",
              description: "Just a message.",
              response: `@apiSuccess {Object} returns an object {message: true}.`
            },
            path: "/apple/response",
            methodType: "get",
            handler: function(req, res) {
              res.json({
                message: true
              });
            }
          }
        ]
      },
      database: {
        sql: {
          fields: {
            title: {
              type: "STRING"
            },
            description: {
              type: "STRING"
            }
          }
        }
      }
    }
  ],
  events: {
    beforeGraphqlStart: function() {
      console.log("beforeGraphqlStart");
    },
    beforeRestApiStart: function() {
      console.log("beforeRestApiStart");
    }
  },
  seeds: {
    Role: [{ name: "Admin" }, { name: "Kako" }],
    Permission: [
      { name: "ca", cant: "true", can: "true" },
      { name: "ca1", cant: "true1", can: "true1" },
      { name: "ca2", cant: "true2", can: "true2" }
    ]
  },
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
  security: {
    allowedIpAddresses: ["::1","::ffff:127.0.0.1"]
  }
};
