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
function default_1(configuration, models) {
    return function (modules) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const keys = Object.keys(configuration.seeds);
                for (const name of keys) {
                    const nameSeeds = configuration.seeds[name];
                    if (Array.isArray(nameSeeds)) {
                        for (const seed of nameSeeds) {
                            const { value } = seed;
                            const afterCreate = lodash_1.get(seed, "afterCreate", function () { });
                            if (value) {
                                const instance = yield models[name].create(value);
                                afterCreate(instance, models);
                            }
                        }
                    }
                }
                resolve("Seeds Done");
            }
            catch (e) {
                reject(e);
            }
        }));
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map