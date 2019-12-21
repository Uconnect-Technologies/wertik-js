let Sequelize = require("sequelize");
export default function(configurationObject) {
  let mysqlOptions = configurationObject.mysqlOptions;
  const DB_PRODUCTION = new Sequelize(`${mysqlOptions.dbName}`, mysqlOptions.dbUsername, mysqlOptions.dbPassword, {
    dialect: "mysql",
    host: mysqlOptions.dbHost,
    port: mysqlOptions.dbPort,
    logging: false,
    operatorsAliases: false
  });
  return DB_PRODUCTION;
}
