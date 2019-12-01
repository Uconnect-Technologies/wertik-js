import customApi from "./customApi";
import {IRestApiInitialize} from "./../types/servers";

const {get} = require("lodash");
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
let getUserWithAccessToken = require("./../security/getUserWithAccessToken").default;
let getUserAllPermissions = require("./../security/getUserAllPermissions").default

//expressApp,configuration,dbTables, models, allEmailTemplates,sendEmail,database,WertikEventEmitter
export default function (options: IRestApiInitialize) {
    const {
        context,configuration, WertikEventEmitter, dbTables, models, sendEmail, emailTemplates, expressApp, database
    } = options;
    expressApp.use(cors())
    expressApp.use(bodyParser.urlencoded({ extended: false }))
    expressApp.use(bodyParser.json())
    expressApp.use(morgan('combined'))
    expressApp.use(async function (req, res, next) {
        let user = await getUserWithAccessToken(models.User, get(req,'headers.authorization',''));
        let permissions = (user) ? await getUserAllPermissions(user.id,database) : [];
        req.user = user;
        req.permissions = permissions;
        req.dbTables = dbTables;
        req.models = models;
        req.context = context;
        req.sendEmail = sendEmail;
        req.emailTemplates = emailTemplates;
        next();
    });
    
    require("./versions/v1/loadAllModules").default(expressApp,configuration,customApi);
    
    expressApp.get('/', (req, res) => {
        res.json({
            message: 'Welcome to wertik, You have successfully running Wertik rest api!'
        });
    });
    
    expressApp.get('*', function(req, res){
        res.status(404).json({
            message: "Not found",
            detail: "Request page didn't found"
        });
    });
    if (configuration.forceStartRestApiServer === true) {
        expressApp.listen(configuration.ports.restApi, () => {
            console.log(`Api server running at htt://localhost:${configuration.ports.restApi}!`);
        });
    }

    WertikEventEmitter.emit("REST_API_READY");
    
    return expressApp;
}