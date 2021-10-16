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
import storage from "./storage";
import sockets from "./sockets";
const http = require("http");

export default async function (props: any) {
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

      const port = get(props, "port", 5050);
      const skip = get(props, "skip", false);
      const app = get(props, "express", express());
      const server = http.createServer(app);

      props.server = server;
      wertikApp.server = server;
      props.express = app;
      wertikApp.express = app;
      props.email.sendEmail = emailSender(props);
      wertikApp.email.sendEmail = emailSender(props);

      for (const moduleName of Object.keys(props.modules)) {
        props.modules[moduleName] = wertikApp.modules[moduleName] =
          await props.modules[moduleName](props, store, wertikApp);
      }

      applyRelationshipsFromStoreToDatabase(store, wertikApp);
      applyRelationshipsFromStoreToGraphql(store, wertikApp);

      setTimeout(async () => {
        store.graphql.typeDefs = store.graphql.typeDefs.concat(
          get(props, "graphql.typeDefs", "")
        );
        store.graphql.resolvers.Query = {
          ...store.graphql.resolvers.Query,
          ...get(props, "graphql.resolvers.Query", {}),
        };
        store.graphql.resolvers.Mutation = {
          ...store.graphql.resolvers.Mutation,
          ...get(props, "graphql.resolvers.Mutation", {}),
        };

        props.graphql = wertikApp.graphql = graphql({ app, store, props });

        app.get("/w/info", function (req, res) {
          res.json({
            message: "You are running wertik-js",
            version: require("./../../package.json").version,
          });
        });

        cronJobs(props, wertikApp);
        storage(props, wertikApp);

        sockets(props);

        if (skip === false) {
          server.listen(port, () => {
            console.log(`Wertik JS app listening at http://localhost:${port}`);
          });
        }
        resolve(app);

        console.log(wertikApp);
      }, 500);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}
