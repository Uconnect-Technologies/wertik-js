require('dotenv').config()
import { get } from "lodash";
import multer from "multer";
import http from "http";

import convertConfigurationIntoEnvVariables from "./framework/helpers/convertConfigurationIntoEnvVariables";
import validateConfigurationObject from "./framework/helpers/validateConfigurationObject";
import { IConfiguration } from "./framework/types/configuration";
import { errorMessage } from "./framework/logger/consoleMessages";
import loadDefaults from "./framework/defaults/loadDefaults";
import initiateLogger from "./framework/logger/index";
import initiateMailer from "./framework/mailer/index";
import { randomString } from "./framework/helpers";
import startServers from "./framework/initialization/startServers";
let connectDatabase = require("./framework/database/connect").default;

export default function (configurationOriginal: IConfiguration) {
  let expressApp = get(configurationOriginal, "expressApp", null);
  if (!expressApp) {
    expressApp = require("express")();
  }
  return new Promise((resolve, reject) => {
    loadDefaults(configurationOriginal)
      .then((configuration: IConfiguration) => {
        validateConfigurationObject(configuration)
          .then(() => {
            convertConfigurationIntoEnvVariables(configuration)
              .then(() => {
                initiateLogger().then((logger) => {
                  initiateMailer(configuration)
                    .then((mailerInstance) => {
                      connectDatabase(configuration)
                        .then(async (database) => {
                          let graphql = require("./framework/graphql/index").default;
                          let restApi = require("./framework/restApi/index").default;
                          let cron = require("./framework/cron/index").default;
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
                            filename: function (req, file, cb) {
                              cb(null, randomString(20) + "_" + file.originalname);
                            },
                          });
                          /* Storage */
                          const httpServer = http.createServer(expressApp);
                          let multerInstance = multer({ storage: storage });

                          let socketio = require("./framework/socket/index").default(configuration, {
                            expressApp: expressApp,
                            httpServer: httpServer,
                            configuration: configuration,
                            dbTables: dbTables,
                            models: models,
                            sendEmail: sendEmail,
                            emailTemplates: emailTemplates,
                            database: database,
                            mailerInstance: mailerInstance,
                          });

                          let { graphql: graphqlAppInstance, graphqlVoyager } = await graphql({
                            expressApp: expressApp,
                            configuration: configuration,
                            dbTables: dbTables,
                            models: models,
                            sendEmail: sendEmail,
                            emailTemplates: emailTemplates,
                            database: database,
                            mailerInstance: mailerInstance,
                            socketio: socketio,
                          });
                          let restApiInstance = await restApi({
                            expressApp: expressApp,
                            configuration: configuration,
                            dbTables: dbTables,
                            models: models,
                            emailTemplates: emailTemplates,
                            sendEmail: sendEmail,
                            database: database,
                            multerInstance: multerInstance,
                            mailerInstance: mailerInstance,
                            socketio: socketio,
                          });

                          cron(configuration, {
                            graphql: graphqlAppInstance,
                            restApi: restApiInstance,
                            socketio: socketio,
                            dbTables: dbTables,
                            models: models,
                            emailTemplates: emailTemplates,
                            sendEmail: sendEmail,
                            database: database,
                            seeds: seeds,
                            logger: logger,
                            multerInstance: multerInstance,
                            mailerInstance: mailerInstance,
                            httpServer: httpServer,
                          });
                          await startServers(configuration, {
                            graphql: graphqlAppInstance,
                            restApi: restApiInstance,
                            graphqlVoyager: graphqlVoyager,
                            httpServer: httpServer,
                          });
                          resolve({
                            socketio: socketio,
                            dbTables: dbTables,
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
                          });
                        })
                        .catch((err2) => {
                          errorMessage(
                            `Failed connecting with database.`
                          );
                          errorMessage(err2);
                          reject(err2);
                        });
                    })
                    .catch((e) => {
                      errorMessage(e);
                    });
                });
              })
              .catch((err2) => {
                errorMessage(
                  `Something went wrong while initializing Wertik js, Please check docs, and make sure you that you pass correct configuration.`
                );
                errorMessage(err2);
                reject(err2);
              });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err: any) => {
        errorMessage("Something went wrong while verifying default configuration \n Received: " + err.message);
      });
  });
}
