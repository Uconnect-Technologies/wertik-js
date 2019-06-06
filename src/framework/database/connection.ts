const dialect = process.env.DIALECT;
let db_connect = null;
let db_models = null;

if (dialect == "MYSQL") {
  db_connect = require("./mysql/connection.ts").default;
  db_models = require("./mysql/connection.ts").models;
} else if (dialect == "MONGO_DB") {
  db_connect = require("./mongodb/connection.ts").default;
  db_models = require("./mongodb/connection.ts").models;
}

export default {
  db_connect
};
export let models = db_models;
