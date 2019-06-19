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
let { camelCase, upperFirst } = require("lodash");
let { join } = require("path");
function default_1(rootDirectory) {
    let path = `${rootDirectory}/app/modules/`;
    let modules = process.env.MODULES_ENABLED.split(",");
    let predefinedModules = process.env.PREDEFINED_MODULES.split(",");
    let output = {
        Query: {},
        Mutation: {}
    };
    predefinedModules.forEach((name) => __awaiter(this, void 0, void 0, function* () {
        let filePath = join(__dirname, "../../framework/predefinedModules", name, "resolvers.ts");
        let content = require(filePath).default;
        let queries = content.queries;
        let mutations = content.mutations;
        output.Query = Object.assign({}, output.Query, queries);
        output.Mutation = Object.assign({}, output.Mutation, mutations);
        delete content['queries'];
        delete content['mutations'];
        output = Object.assign({}, output, content);
    }));
    return output;
}
exports.default = default_1;
//# sourceMappingURL=loadAllResolvers.js.map