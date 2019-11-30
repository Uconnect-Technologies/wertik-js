import customApi from "./customApi";

const {get} = require("lodash");
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
let getUserWithAccessToken = require("./../security/getUserWithAccessToken").default;
let getUserAllPermissions = require("./../security/getUserAllPermissions").default

export default function (expressApp,configuration,dbTables, models, allEmailTemplates,sendEmail,database,WertikEventEmitter) {
    const context = get(configuration,'context', {});
    const port = get(configuration,'ports.restApi',5000);
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
        req.emailTemplates = allEmailTemplates;
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

    expressApp.listen(port, () => {
      console.log(`Api server running at htt://localhost:${port}!`);
    });

    WertikEventEmitter.emit("REST_API_READY");
    
    return expressApp;
}