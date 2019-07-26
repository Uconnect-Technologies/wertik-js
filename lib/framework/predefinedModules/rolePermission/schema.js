"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const getListByPaginationAndFiltersSchema_1 = __importDefault(require("./../../../framework/graphql/getListByPaginationAndFiltersSchema"));
const primaryKey_1 = __importStar(require("./../../../framework/helpers/primaryKey"));
exports.default = `
	type RolePermission {
		${primaryKey_1.default}: ${primaryKey_1.primaryKeyType}
		permission: Permission,
		role: Role
	}
	${getListByPaginationAndFiltersSchema_1.default("RolePermission")}
	input RolePermissionInput {
		${primaryKey_1.default}: ${primaryKey_1.primaryKeyType}
		permission: ${primaryKey_1.primaryKeyType}
		role: ${primaryKey_1.primaryKeyType}
	}
`;
//# sourceMappingURL=schema.js.map