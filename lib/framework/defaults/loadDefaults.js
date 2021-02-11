"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultConfiguration_1 = __importDefault(require("./defaultConfigurations/defaultConfiguration"));
function default_1(configuration) {
    return new Promise((resolve, reject) => {
        try {
            let configurationPassesInKeys = Object.keys(configuration);
            if (configurationPassesInKeys.length == 0) {
                console.warn("[WERTIK-JS] Configuration not passed, using default configuration.");
                resolve(defaultConfiguration_1.default);
            }
            let newConfiguration = new Object(Object.assign({}, defaultConfiguration_1.default));
            configurationPassesInKeys.forEach((element, index) => {
                let isLast = index + 1 == configurationPassesInKeys.length;
                newConfiguration[element] = configuration[element];
                if (isLast) {
                    resolve(newConfiguration);
                }
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=loadDefaults.js.map