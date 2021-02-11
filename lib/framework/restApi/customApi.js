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
const lodash_1 = require("lodash");
const restApiErrorResponse_1 = __importDefault(require("./restApiErrorResponse"));
const restApiSuccessResponse_1 = __importDefault(require("./restApiSuccessResponse"));
exports.default = (expressApp, restApiEndpointsElement, module, configuration) => {
    const type = lodash_1.get(restApiEndpointsElement, "methodType", "get");
    const handler = lodash_1.get(restApiEndpointsElement, "handler", null);
    const onCustomApiFailure = lodash_1.get(configuration, "restApi.onCustomApiFailure", null);
    const path = lodash_1.get(restApiEndpointsElement, "path", "");
    const types = ["get", "post", "put", "delete", "copy", "head", "options", "link", "unlink", "purge", "lock", "unlock", "view"];
    if (types.indexOf(type) > -1 && path.length > 0) {
        let apiPath = `${path}`;
        let find = "//";
        let re = new RegExp(find, "g");
        apiPath = apiPath.replace(re, "/");
        expressApp[type](apiPath, function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield handler(req, res, restApiSuccessResponse_1.default, restApiErrorResponse_1.default);
                }
                catch (e) {
                    if (onCustomApiFailure) {
                        onCustomApiFailure({
                            path: apiPath,
                            code: 500,
                            err: e,
                            res: res,
                            data: {},
                        });
                    }
                    else {
                        restApiErrorResponse_1.default({
                            path: apiPath,
                            code: 500,
                            err: e,
                            res: res,
                            data: {},
                        });
                    }
                }
            });
        });
    }
    else {
        console.warn(`On module ${module.name}, Api endpoint ${path}, has undefined method type ${type}`);
    }
};
//# sourceMappingURL=customApi.js.map