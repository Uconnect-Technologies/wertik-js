import {get} from "lodash"
import cors from "cors"
import bodyParser from "body-parser"
import morgan from "morgan";

import { IRestApiInitialize } from "./../types/servers";
import customApi from "./customApi";
import * as auth from "./../helpers/auth"

export default async function (options: IRestApiInitialize) {
  const {
    configuration,
    dbTables,
    models,
    sendEmail,
    emailTemplates,
    expressApp,
    database,
    multerInstance,
    mailerInstance,
    socketio,
    logger,
  } = options;
  let initializeContext = get(configuration, "context.initializeContext", async function () {});
  initializeContext = await initializeContext("restApi",{
    dbTables,
    models,
    expressApp,
    database,
  });
  expressApp.use(cors());
  expressApp.use(bodyParser.urlencoded({ extended: false }));
  expressApp.use(bodyParser.json());
  expressApp.use(morgan("combined"));
  expressApp.use(async function (req, res, next) {
    let requestContext = await get(configuration.context, "requestContext", () => {})("restApi", req);
    req.wertik = {
      database: database,
      auth: {
        helpers: auth,
      },
      mailerInstance: mailerInstance,
      dbTables: dbTables,
      models: models,
      socketio: socketio,
      sendEmail: sendEmail,
      emailTemplates: emailTemplates,
      multerInstance: multerInstance,
      logger: logger,
      requestContext: requestContext,
      initializeContext: initializeContext,
      configuration: configuration,
    };
    
    next();
  });

  require("./versions/v1/loadAllModules").default(expressApp, configuration, customApi);

  expressApp.get("/w/info", (req, res) => {
    res.status(200).json({
      message: require("./../../../package.json").welcomeResponse,
      version: require("./../../../package.json").version,
    });
  });

  return expressApp;
}
