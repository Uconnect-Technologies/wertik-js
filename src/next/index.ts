import { get } from "lodash";
import express from "express";
import graphql from "./graphql/index";
import store from "./store";
import { applyRelationshipsFromStoreToDatabase } from "./database";

export default async function (props: any) {
  const port = get(props, "port", 5050);
  const app = express();
  props.express = app;

  Object.keys(props.modules).forEach(async (moduleName) => {
    props.modules[moduleName] = await props.modules[moduleName](props, store);
  });

  setTimeout(() => {
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

    graphql({ app, store });

    app.get("/w/info", function (req, res) {
      res.json({
        message: "You are running wertik-js",
        version: require("./../../package.json").version,
      });
    });

    applyRelationshipsFromStoreToDatabase(store, props);

    app.listen(port, () => {
      console.log(`Wertik JS app listening at http://localhost:${port}`);
    });
  }, 500);
}
