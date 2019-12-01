import validateConfigurationObject from "./framework/helpers/validateConfigurationObject";
import convertConfigurationIntoEnvVariables from "./framework/helpers/convertConfigurationIntoEnvVariables";
import initiateLogger from "./framework/logger/index";
import {IConfiguration} from "./framework/types/configuration"

export default function (apps,configuration: IConfiguration) {
    let expressApp = apps.expressApp ? apps.expressApp : require("express").default(); 
    return new Promise((resolve, reject) => {
        validateConfigurationObject(configuration).then(() => {
            convertConfigurationIntoEnvVariables(configuration).then(() => { 
                initiateLogger().then((logger) => {
                    const EventEmitter = require('events');
                    const WertikEventEmitter = new EventEmitter();
                    require("./framework/events/prepareEvents").default(configuration,WertikEventEmitter);
                    let graphql = require("./framework/graphql/index").default;
                    let restApi = require("./framework/restApi/index").default;
                    let socket = require("./framework/socket/index").default(configuration.sockets);
                    let database = require("./framework/database/connect").default(configuration);
                    let dbTables = require("./framework/database/loadTables").default(database, configuration);
                    let models = require("./framework/database/models").default(dbTables);
                    let {sendEmail} = require("./framework/mailer/index");
                    let seeds = require("./framework/seeds/index").default(configuration, models)
                    let emailTemplates = require("./framework/mailer/emailTemplates").default(configuration,__dirname);
                    let graphqlAppInstance = graphql({
                        expressApp: expressApp,
                        configuration: configuration,
                        dbTables: dbTables,
                        models: models,
                        emailTemplates: emailTemplates,
                        database: database,
                        WertikEventEmitter: WertikEventEmitter
                    });
                    let restApiInstance = restApi({
                        expressApp: expressApp,
                        configuration: configuration,
                        dbTables: dbTables,
                        models: models,
                        emailTemplates: emailTemplates,
                        sendEmail: sendEmail,
                        database: database,
                        WertikEventEmitter
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
                        events: WertikEventEmitter,
                        seeds: seeds,
                        logger: logger
                    });
                })
            }).catch((err2) => {
                console.log("Something went wrong while initializing Wertik js, Please check docs, and make sure you that you pass correct configuration.");
                console.log(err2);
                reject(err2);
            })
        }).catch((err) => {
            reject(err);
        })
    });
}