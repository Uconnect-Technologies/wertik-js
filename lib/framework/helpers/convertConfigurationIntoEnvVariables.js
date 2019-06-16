"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let { upperCase } = require("lodash");
function default_1(configuration, cb) {
    console.log(configuration);
    let keys = Object.keys(configuration);
    keys.forEach((key, index) => {
        let value = configuration[key];
        process.env[upperCase(key)] = value;
    });
    cb();
}
exports.default = default_1;
//# sourceMappingURL=convertConfigurationIntoEnvVariables.js.map