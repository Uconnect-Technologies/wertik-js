let Sequelize = require("sequelize");

const {
    db_username,
    db_password,
    db_name,
    db_host,
    db_port,
    mode
} = process.env;

const DB_PRODUCTION = new Sequelize( `${db_name}`, db_username, db_password,
    {
      dialect: "mysql",
      host: db_host,
      port: db_port,
      logging: false,
      operatorsAliases: false
    }
);
const DB_DEVELOPMENT = new Sequelize( `${db_name}_dev`, db_username, db_password,
    {
      dialect: "mysql",
      host: db_host,
      port: db_port,
      logging: false,
      operatorsAliases: false
    }
);


let connection = (mode == "development") ? DB_DEVELOPMENT : DB_PRODUCTION;

