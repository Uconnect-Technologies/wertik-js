import { get } from "lodash";
import express from "express";
import graphql from "./graphql/index";
import store from "./store";
import {
  applyRelationshipsFromStoreToDatabase,
  applyRelationshipsFromStoreToGraphql,
} from "./database";
import pause from "./../framework/helpers/pause";
import { emailSender } from "./mailer/index";
import cronJobs from "./cronJobs";
import storage from "./storage";

export default async function (props: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const port = get(props, "port", 5050);
      const skip = get(props, "skip", false);
      const app = get(props, "express", express());

      props.express = app;
      props.email.sendEmail = emailSender(props);

      for (const moduleName of Object.keys(props.modules)) {
        props.modules[moduleName] = await props.modules[moduleName](
          props,
          store
        );
      }

      applyRelationshipsFromStoreToDatabase(store, props);
      applyRelationshipsFromStoreToGraphql(store, props);

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

        graphql({ app, store, props });

        app.get("/w/info", function (req, res) {
          res.json({
            message: "You are running wertik-js",
            version: require("./../../package.json").version,
          });
        });

        cronJobs(props);

        storage(props);

        setTimeout(() => {
          console.log(props.storage);
        }, 1500);

        if (skip === false) {
          app.listen(port, () => {
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
