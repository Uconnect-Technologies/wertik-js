const {get} = require("lodash");
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
export default function (app,configuration,dbTables, models) {
    const context = get(configuration,'context', {});
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(morgan('combined'))
    app.use(function (req, res, next) {
        req.dbTables = dbTables;
        req.models = models;
        req.context = context;
        next();
    });
    
    let modules = require("./loadAllModules").default(app,configuration);
    
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

    app.listen(5000, () => {
      console.log('Api server running at 5000!');
    });
    
}