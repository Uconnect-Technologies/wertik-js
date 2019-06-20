"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileExists_1 = __importDefault(require("./../helpers/fileExists"));
const index_1 = __importDefault(require("./../dynamic/index"));
let { join } = require("path");
let { camelCase, upperFirst } = require("lodash");
function default_1(rootDirectory) {
    let predefinedModules = process.env.predefinedModules.split(",");
    let output = "";
    predefinedModules.forEach((name) => __awaiter(this, void 0, void 0, function* () {
        let filePath = join(__dirname, "../../framework/predefinedModules", name, "mutation.js");
        let isMutationFileExist = fileExists_1.default(filePath);
        let content = "";
        if (!isMutationFileExist) {
            content = index_1.default.mutations.generateMutationsSchema(upperFirst(camelCase(name)));
        }
        else {
            content = require(filePath).default;
        }
        content = content.replace("type Mutation {", "");
        content = content.replace("}", "");
        output = output + content;
    }));
    return output;
}
exports.default = default_1;
//# sourceMappingURL=loadAllMutations.js.map