import {get} from "lodash"
import cors from "cors"
import bodyParser from "body-parser"
import morgan from "morgan";

import getUserWithAccessToken from "./../security/getUserWithAccessToken";
import getUserAllPermissions from "./../security/getUserAllPermissions";
import { IRestApiInitialize } from "./../types/servers";
import getUserRoles from "./../security/getUserRoles";
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
    const authToken = get(req, "headers.authorization", "");
    let user;
    if (authToken) {
      user = await getUserWithAccessToken(models.User, authToken);
    }
    let userPermissions = user ? await getUserAllPermissions(user.id, database) : [];
    let userRoles = user ? await getUserRoles(user.id, database) : [];
    let requestContext = await get(configuration.context, "requestContext", () => {})("restApi", req);
    req.wertik = {
      database: database,
      auth: {
        helpers: auth,
        user: user
      },
      userPermissions: userPermissions,
      userRoles: userRoles,
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
