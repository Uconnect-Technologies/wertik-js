"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            let keys = Object.keys(configuration);
            keys.forEach((key, index) => {
                let value = configuration[key];
                process.env[key] = value;
                let isCompleted = index == keys.length - 1;
                if (isCompleted) {
                    resolve();
                }
            });
        });
        // cb();
    });
}
exports.default = default_1;
//# sourceMappingURL=convertConfigurationIntoEnvVariables.js.map