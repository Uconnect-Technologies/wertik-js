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
function default_1(moduleName, graphql) {
    let { mutations, queries } = graphql;
    return {
        subscriptions: graphql.subscriptions,
        queries: {
            [`list${moduleName}`]: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
                return queries[`list${moduleName}`](_, args, g);
            }),
            [`view${moduleName}`]: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
                return queries[`view${moduleName}`](_, args, g);
            })
        },
        mutations: {
            [`create${moduleName}`]: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
                return mutations[`create${moduleName}`](_, args, g);
            }),
            [`delete${moduleName}`]: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
                return mutations[`delete${moduleName}`](_, args, g);
            }),
            [`update${moduleName}`]: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
                return mutations[`update${moduleName}`](_, args, g);
            }),
            [`updateBulk${moduleName}`]: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
                return mutations[`updateBulk${moduleName}`](_, args, g);
            }),
            [`createBulk${moduleName}`]: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
                return mutations[`createBulk${moduleName}`](_, args, g);
            }),
            [`deleteBulk${moduleName}`]: (_, args, g) => __awaiter(this, void 0, void 0, function* () {
                return mutations[`deleteBulk${moduleName}`](_, args, g);
            }),
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=loader.js.map