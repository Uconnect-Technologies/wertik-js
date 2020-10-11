const logSymbols = require("log-symbols");
const { get } = require("lodash");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

import getUserWithAccessToken from "./../security/getUserWithAccessToken";
import getUserAllPermissions from "./../security/getUserAllPermissions";
import { successMessage } from "./../logger/consoleMessages";
import { IRestApiInitialize } from "./../types/servers";
import getUserRoles from "./../security/getUserRoles";
import isIPAllowed from "../security/isIPAllowed";
import customApi from "./customApi";

/*

  Wertik-js rest api.

  Each api request, sends data in this format:


  result: {
    status: StatusCodeNumber,
    success: true,
    message: ""
    data: {
      
    }
  }

  And for the errors:

  result: {
    status: StatusCodeNumber,
    success: false,
    message: "Something went wrong",
    data: {

    }
  }

*/

//expressApp,configuration,dbTables, models, allEmailTemplates,sendEmail,database,WertikEventEmitter
export default async function (options: IRestApiInitialize) {
  const {
    configuration,
    dbTables,
    models,
    sendEmail,
    emailTemplates,
    expressApp,
    database,
    runEvent,
    multerInstance,
    mailerInstance,
    websockets,
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
    const ip = req.connection.remoteAddress;
    isIPAllowed(ip, configuration.security.allowedIpAddresses, "express", { res });
    const authToken = get(req, "headers.authorization", "");
    let user;
    if (authToken) {
      user = await getUserWithAccessToken(models.User, authToken);
    }
    let userPermissions = user ? await getUserAllPermissions(user.id, database) : [];
    let userRoles = user ? await getUserRoles(user.id, database) : [];
    req.database = database;
    req.user = user;
    req.userPermissions = userPermissions;
    req.userRoles = userRoles;
    req.mailerInstance = mailerInstance;
    req.dbTables = dbTables;
    req.models = models;
    req.websockets = websockets;
    // req.context = get(configuration.context, "data", {});
    req.sendEmail = sendEmail;
    req.emailTemplates = emailTemplates;
    req.multerInstance = multerInstance;
    req.logger = logger;
    let requestContext = await get(configuration.context, "requestContext", () => {})("restApi", req);
    req.requestContext = requestContext;
    req.initializeContext = initializeContext;
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
