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
      mail1: await useMailer(),
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
          beforeBulkCreate: () => {
            console.log("beforebuilkdcreate");
          },
          beforeBulkDelete: () => {
            console.log("beforebuilkdelete");
          },
          beforeBulkUpdate: () => {
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
