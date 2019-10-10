import express from "express";
import wertik from "./main";

let app = express();

wertik(app, {
    dialect: "mysql",
    name: "Wertik",
    builtinModules: "user,auth,permission,role,rolePermission,userPermission",
    db_username: "root",
    db_password: "",
    db_name: "graphql",
    db_host: "localhost",
    db_port: "3306",
    modules: [
        {
            name: "Article",
            graphql: {
                crud: {
                    query: {
                        generate: true,
                        operations: "*"
                    },
                    mutation: {
                        generate: true,
                        operations: "*"
                    }
                },
                schema: `
                    type Article {
                        title: String
                        description: String
                    }
                    input ArticleInput {
                        title: String
                        description: String
                    }
                `,
                mutation: {
                    schema: ``,
                    resolvers: {

                    }
                },
                query: {
                    schema: ``,
                    resolvers: {

                    }
                }
            },
            restApi: {
                //
            }
        }
    ]
});