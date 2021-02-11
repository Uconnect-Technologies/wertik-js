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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const lodash_1 = require("lodash");
const multer_1 = __importDefault(require("multer"));
const http_1 = __importDefault(require("http"));
const node_cache_1 = __importDefault(require("node-cache"));
const convertConfigurationIntoEnvVariables_1 = __importDefault(require("./framework/helpers/convertConfigurationIntoEnvVariables"));
const validateConfigurationObject_1 = __importDefault(require("./framework/helpers/validateConfigurationObject"));
const consoleMessages_1 = require("./framework/logger/consoleMessages");
const loadDefaults_1 = __importDefault(require("./framework/defaults/loadDefaults"));
const index_1 = __importDefault(require("./framework/logger/index"));
const index_2 = __importDefault(require("./framework/mailer/index"));
const helpers_1 = require("./framework/helpers");
const startServers_1 = __importDefault(require("./framework/initialization/startServers"));
let connectDatabaseFn = require("./framework/database/connect").default;
exports.connectDatabase = connectDatabaseFn;
exports.serve = function (configurationOriginal) {
    let expressApp = lodash_1.get(configurationOriginal, "expressApp", null);
    if (!expressApp) {
        expressApp = require("express")();
        expressApp.use((req, res, next) => {
            req.wow = true;
            next();
        });
    }
    return new Promise((resolve, reject) => {
        loadDefaults_1.default(configurationOriginal)
            .then((configuration) => {
            validateConfigurationObject_1.default(configuration)
                .then(() => {
                convertConfigurationIntoEnvVariables_1.default(configuration)
                    .then(() => {
                    index_1.default().then((logger) => {
                        index_2.default(configuration)
                            .then((mailerInstance) => __awaiter(this, void 0, void 0, function* () {
                            const cache = new node_cache_1.default();
                            const database = configuration.databaseInstance;
                            let graphql = require("./framework/graphql/index").default;
                            let restApi = require("./framework/restApi/index").default;
                            let cron = require("./framework/cron/index").default;
                            let models = require("./framework/database/loadTables").default(database, configuration);
                            let sendEmail = lodash_1.get(configuration, "email.disable", false) === false
                                ? require("./framework/mailer/index").sendEmail(configuration, mailerInstance)
                                : null;
                            let seeds = require("./framework/seeds/index").default(configuration, models);
                            let emailTemplates = require("./framework/mailer/emailTemplates").default(configuration, __dirname);
                            /* Storage */
                            let storage = multer_1.default.diskStorage({
                                destination: configuration.storage.storageDirectory,
                                filename: function (req, file, cb) {
                                    cb(null, helpers_1.randomString(20) + "_" + file.originalname);
                                },
                            });
                            /* Storage */
                            const httpServer = http_1.default.createServer(expressApp);
                            let multerInstance = multer_1.default({ storage: storage });
                            let socketio = require("./framework/socket/index").default(configuration, {
                                expressApp: expressApp,
                                httpServer: httpServer,
                                configuration: configuration,
                                models: models,
                                sendEmail: sendEmail,
                                emailTemplates: emailTemplates,
                                database: database,
                                mailerInstance: mailerInstance,
                                logger: logger,
                                cache: cache,
                            });
                            let { graphql: graphqlAppInstance, graphqlVoyager } = yield graphql({
                                expressApp: expressApp,
                                configuration: configuration,
                                models: models,
                                sendEmail: sendEmail,
                                emailTemplates: emailTemplates,
                                database: database,
                                mailerInstance: mailerInstance,
                                socketio: socketio,
                                logger: logger,
                                cache: cache,
                            });
                            let restApiInstance = yield restApi({
                                expressApp: expressApp,
                                configuration: configuration,
                                models: models,
                                emailTemplates: emailTemplates,
                                sendEmail: sendEmail,
                                database: database,
                                multerInstance: multerInstance,
                                mailerInstance: mailerInstance,
                                socketio: socketio,
                                logger: logger,
                                cache: cache,
                            });
                            cron(configuration, {
                                graphql: graphqlAppInstance,
                                restApi: restApiInstance,
                                socketio: socketio,
                                models: models,
                                emailTemplates: emailTemplates,
                                sendEmail: sendEmail,
                                database: database,
                                seeds: seeds,
                                logger: logger,
                                multerInstance: multerInstance,
                                mailerInstance: mailerInstance,
                                httpServer: httpServer,
                                cache: cache,
                            });
                            yield startServers_1.default(configuration, {
                                graphql: graphqlAppInstance,
                                restApi: restApiInstance,
                                graphqlVoyager: graphqlVoyager,
                                httpServer: httpServer,
                            });
                            resolve({
                                socketio: socketio,
                                models: models,
                                emailTemplates: emailTemplates,
                                sendEmail: sendEmail,
                                database: database,
                                seeds: seeds,
                                logger: logger,
                                multerInstance: multerInstance,
                                mailerInstance: mailerInstance,
                                //
                                express: expressApp,
                                graphql: graphqlAppInstance,
                                httpServer: httpServer,
                                cache: cache,
                            });
                        }))
                            .catch((e) => {
                            consoleMessages_1.errorMessage(e);
                        });
                    });
                })
                    .catch((err2) => {
                    consoleMessages_1.errorMessage(`Something went wrong while initializing Wertik js, Please check docs, and make sure you that you pass correct configuration.`);
                    consoleMessages_1.errorMessage(err2);
                    reject(err2);
                });
            })
                .catch((err) => {
                reject(err);
            });
        })
            .catch((err) => {
            consoleMessages_1.errorMessage("Something went wrong while verifying default configuration \n Received: " + err.message);
        });
    });
};
//# sourceMappingURL=main.js.map