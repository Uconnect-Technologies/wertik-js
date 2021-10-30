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

export * from "./database";
export * from "./modules/modules";
export * from "./graphql";
export * from "./mailer";
export * from "./cronJobs";
export * from "./storage";
export * from "./helpers/modules/backup";
export * from "./sockets";

export default async function (configuration: any = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const wertikApp: { [key: string]: any } = {
        email: {
          sendEmail: () => {},
        },
        modules: {},
        cronJobs: {},
        storage: {},
      };

      const port = get(configuration, "port", 5050);
      const skip = get(configuration, "skip", false);
      const app = get(configuration, "express", express());
      const server = http.createServer(app);

      wertikApp.server = server;
      wertikApp.express = app;
      wertikApp.email = {
        sendEmail: emailSender(configuration),
        ...get(configuration, "email", {}),
      };

      if (configuration.modules) {
        for (const moduleName of Object.keys(configuration.modules)) {
          configuration.modules[moduleName] = wertikApp.modules[moduleName] =
            await configuration.modules[moduleName](
              configuration,
              store,
              wertikApp
            );
        }
      }

      applyRelationshipsFromStoreToDatabase(store, wertikApp);
      applyRelationshipsFromStoreToGraphql(store, wertikApp);

      setTimeout(async () => {
        if (configuration.graphql) {
          configuration.graphql = wertikApp.graphql = graphql({
            wertikApp,
            app,
            store,
            configuration,
          });
        }

        app.get("/w/info", function (req, res) {
          res.json({
            message: "You are running wertik-js",
            version: require("./../../package.json").version,
          });
        });

        configuration.cronJobs && cronJobs(configuration, wertikApp);
        configuration.storage && storage(configuration, wertikApp);
        configuration.sockets && sockets(configuration, wertikApp);

        if (skip === false) {
          server.listen(port, () => {
            console.log(`Wertik JS app listening at http://localhost:${port}`);
          });
        }
        resolve(app);
      }, 500);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}
