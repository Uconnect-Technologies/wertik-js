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
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function default_1(expressApp, configuration, customApi) {
    return __awaiter(this, void 0, void 0, function* () {
        let modules = configuration.builtinModules.split(",");
        modules = modules.filter((c) => c);
        modules = [...modules, ...lodash_1.get(configuration, "modules", [])];
        const processModule = (module) => {
            if (module && module.hasOwnProperty("restApi")) {
                const restApi = lodash_1.get(module, "restApi", {});
                const restApiEndpoints = lodash_1.get(restApi, "endpoints", []);
                restApiEndpoints.forEach((restApiEndpointsElement) => {
                    customApi(expressApp, restApiEndpointsElement, module, configuration);
                });
                const expressAccess = lodash_1.get(module, 'restApi.expressAccess', function () { });
                expressAccess(expressApp);
            }
        };
        modules.forEach((element) => __awaiter(this, void 0, void 0, function* () {
            let module;
            if (element.constructor === String) {
                module = require(`./../../../builtinModules/${element}/index`).default;
            }
            else if (element.constructor === Object || lodash_1.isFunction(element)) {
                if (element.constructor == Function) {
                    module = yield element(configuration);
                }
                else {
                    module = element;
                }
            }
            processModule(module);
        }));
    });
}
exports.default = default_1;
//# sourceMappingURL=loadAllModules.js.map