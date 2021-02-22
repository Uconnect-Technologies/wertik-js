"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consoleMessages_1 = require("../logger/consoleMessages");
function checkIfPackageIsInstalled(packageName) {
    try {
        let version = require(`${packageName}/package.json`).version;
        return version;
    }
    catch (e) {
        return false;
    }
}
exports.checkIfPackageIsInstalled = checkIfPackageIsInstalled;
function check(name) {
    const isInstalled = checkIfPackageIsInstalled(name);
    if (isInstalled) {
        return true;
    }
    else {
        consoleMessages_1.errorMessage(name + " is not installed, Exiting wertik-js process.");
        process.exit();
    }
}
exports.check = check;
function default_1(configuration) {
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
                check("pg-native");
            }
            resolve();
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=checkInstalledPackages.js.map