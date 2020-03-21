import shell from "shelljs";
import { get } from "lodash";
import multer from "multer";

import convertConfigurationIntoEnvVariables from "./framework/helpers/convertConfigurationIntoEnvVariables";
import validateConfigurationObject from "./framework/helpers/validateConfigurationObject";
import { IConfiguration } from "./framework/types/configuration";
import { errorMessage } from "./framework/logger/consoleMessages";
import loadDefaults from "./framework/defaults/loadDefaults";
import initiateLogger from "./framework/logger/index";
import initiateMailer from "./framework/mailer/index";
import { randomString } from "./framework/helpers";

export default function(apps: any, configurationOriginal: IConfiguration) {
  let expressApp = apps.expressApp ? apps.expressApp : require("express").default();
  return new Promise((resolve, reject) => {
    loadDefaults(configurationOriginal)
      .then((configuration: IConfiguration) => {
        validateConfigurationObject(configuration)
          .then(() => {
            convertConfigurationIntoEnvVariables(configuration)
              .then(() => {
                initiateLogger().then(logger => {
                  initiateMailer(configuration)
                    .then(mailerInstance => {
                      let runEvent = require("./framework/events/runEvent").default(configuration.events);
                      let graphql = require("./framework/graphql/index").default;
                      let restApi = require("./framework/restApi/index").default;
                      let socket = require("./framework/socket/index").default(configuration);
                      let database = require("./framework/database/connect").default(configuration);
                      let dbTables = require("./framework/database/loadTables").default(database, configuration);
                      let models = require("./framework/database/models").default(dbTables, configuration);
                      let sendEmail =
                        get(configuration, "email.disable", false) === false
                          ? require("./framework/mailer/index").sendEmail(configuration, mailerInstance)
                          : null;
                      let seeds = require("./framework/seeds/index").default(configuration, models);
                      let emailTemplates = require("./framework/mailer/emailTemplates").default(configuration, __dirname);
                      /* Storage */
                      let storage = multer.diskStorage({
                        destination: configuration.storage.storageDirectory,
                        filename: function(req, file, cb) {
                          cb(null, randomString(20) + "_" + file.originalname);
                        }
                      });
                      /* Storage */
                      let multerInstance = multer({ storage: storage });

                      let graphqlAppInstance = graphql({
                        expressApp: expressApp,
                        configuration: configuration,
                        dbTables: dbTables,
                        models: models,
                        sendEmail: sendEmail,
                        emailTemplates: emailTemplates,
                        database: database,
                        runEvent: runEvent,
                        mailerInstance: mailerInstance
                      });
                      let restApiInstance = restApi({
                        expressApp: expressApp,
                        configuration: configuration,
                        dbTables: dbTables,
                        models: models,
                        emailTemplates: emailTemplates,
                        sendEmail: sendEmail,
                        database: database,
                        runEvent: runEvent,
                        multerInstance: multerInstance,
                        mailerInstance: mailerInstance
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
                        runEvent: runEvent,
                        multerInstance: multerInstance,
                        mailerInstance: mailerInstance
                      });
                    })
                    .catch(e => {
                      errorMessage(e);
                      console.log("fuck happened");
                    });
                });
              })
              .catch(err2 => {
                errorMessage(
                  `Something went wrong while initializing Wertik js, Please check docs, and make sure you that you pass correct configuration.`
                );
                errorMessage(err2);
                reject(err2);
              });
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch((err: any) => {
        errorMessage("Something went wrong while verifying default configuration \n Received: " + err.message);
      });
  });
}
