import { get } from "lodash";
import express from "express";
const { ApolloServer } = require("apollo-server-express");

export default async function (props: any) {
  const port = get(props, "port", 5050);
  const app = express();

  Object.keys(props.modules).forEach(async (moduleName) => {
    props.modules[moduleName] = await props.modules[moduleName](props);
  });

  setTimeout(() => {

    const server = new ApolloServer({
      typeDefs: `
        type Book {
            title: String
            author: String
        }
        ${props.modules.users.schema}
        type Query {
            books: [Book]
            users: users
        }
    `,
      resolvers: {
        Query: {
          books: () => [],
        },
      },
    });

    server.applyMiddleware({ app });

    app.get("/w/info", function (req, res) {
      res.json({
        message: "You are running wertik-js",
        version: require("./../../package.json").version,
      });
    });

    app.listen(port, () => {
      console.log(`Wertik JS app listening at http://localhost:${port}`);
    });
  }, 500);
}
