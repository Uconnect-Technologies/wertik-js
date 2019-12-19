import customApi from "./customApi";
import { IRestApiInitialize } from "./../types/servers";

const { get } = require("lodash");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
import getUserWithAccessToken from "./../security/getUserWithAccessToken";
import getUserAllPermissions from "./../security/getUserAllPermissions";
import getUserRoles from "./../security/getUserRoles";

//expressApp,configuration,dbTables, models, allEmailTemplates,sendEmail,database,WertikEventEmitter
export default function(options: IRestApiInitialize) {
  const {
    context,
    configuration,
    dbTables,
    models,
    sendEmail,
    emailTemplates,
    expressApp,
    database,
    runEvent
  } = options;
  let {restApi} = configuration;
  const port = get(restApi,'port',4000);
  if (get(restApi,'disable', true) === true) {
    return expressApp;
  }
  expressApp.use(cors());
  expressApp.use(bodyParser.urlencoded({ extended: false }));
  expressApp.use(bodyParser.json());
  expressApp.use(morgan("combined"));
  expressApp.use(async function(req, res, next) {
    let user = await getUserWithAccessToken(models.User, get(req, "headers.authorization", ""));
    let userPermissions = user ? await getUserAllPermissions(user.id, database) : [];
    let createContext = await get(configuration.context, "createContext", () => {})();
    let userRoles = user ? await getUserRoles(user.id, database) : [];
    req.user = user;
    req.userPermissions = userPermissions;
    req.userRoles = userRoles;
    req.dbTables = dbTables;
    req.models = models;
    req.context = get(configuration.context, "data", {});
    req.sendEmail = sendEmail;
    req.emailTemplates = emailTemplates;
    req.createContext = createContext;
    next();
  });

  require("./versions/v1/loadAllModules").default(expressApp, configuration, customApi);

  expressApp.get("/", (req, res) => {
    res.json({
      message: "Welcome to wertik, You have successfully running Wertik rest api!"
    });
  });

  expressApp.get("*", function(req, res) {
    res.status(404).json({
      message: "Not found",
      detail: "Request page didn't found"
    });
  });
  if (configuration.forceStartRestApiServer === true) {
    expressApp.listen(port, () => {
      console.log(`Rest API server started at http://localhost:${port}!`);
    });
  }

  return expressApp;
}
