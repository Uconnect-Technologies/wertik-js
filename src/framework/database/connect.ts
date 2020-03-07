let Sequelize = require("sequelize");
export default function(configurationObject) {
  let DB_PRODUCTION;
  let dialect = configurationObject.database.dbDialect;
  let database = configurationObject.database;
  if (dialect == "postgres") {
    DB_PRODUCTION = new Sequelize(`${database.dbName}`, database.dbUsername, database.dbPassword, {
      dialect: "postgres",
      host: database.dbHost,
      port: database.dbPort,
      logging: false,
      operatorsAliases: false,
      dialectOptions: {
        ssl: true
      }
    });
  } else {
    // mysql
    DB_PRODUCTION = new Sequelize(`${database.dbName}`, database.dbUsername, database.dbPassword, {
      dialect: "mysql",
      host: database.dbHost,
      port: database.dbPort,
      logging: false,
      operatorsAliases: false
    });
  }
  return DB_PRODUCTION;
}
