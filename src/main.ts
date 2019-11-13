import validateConfigurationObject from "./framework/helpers/validateConfigurationObject";
import convertConfigurationIntoEnvVariables from "./framework/helpers/convertConfigurationIntoEnvVariables";


export default function (app,configuration) {
    return new Promise((resolve, reject) => {
    validateConfigurationObject(configuration).then(() => {
        convertConfigurationIntoEnvVariables(configuration).then(() => { 
            const EventEmitter = require('events');
            const WertikEventEmitter = new EventEmitter();
            require("./framework/events/prepareEvents").default(configuration,WertikEventEmitter);
            let graphql = require("./framework/graphql/index").default;
            let restApi = require("./framework/restApi/index").default;
            let socketIO = require("./framework/socket/index").default;
            let dbTables = require("./framework/database/loadTables").default(configuration);
            let database = require("./framework/database/connect").default;
            let models = require("./framework/database/models").default(dbTables);
            let sendEmail = require("./framework/mailer/send").default;
            let seeds = require("./framework/seeds/index").default(configuration, models)
            let allEmailTemplates = require("./framework/mailer/allEmailTemplates").default(configuration,__dirname);
            let graphqlAppInstance = graphql(app,configuration,dbTables,models,allEmailTemplates,sendEmail,database, WertikEventEmitter);
            let restApiInstance = restApi(app,configuration,dbTables,models,allEmailTemplates,sendEmail,database, WertikEventEmitter);
            let socket = socketIO(app);
            resolve({
                graphql: graphqlAppInstance,
                restApi: restApiInstance,
                socket: socket,
                dbTables: dbTables,
                models: models,
                emailTemplates: allEmailTemplates,
                sendEmail: sendEmail,
                database: database,
                events: WertikEventEmitter,
                seeds: seeds
            });
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