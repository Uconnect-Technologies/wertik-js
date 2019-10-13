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
    context: {
        myName: "My powerful app"
    },
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
                        id: Int
                        title: String
                        description: String
                        created_at: String
                        updated_at: String
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
                'apple/11/1': {
                    type: 'get',
                    handler: function (req, res) {
                        res.json({
                            message: true
                        })
                    }
                },
                'people': {
                    type: 'put',
                    handler: function (req, res) {
                        res.json({
                            message: true
                        })
                    }
                }
            },
            fields: {
                sql: {
                    title: {
                        type: "STRING"
                    },
                    description: {
                        type: "STRING"
                    },
                }
            }
        }
    ]
});