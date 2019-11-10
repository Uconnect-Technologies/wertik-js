const {get} = require("lodash");
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
let getUserWithAccessToken = require("./../security/getUserWithAccessToken").default;
let getUserAllPermissions = require("./../security/getUserAllPermissions").default

export default function (app,configuration,dbTables, models, allEmailTemplates,sendEmail,database) {
    const context = get(configuration,'context', {});
    const port = get(configuration,'ports.restApi',5000);
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(morgan('combined'))
    app.use(async function (req, res, next) {
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
    
    require("./loadAllModules").default(app,configuration);
    
    app.get('/', (req, res) => {
        res.json({
            message: 'Welcome to wertik, You have successfully running Wertik rest api!'
        });
    });
    
    app.get('*', function(req, res){
        res.status(404).json({
            message: "Not found",
            detail: "Request page didn't found"
        });
    });

    app.listen(port, () => {
      console.log(`Api server running at htt://localhost:${port}!`);
    });
    return app;
}