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
const apollo_server_1 = require("apollo-server");
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
exports.generateError = (e, statusCode = 404) => {
    return new apollo_server_1.ApolloError(e.message);
};
exports.getDirectoriesInFolder = (path) => {
    return fs_1.default.readdirSync(path).filter(function (file) {
        return fs_1.default.statSync(path + "/" + file).isDirectory();
    });
};
exports.randomString = (len, charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") => {
    charSet = charSet;
    var randomString = "";
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
};
exports.filesInAFolder = (path) => {
    return fs_1.default.readdirSync(path);
};
exports.exists = (path) => {
    try {
        fs_1.default.accessSync(path);
    }
    catch (err) {
        return false;
    }
    return true;
};
exports.appendToFileSync = function (path, content) {
    // try {
    fs_1.default.appendFileSync(path, content);
    //   return true;
    // } catch (e) {
    //   return false;
    // }
};
exports.createEmptyFile = function (path, cb) {
    fs_1.default.writeFile(path, "", function (err) {
        if (err)
            throw err;
        cb();
    });
};
exports.checkIfModuleIsValid = function (object) {
    if (!module) {
        console.log("Module must be object");
        return false;
    }
    if (module && module.constructor !== Object) {
        console.log("Module must be object");
        return false;
    }
    return true;
};
exports.deleteFile = (path, cb) => __awaiter(void 0, void 0, void 0, function* () {
    if (exports.exists(path)) {
        try {
            fs_1.default.unlink(path, function (err) {
                cb();
            });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    else {
        return true;
    }
});
exports.firstLetterLowerCase = (s) => {
    if (typeof s !== "string")
        return "";
    return s.charAt(0).toLowerCase() + s.slice(1);
};
exports.identityColumn = () => {
    return "id";
};
exports.loadModulesFromConfiguration = (configuration) => {
    let list = [];
    let modules = [...configuration.builtinModules.split(","), ...lodash_1.get(configuration, "modules", [])];
    modules = modules.filter((c) => c);
    modules.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
        let module;
        if (element.constructor === String) {
            module = require(`./../builtinModules/${element}/index`).default;
        }
        else if (element.constructor === Object || lodash_1.isFunction(element)) {
            if (element.constructor == Function) {
                module = yield element(configuration);
            }
            else {
                module = element;
            }
        }
        list.push(module);
    }));
    return list;
};
exports.removeColumnsFromAccordingToSelectIgnoreFields = (requestedFields, ignoreFields) => {
    const arr = [];
    requestedFields.forEach((element) => {
        if (!ignoreFields.includes(element)) {
            arr.push(element);
        }
    });
    return arr;
};
//# sourceMappingURL=index.js.map