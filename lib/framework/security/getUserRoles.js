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
        let sqlQuery = `SELECT  r.*, ur.id as ur_id, 
      ur.name as ur_name, 
      ur.created_at as ur_created_at, 
      ur.updated_at as ur_updated_at, 
      ur.deleted_at as ur_deleted_at,
      ur.role as ur_role,
      ur.user as ur_user
      
    from user_role as ur 
    left JOIN role as r on r.id = ur.role 
    where ur.user = _________user_ID`;
        sqlQuery = sqlQuery.replace(/_________user_ID/g, userId + "");
        const roles = yield database.query(sqlQuery, { type: database.QueryTypes.SELECT });
        return roles;
    });
}
exports.default = default_1;
//# sourceMappingURL=getUserRoles.js.map