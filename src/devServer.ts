import wertik, {
  useMysqlDatabase,
  useGraphql,
  useModule,
  useWebSockets,
  useSocketIO,
  useIndependentWebSocketsServer,
  useLogger,
  useWinstonTransport,
  useMailer,
  useRedis,
} from "./index"

wertik({
  port: 1200,
  graphql: useGraphql({
    storeTypeDefFilePath: process.cwd() + "/graphqlSchema.graphql",
  }),
  database: {
    ecommerce: useMysqlDatabase({
      port: 3306,
      name: "wertik",
      host: "127.0.0.1",
      password: "pass",
      username: "root",
    }),
    wapgee_prod: useMysqlDatabase({
      port: 3306,
      name: "wapgee_prod",
      host: "127.0.0.1",
      password: "pass",
      username: "root",
    }),
  },
  modules: {
    Product: useModule({
      name: "Product",
      useDatabase: true,
      database: "ecommerce",
      table: "product",
      on: function ({ belongsTo }) {
        belongsTo({
          database: "ecommerce",
          graphqlKey: "user",
          module: "User",
          options: {
            as: "user",
            foreignKey: "user_id",
            targetKey: "id",
          },
        })
      },
    }),
    User: useModule({
      name: "User",
      useDatabase: true,
      database: "ecommerce",
      table: "user",
      on: function ({ hasMany }) {
        hasMany({
          database: "ecommerce",
          graphqlKey: "products",
          module: "Product",
          options: {
            as: "products",
            foreignKey: "user_id",
            sourceKey: "id",
          },
        })
      },
    }),
    // EcommerceShirts: useModule({
    //   name: "EcommerceShirts",
    //   useDatabase: true,
    //   database: "ecommerce",
    //   table: "shirts",
    //   on: function ({ belongsTo }) {
    //     belongsTo({
    //       database: "ecommerce",
    //       graphqlKey: "user",
    //       module: "EcommerceUsers",
    //       options: {
    //         as: "user",
    //         foreignKey: "user_id",
    //         targetKey: "id",
    //       },
    //     })
    //   },
    // }),
    // EcommerceUsers: useModule({
    //   name: "EcommerceUsers",
    //   useDatabase: true,
    //   database: "ecommerce",
    //   table: "users",
    //   on: function ({ hasMany }) {
    //     hasMany({
    //       database: "ecommerce",
    //       graphqlKey: "shirts",
    //       module: "EcommerceShirts",
    //       options: {
    //         as: "shirts",
    //         foreignKey: "user_id",
    //         sourceKey: "id",
    //       },
    //     })
    //   },
    // }),
    // User: useModule({
    //   name: "User",
    //   useDatabase: true,
    //   table: "users",
    //   database: "wapgee_prod",
    //   on: function ({ hasMany }) {
    //     hasMany({
    //       database: "wapgee_prod",
    //       graphqlKey: "posts",
    //       module: "Post",
    //       options: {
    //         as: "posts",
    //         foreignKey: "created_by",
    //         sourceKey: "id",
    //       },
    //     })
    //   },
    // }),
    // Post: useModule({
    //   name: "Post",
    //   useDatabase: true,
    //   table: "post",
    //   database: "wapgee_prod",
    //   on: function ({ hasOne }) {
    //     hasOne({
    //       module: "User",
    //       graphqlKey: "author",
    //       database: "default",
    //       options: {
    //         as: "author",
    //         sourceKey: "created_by",
    //         foreignKey: "id",
    //       },
    //     })
    //   },
    // }),
  },
  sockets: {
    mySockets: useWebSockets({
      path: "/websockets",
    }),
    socketio: useSocketIO({
      path: "/mysocketioserver",
    }),
    mySockets2: useIndependentWebSocketsServer({
      port: 1500,
    }),
  },
  logger: useLogger({
    transports: useWinstonTransport((winston) => {
      return [
        new winston.transports.File({
          filename: "info.log",
          level: "info",
        }),
      ]
    }),
  }),
  mailer: {
    instances: {
      default: useMailer({
        name: "Default",
      }),
    },
  },
  redis: {
    testRedis: useRedis({
      name: "testRedis",
    }),
  },
})
