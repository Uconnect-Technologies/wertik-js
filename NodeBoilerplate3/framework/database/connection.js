const dialect = process.env.DIALECT;
let db_connect = null;
let db_models = null;
let mongo_db = null;

if (dialect == "MYSQL") {
  db_connect = require("./mysql/connection.js").default;
  db_models = require("./mysql/connection.js").models;
} else if (dialect == "MONGODB") {
  db_connect = require("./mongodb/mongoose.js").default;
}

export default {
  db_connect,
  mongo_db
};
export let models = db_models;
