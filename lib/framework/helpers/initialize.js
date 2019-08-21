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
const lodash_1 = require("lodash");
const initializeData_1 = __importDefault(require("./initializeData"));
function default_1(props = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        /*
          This function will be used to initialize some data to the database so the app can be use
        */
        let users = lodash_1.get(props, "users", initializeData_1.default.users);
        let roles = lodash_1.get(props, "roles", initializeData_1.default.roles);
        let userRoles = lodash_1.get(props, "userRoles", initializeData_1.default.userRoles);
        let permissions = lodash_1.get(props, "permissions", initializeData_1.default.permissions);
        let userPermissions = lodash_1.get(props, "userPermissions", initializeData_1.default.userPermissions);
        let rolePermissions = lodash_1.get(props, "rolePermissions", initializeData_1.default.rolePermissions);
    });
}
exports.default = default_1;
//# sourceMappingURL=initialize.js.map