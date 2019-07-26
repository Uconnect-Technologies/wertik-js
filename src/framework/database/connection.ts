const dialect = process.env.dialect;

let db_connect = null;
let db_models = null;

if (dialect == "MYSQL") {
  db_connect = require("./mysql/connection").default;
  db_models = require("./mysql/connection").models;
} else if (dialect == "MONGO_DB") {
  db_connect = require("./mongodb/connection").default;
  db_models = require("./mongodb/connection").models;
}

export default {
  db_connect
};

export let models = db_models;