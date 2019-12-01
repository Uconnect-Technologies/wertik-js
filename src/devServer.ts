import express from "express";
import wertik from "./main";

let app = express();

wertik({
    expressApp: app
}, {
    dbDialect: "mysql",
    name: "Wertik",
    builtinModules: "user,auth,permission,role,rolePermission,userPermission,userRole,me",
    mysqlOptions: {
        dbUsername: "root",
        dbPassword: "",
        dbName: "graphql",
        dbHost: "localhost",
        dbPort: "3306",
    },
    frontendAppUrl: "http://localhost:8080/",
    frontendAppActivationUrl: "http://localhost:8080/activate-account",
    frontendAppPasswordResetUrl: "http://localhost:8080",
    context: {
        myName: "My powerful app"
    },
    forceStartGraphqlServer: true,
    forceStartRestApiServer: true,
    ports: {
        graphql: 4000,
        restApi: 7000,
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
                endpoints: [
                    {   
                        path: '/apple/11/1',
                        type: 'get',
                        handler: function (req, res) {
                          res.json({
                              message: true
                          })
                        }
                    },
                    {
                        path: '/people/',
                        type: 'put',
                        handler: function (req, res) {
                            res.json({
                                message: true
                            })
                        }
                    }
                ]
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
    ],
    events: {
        GRAPHQL_READY: () => {
            console.log("graphql ready");
        },
        REST_API_READY: () => {
            console.log("rest api ready");
        },
    },
    seeds: {
        Role: [
            {name: "Admin"},
            {name: "Kako"}
        ],
        Permission: [
            {name: "ca",cant: "true", can: "true"},
            {name: "ca1",cant: "true1", can: "true1"},
            {name: "ca2",cant: "true2", can: "true2"},
        ]
    }
}).then((p: any) => {
    p.seeds().then((e) => {
        console.log("Message from seeds", e);
    });
})