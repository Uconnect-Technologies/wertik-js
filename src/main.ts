import validateConfigurationObject from "./framework/helpers/validateConfigurationObject";
import convertConfigurationIntoEnvVariables from "./framework/helpers/convertConfigurationIntoEnvVariables";
import initiateLogger from "./framework/logger/index";
import {IConfiguration} from "./framework/types/configuration";
import loadDefaults from "./framework/defaults/loadDefaults";
import {resetDocFile, addContentsToDoc} from "./framework/apiDocs/index"

resetDocFile();

export default function (apps,configurationOriginal: IConfiguration) {
    let expressApp = apps.expressApp ? apps.expressApp : require("express").default(); 
    return new Promise((resolve, reject) => {
        loadDefaults(configurationOriginal).then((configuration) => {
            validateConfigurationObject(configuration).then(() => {
                convertConfigurationIntoEnvVariables(configuration).then(() => { 
                    initiateLogger().then((logger) => {
                        let runEvent = require("./framework/events/runEvent").default(configuration.events);
                        let graphql = require("./framework/graphql/index").default;
                        let restApi = require("./framework/restApi/index").default;
                        let socket = require("./framework/socket/index").default(configuration.sockets);
                        let database = require("./framework/database/connect").default(configuration);
                        let dbTables = require("./framework/database/loadTables").default(database, configuration);
                        let models = require("./framework/database/models").default(dbTables);
                        let sendEmail = require("./framework/mailer/index").sendEmail;
                        let seeds = require("./framework/seeds/index").default(configuration, models)
                        let emailTemplates = require("./framework/mailer/emailTemplates").default(configuration,__dirname);
                        let graphqlAppInstance = graphql({
                            expressApp: expressApp,
                            configuration: configuration,
                            dbTables: dbTables,
                            models: models,
                            sendEmail: sendEmail,
                            emailTemplates: emailTemplates,
                            database: database,
                            runEvent: runEvent
                        });
                        let restApiInstance = restApi({
                            expressApp: expressApp,
                            configuration: configuration,
                            dbTables: dbTables,
                            models: models,
                            emailTemplates: emailTemplates,
                            sendEmail: sendEmail,
                            database: database,
                            runEvent: runEvent
                        });
                        resolve({
                            graphql: graphqlAppInstance,
                            restApi: restApiInstance,
                            socket: socket,
                            dbTables: dbTables,
                            models: models,
                            emailTemplates: emailTemplates,
                            sendEmail: sendEmail,
                            database: database,
                            seeds: seeds,
                            logger: logger,
                            runEvent: runEvent
                        });
                    })
                }).catch((err2) => {
                    console.log("[Wertik-js] Something went wrong while initializing Wertik js, Please check docs, and make sure you that you pass correct configuration.");
                    console.log(err2);
                    reject(err2);
                })
            }).catch((err) => {
                reject(err);
            });
        }).catch((err: any) => {
            console.error('[Wertik-js] Something went wrong while verifying default configuration \n','Received: '+err.message);
        });    
    });
}