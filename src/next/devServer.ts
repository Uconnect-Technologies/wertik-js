import wertik from "./index";
import { useDatabase } from "./database";
import { useModule } from "./modules/modules";
import { useGraphql } from "./graphql";
import { useMailer } from "./mailer";
import { useCronJob } from "./cronJobs";
import { useStorage } from "./storage";
import Backup from "./helpers/modules/backup";
import {
  useWebSockets,
  useSocketIO,
  useIndependentWebSocketsServer,
} from "./sockets";

(async () => {
  wertik({
    port: 1200,
    skip: false,
    graphql: useGraphql({
      options: {
        playground: true,
        context() {
          return null;
        },
      },
    }),
    cronJobs: {
      my1: useCronJob({
        expression: "* * * * *",
        handler(app) {
          console.log(new Date().toLocaleTimeString());
        },
      }),
    },
    email: {
      myEmail: await useMailer(),
    },
    storage: {},
    sockets: {
      s2: useIndependentWebSocketsServer({
        port: 1212,
      }),
      s1: useWebSockets({}),
      socketio: useSocketIO({
        path: "/wow",
      }),
    },
    database: {
      wapgee: await useDatabase({
        port: 1200,
        password: "pass",
        username: "root",
        host: "localhost",
        name: "wapgee",
      }),
      jscontainer: await useDatabase({
        port: 1200,
        password: "pass",
        username: "root",
        host: "localhost",
        name: "jscontainer",
      }),
    },
    modules: {
      Migrations: useModule({
        name: "Migrations",
        useDatabase: true,
        table: "migrations",
        database: "wapgee",
      }),
      Series: useModule({
        name: "Series",
        useDatabase: true,
        table: "series",
        database: "wapgee",
        on: function ({ hasMany, useMutation }) {
          useMutation({
            query: "sendEmailWah: String",
            resolver: async (_, args, context) => {
              await context.wertik.email.sendEmail("myEmail", {
                template: "Wow",
                variables: {},
                to: "ilyas.datoo@gmail.com",
                from: "someone@gmail.com",
              });
              return "Wow";
            },
            name: "sendEmailWah",
          });
          hasMany({
            graphqlKey: "posts",
            database: "wapgee",
            module: "SeriesPost",
            options: {
              as: "posts",
              foreignKey: "series_id",
            },
          });
        },
      }),
      SeriesPost: useModule({
        name: "SeriesPost",
        useDatabase: true,
        table: "series_post",
        database: "wapgee",
        on({ hasOne }) {
          hasOne({
            graphqlKey: "series",
            database: "wapgee",
            module: "Series",
            options: {
              as: "series",
              foreignKey: "id",
              sourceKey: "series_id",
            },
          });
        },
      }),
      Backup: Backup,
      User: useModule({
        name: "User",
        useDatabase: true,
        database: "wapgee",
        table: "users",
        on: function ({ useQuery, useMutation, useExpress, hasOne, hasMany }) {
          hasMany({
            graphqlKey: "posts",
            database: "wapgee",
            module: "Post",
            options: {
              as: "posts",
              foreignKey: "created_by",
            },
          });
        },
      }),
      Post: useModule({
        name: "Post",
        useDatabase: true,
        database: "wapgee",
        table: "post",
        events: {
          beforeView: () => {
            console.log("beforeView");
          },
          beforeCount: () => {
            console.log("beforeCount");
          },
          beforeList: () => {
            console.log("beforeList");
          },
          beforeCreate: () => {
            console.log("beforebuilkdcreate");
          },
          beforeDelete: () => {
            console.log("beforebuilkdelete");
          },
          beforeUpdate: () => {
            console.log("beforebuilkdupdate");
          },
        },
        on: function ({ useQuery, useMutation, useExpress, hasOne }) {
          hasOne({
            graphqlKey: "user",
            database: "wapgee",
            module: "User",
            options: {
              as: "posts",
              foreignKey: "id",
              sourceKey: "created_by",
            },
          });
        },
      }),
    },
  });
})();
