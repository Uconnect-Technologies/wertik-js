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
export default function (options: IRestApiInitialize) {
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
  let { restApi } = configuration;
  const port = get(restApi, "port", 4000);
  if (get(restApi, "disable", true) === true) {
    return expressApp;
  }
  expressApp.use(cors());
  expressApp.use(bodyParser.urlencoded({ extended: false }));
  expressApp.use(bodyParser.json());
  expressApp.use(morgan("combined"));
  expressApp.use(async function (req, res, next) {
    const ip = req.connection.remoteAddress;
    isIPAllowed(ip, configuration.security.allowedIpAddresses, "express", { res });
    let user = await getUserWithAccessToken(models.User, get(req, "headers.authorization", ""));
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
    req.context = get(configuration.context, "data", {});
    req.sendEmail = sendEmail;
    req.emailTemplates = emailTemplates;
    req.multerInstance = multerInstance;
    req.logger = logger;
    let createContext = await get(configuration.context, "createContext", () => {})("restApi", req);
    req.createContext = createContext;
    next();
  });

  require("./versions/v1/loadAllModules").default(expressApp, configuration, customApi);

  expressApp.get("/", (req, res) => {
    res.status(200).json({
      message: require("./../../../package.json").welcomeResponse,
      version: require("./../../../package.json").version,
    });
  });

  expressApp.get("*", function (req, res) {
    res.status(404).json({
      message: "Not found",
      detail: "Request page didn't found",
    });
  });

  if (configuration.forceStartRestApiServer === true) {
    expressApp.listen(port, () => {
      successMessage(`Rest API server started at`, `http://localhost:${port}`);
    });
  }

  return expressApp;
}
