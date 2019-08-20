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
        SELECT permissionTable.id        AS permission_id, 
          permissionTable.NAME           AS permission_name, 
          permissionTable.can            AS permission_can, 
          permissionTable.cant           AS permission_cant, 
          rolepermissionTable.id         AS rolepermission_id, 
          rolepermissionTable.role       AS rolepermission_role, 
          rolepermissionTable.permission AS rolepermission_permission, 
          rolepermissionTable.NAME       AS rolepermission_name, 
          userpermissionTable.id         AS userpermission_id, 
          userpermissionTable.USER       AS userpermission_user, 
          userpermissionTable.permission AS userpermission_permission, 
          roleTable.id                   AS role_id, 
          roleTable.NAME                 AS role_name, 
          userroleTable.id               AS userrole_id, 
          userroleTable.NAME             AS userrole_name, 
          userroleTable.USER             AS userrole_user, 
          userroleTable.role             AS userrole_role 
        FROM   permission AS permissionTable 
          LEFT JOIN rolepermission AS rolepermissionTable 
            ON permissionTable.id = rolepermissionTable.permission 
          LEFT JOIN userpermission AS userpermissionTable 
            ON permissionTable.id = userpermissionTable.permission 
          LEFT JOIN role AS roleTable 
            ON rolepermissionTable.role = roleTable.id 
          LEFT JOIN userrole AS userroleTable 
            ON userroleTable.id = rolepermissionTable.role 
        WHERE  userroleTable.USER = 1 
          OR userpermissionTable.USER = 1 
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