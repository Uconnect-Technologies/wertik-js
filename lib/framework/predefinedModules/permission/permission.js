"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const primaryKey_1 = __importStar(require("./../../../framework/helpers/primaryKey"));
exports.schema = `
	type Permission {
		${primaryKey_1.default}: ${primaryKey_1.primaryKeyType}
		name: String
		can: String
		cant: String
		created_by: User
	}
	input PermissionInput {
		${primaryKey_1.default}: ${primaryKey_1.primaryKeyType}
		name: String
		can: String
		cant: String
	}
`;
exports.resolvers = {
    Permission: {},
};
exports.validations = {};
exports.fields = {
    name: "String",
    can: "String",
    cant: "String",
    created_by: primaryKey_1.primaryKeyType
};
//# sourceMappingURL=permission.js.map