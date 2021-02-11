"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkInstalledPackages_1 = __importDefault(require("../initialization/checkInstalledPackages"));
const checkModules_1 = __importDefault(require("../initialization/checkModules"));
exports.requiredFields = {
    name: "required",
    dialect: "mysql",
    db_username: "required",
    db_password: "required",
    db_name: "required",
    db_host: "required",
    db_port: "required"
};
function default_1(configuration) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let responseCheckInstalledPackages = yield checkInstalledPackages_1.default(configuration);
            let responseCheckModules = yield checkModules_1.default(configuration);
            resolve();
        }
        catch (errr) {
            reject(errr);
            console.log(errr);
        }
    }));
}
exports.default = default_1;
//# sourceMappingURL=validateDependencies.js.map