"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "Wertik",
    builtinModules: "user,auth,forgetPassword,permission,role,rolePermission,userPermission,userRole,me,storage,mail,backup",
    database: {
        dbDialect: process.env.dbDialect,
        dbUsername: process.env.dbUsername,
        dbPassword: process.env.dbPassword,
        dbName: process.env.dbName,
        dbHost: process.env.dbHost,
        dbPort: process.env.dbPort,
    },
    port: 5000,
    frontendAppUrl: "http://localhost:8080/",
    frontendAppActivationUrl: "http://localhost:8080/activate-account",
    frontendAppPasswordResetUrl: "http://localhost:8080/reset-password",
    context: {
        initializeContext: function (mode, context) {
            return {
                someKey: "somekeyvalue",
            };
        },
        requestContext: function (mode, context) {
            return __awaiter(this, void 0, void 0, function* () {
                return {
                    value: "Value 1",
                };
            });
        },
    },
    email: {
        disable: false,
    },
    graphql: {
        disable: false,
    },
    restApi: {
        useCors: true,
        useBodyParser: true,
        useMorgan: true,
        showWertik404Page: true,
        onCustomApiFailure: function ({ path, res, err }) {
            res.send("failed at " + path);
        },
    },
    backup: {
        digitalOceanSpaces: {
            accessKeyId: "",
            secretAccessKey: "",
            spacesEndpoint: "",
            uploadParams: {
                Bucket: "",
                ACL: "",
            },
        },
        dropbox: {
            accessToken: "",
        },
    },
    modules: [
        {
            name: "Article",
            graphql: {
                crud: {
                    query: {
                        generate: true,
                        operations: "*",
                    },
                    mutation: {
                        generate: true,
                        operations: "*",
                    },
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
                    resolvers: {},
                },
                query: {
                    schema: ``,
                    resolvers: {},
                },
            },
            restApi: {
                endpoints: [
                    {
                        path: "/relations",
                        methodType: "get",
                        handler: function (req, res) {
                            return __awaiter(this, void 0, void 0, function* () {
                                const models = req.wertik.models;
                                const { UserPermission, User, Permission, UserRole, Role } = models;
                                const All = yield User.findAll({
                                    attributes: ['id', 'email'],
                                    include: [
                                        {
                                            model: UserRole,
                                            as: 'user_roles',
                                            attributes: ['id', 'user_id', 'role_id'],
                                            include: [
                                                {
                                                    model: Role,
                                                    as: "role",
                                                    attributes: ['id', 'name'],
                                                },
                                                {
                                                    model: User,
                                                    as: "user",
                                                    attributes: ['id', 'email'],
                                                }
                                            ]
                                        }
                                    ]
                                });
                                res.json({
                                    message: true,
                                    data: All
                                });
                            });
                        },
                    },
                ],
            },
            database: {
                sql: {
                    tableName: "article",
                    fields: {
                        title: {
                            type: "STRING",
                        },
                        description: {
                            type: "STRING",
                        },
                    },
                },
            },
        },
    ],
    events: {
        beforeGraphqlStart: function () {
            console.log("beforeGraphqlStart");
        },
        beforeRestApiStart: function () {
            console.log("beforeRestApiStart");
        },
        graphql: {
            Role: {
                beforeBulkCreate({ mode, params: { args, context } }) {
                    return args;
                },
            },
            User: {
                beforeBulkCreate() {
                    throw new Error("Use signup mutation.");
                },
            },
        },
    },
    seeds: {
        RolePermission: [
            {
                value: { role_id: 1, permission_id: 1 },
                afterCreate(instance) {
                    console.log("Role permission created", instance.id);
                },
            },
        ],
        Permission: [
            {
                value: { name: "ca", cant: "true", can: "true" },
            },
            { value: { name: "ca1", cant: "true1", can: "true1" } },
            { value: { name: "ca2", cant: "true2", can: "true2" } },
        ],
    },
    sockets: {
        disable: false,
        middlewares: [
            ({ socket, next, context }) => __awaiter(void 0, void 0, void 0, function* () {
                console.log("Message while running a socket middleware");
                console.log("Validate your realtime user here. All context is available.");
                next();
            }),
        ],
        onClientConnected: function ({ socket, context }) {
            console.log("client is connected");
            /*
      
            This runs when a user is connected to realtime server, Use middlewares to secure your socket server.
      
            */
            socket.on("message", (val) => {
                console.log(`message`, val);
            });
            socket.on("disconnect", () => {
                console.log(`disconnect`);
            });
        },
    },
    storage: {
        storageDirectory: "./uploads/",
    },
    cron: {
        cronList: [
            {
                expression: "* * * * *",
                function: (context) => {
                    // app context is available in context variable.
                },
                options: {},
                events: {
                    initialized(i) { },
                },
            },
        ],
    },
};
//# sourceMappingURL=defaultConfiguration.js.map