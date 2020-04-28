import { IConfiguration } from "./../types/configuration";
export function checkIfPackageIsInstalled(packageName: String) {
  try {
    let version = require(`${packageName}/package.json`).version;
    return version;
  } catch (e) {
    return false;
  }
}

export function check(name: String) {
  const isInstalled = checkIfPackageIsInstalled(name);
  if (isInstalled) {
    return true;
  } else {
    console.error(name + " is not installed, Exiting wertik-js process.");
    process.exit();
  }
}

export default function(configuration: IConfiguration) {
  return new Promise((resolve, reject) => {
    try {
      const { dbDialect } = configuration.database;
      check("apollo-server");
      if (dbDialect == "mysql") {
        check("sequelize");
        check("mysql2");
      }
      if (dbDialect == "postgres") {
        check("pg");
        check("pg-hstore");
      }
      if (dbDialect == "mongodb") {
        check("mongoose")
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
