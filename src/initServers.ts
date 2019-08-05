import graphqlServer from "./framework/graphql/index";
import apiServer from "./framework/api-server/index";

export default async function (dir, app) {
    graphqlServer(dir, app);
    apiServer(dir, app);
    let dialect = process.env.dialect;
    let db = {
        connection: {},
        models: []
    }
    if (dialect == "MYSQL") {
        db.connection = require("./framework/database/mysql/connection");
    }else if (dialect == "MONGO_DB") {        
        db.connection = require('./framework/database/mongodb/connection');
    }
    db.models = require("./framework/dynamic/allModels").default;
    return {
        ...db
    };
}