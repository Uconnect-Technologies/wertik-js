import { get } from "lodash";
import express from "express";
import graphql from "./graphql/index";
import store from "./store";
import {
  applyRelationshipsFromStoreToDatabase,
  applyRelationshipsFromStoreToGraphql,
} from "./database";
import { emailSender } from "./mailer/index";
import cronJobs from "./cronJobs";
import storage from "./storage/index";
import sockets from "./sockets";
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
      };

      const port = get(configuration, "port", 5050);
      const skip = get(configuration, "skip", false);
      const app = get(configuration, "express", express());
      const httpServer = http.createServer(app);

      wertikApp.httpServer = httpServer;
      wertikApp.express = app;

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

      applyRelationshipsFromStoreToDatabase(store, wertikApp);
      applyRelationshipsFromStoreToGraphql(store, wertikApp);

      app.get("/w/info", function (req, res) {
        res.json({
          message: "You are running wertik-js",
          version: require("./../../package.json").version,
        });
      });

      configuration.cronJobs && cronJobs(configuration, wertikApp);
      configuration.storage && storage(configuration, wertikApp);
      configuration.sockets && sockets(configuration, wertikApp);

      if (configuration.graphql) {
        wertikApp.graphql = graphql({
          wertikApp,
          app,
          store,
          configuration,
        });
      }

      for (const mailName of Object.keys(configuration.mailer)) {
        wertikApp.mailer[mailName] = configuration.mailer[mailName];
      }

      wertikApp.sendEmail = emailSender(wertikApp);

      app.use(async function (req, res, next) {
        req.wertik = wertikApp;
        next();
      });

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
