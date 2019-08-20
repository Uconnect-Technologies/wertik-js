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
const connection_1 = __importDefault(require("./../database/connection"));
const primaryKey_1 = __importDefault(require("../helpers/primaryKey"));
const lodash_1 = require("lodash");
function default_1(props) {
    return __awaiter(this, void 0, void 0, function* () {
        let permissions = [];
        let { database } = connection_1.default;
        let { dialect } = process.env;
        let id = lodash_1.get(props, primaryKey_1.default, null);
        if (dialect.toLocaleLowerCase() == "mysql") {
            let sqlQuery = `
      SELECT  permissionTable.id AS permission_id,
              permissionTable.name AS permission_name,
              permissionTable.can AS permission_can,
              permissionTable.cant AS permission_cant,
              rolepermissionTable.id as rolepermission_id,
              rolepermissionTable.role as rolepermission_role,
              rolepermissionTable.permission as rolepermission_permission,
              rolepermissionTable.name as rolepermission_name,
              userpermissionTable.id as userpermission_id,
              userpermissionTable.user as userpermission_user,
              userpermissionTable.permission as userpermission_permission,
              roleTable.id as role_id,
              roleTable.name as role_name,
              userroleTable.id as userrole_id,
              userroleTable.name as userrole_name,
              userroleTable.user as userrole_user,
              userroleTable.role as userrole_role
              
      FROM permission AS permissionTable
      LEFT JOIN rolepermission AS rolepermissionTable
          on permissionTable.id = rolepermissionTable.permission
        LEFT JOIN userpermission AS userpermissionTable
          on permissionTable.id = userpermissionTable.permission
        LEFT JOIN role as roleTable 
          on rolepermissionTable.role = roleTable.id
        LEFT JOIN userrole as userroleTable
          on userroleTable.id = rolepermissionTable.role
            
      WHERE userroleTable.user = 1 or userpermissionTable.user = 1
    `;
            if (typeof id == "number") {
                sqlQuery = sqlQuery.replace(/___user_id/g, id + "");
                permissions = yield database.query(sqlQuery);
            }
        }
        else {
        }
        return permissions;
    });
}
exports.default = default_1;
//# sourceMappingURL=listUserPermissions.js.map