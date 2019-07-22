"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(configuration, cb) {
    let keys = Object.keys(configuration);
    keys.forEach((key, index) => {
        let value = configuration[key];
        process.env[key] = value;
    });
    // cb();
}
exports.default = default_1;
//# sourceMappingURL=convertConfigurationIntoEnvVariables.js.map