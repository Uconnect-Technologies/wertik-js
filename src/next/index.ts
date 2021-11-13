import { get } from "lodash";
import express from "express";
import store from "./store";
import {
  applyRelationshipsFromStoreToDatabase,
  applyRelationshipsFromStoreToGraphql,
} from "./database";
import { emailSender } from "./mailer/index";
import storage from "./storage/index";
import http from "http";
import { WertikConfiguration } from "./types/types.v2";
import { WertikApp } from "./types/types.v2";

export * from "./database";
export * from "./modules/modules";
export * from "./graphql";
export * from "./mailer";
export * from "./cronJobs";
export * from "./storage";
export * from "./helpers/modules/backup";
export * from "./sockets";

export default async function (configuration: WertikConfiguration) {
  return new Promise(async (resolve, reject) => {
    try {
      const wertikApp: WertikApp = {
        modules: {},
        database: {},
        mailer: {},
        graphql: {},
        sockets: {},
        cronJobs: {},
        storage: {},
      };

      const port = get(configuration, "port", 5050);
      const skip = get(configuration, "skip", false);
      const app = get(configuration, "express", express());
      const httpServer = http.createServer(app);

      wertikApp.httpServer = httpServer;
      wertikApp.express = app;

      for (const mailName of Object.keys(configuration.mailer)) {
        wertikApp.mailer[mailName] = configuration.mailer[mailName];
      }

      if (configuration.storage) {
        for (const storageName of Object.keys(configuration.storage)) {
          wertikApp.storage[storageName] = configuration.storage[storageName]({
            configuration: configuration,
            wertikApp: wertikApp,
          });
        }
      }

      if (configuration.cronJobs) {
        for (const cronName of Object.keys(configuration.cronJobs)) {
          wertikApp.cronJobs[cronName] = configuration.cronJobs[cronName]({
            configuration: configuration,
            wertikApp: wertikApp,
          });
        }
      }

      if (configuration.sockets) {
        for (const socketName of Object.keys(configuration.sockets)) {
          wertikApp.sockets[socketName] = configuration.sockets[socketName]({
            configuration: configuration,
            wertikApp: wertikApp,
          });
        }
      }

      if (configuration.database) {
        for (const databaseName of Object.keys(configuration.database)) {
          try {
            wertikApp.database[databaseName] = await configuration.database[
              databaseName
            ]();
          } catch (e) {
            throw new Error(e);
          }
        }
      }

      applyRelationshipsFromStoreToDatabase(store, wertikApp);
      applyRelationshipsFromStoreToGraphql(store, wertikApp);

      if (configuration.modules) {
        for (const moduleName of Object.keys(configuration.modules)) {
          wertikApp.modules[moduleName] = await configuration.modules[
            moduleName
          ]({
            store: store,
            configuration: configuration,
            app: wertikApp,
          });
        }
      }

      app.get("/w/info", function (req, res) {
        res.json({
          message: "You are running wertik-js",
          version: require("./../../package.json").version,
        });
      });

      wertikApp.sendEmail = emailSender(wertikApp);

      if (configuration.graphql) {
        wertikApp.graphql = configuration.graphql({
          wertikApp: wertikApp,
          store: store,
          configuration: configuration,
          expressApp: app,
        });
      }

      app.use(async function (req, res, next) {
        req.wertik = wertikApp;
        next();
      });

      console.log(wertikApp.storage);

      setTimeout(async () => {
        if (skip === false) {
          httpServer.listen(port, () => {
            console.log(`Wertik JS app listening at http://localhost:${port}`);
          });
        }
        resolve(wertikApp);
      }, 500);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}
