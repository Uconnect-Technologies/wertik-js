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
function default_1(userId, database) {
    return __awaiter(this, void 0, void 0, function* () {
        let sqlQuery = `
        SELECT permissionTable.id        AS permission_id, 
          permissionTable.NAME           AS permission_name, 
          permissionTable.can            AS permission_can, 
          permissionTable.cant           AS permission_cant, 
          role_permissionTable.id         AS rolepermission_id, 
          role_permissionTable.role       AS rolepermission_role, 
          role_permissionTable.permission AS rolepermission_permission, 
          role_permissionTable.NAME       AS rolepermission_name, 
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
          LEFT JOIN role_permission AS role_permissionTable 
            ON permissionTable.id = role_permissionTable.permission 
          LEFT JOIN user_permission AS userpermissionTable 
            ON permissionTable.id = userpermissionTable.permission 
          LEFT JOIN role AS roleTable 
            ON role_permissionTable.role = roleTable.id 
          LEFT JOIN user_role AS userroleTable 
            ON userroleTable.id = role_permissionTable.role 
        WHERE  userroleTable.USER = _________user_ID
          OR userpermissionTable.USER = _________user_ID 
    `;
        sqlQuery = sqlQuery.replace(/_________user_ID/g, userId + "");
        const permissions = yield database.query(sqlQuery, { type: database.QueryTypes.SELECT });
        return permissions;
    });
}
exports.default = default_1;
//# sourceMappingURL=getUserAllPermissions.js.map