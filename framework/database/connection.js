const dialect = process.env.DIALECT;
let db_connect = null;
let db_models = null;

if (dialect == "MYSQL") {
  db_connect = require("./mysql/connection.js").default;
  db_models = require("./mysql/connection.js").models;
} else if (dialect == "MONGO_DB" || dialect == "MONGO" || dialect == "MONGODB") {
  db_connect = require("./mongodb/connection.js").default;
  db_models = require("./mongodb/connection.js").models;
}

export default {
  db_connect
};
export let models = db_models;
