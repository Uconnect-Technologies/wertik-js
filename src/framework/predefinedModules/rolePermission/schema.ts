import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import primaryKey, { primaryKeyType } from "./../../../framework/helpers/primaryKey"

export default `
	type RolePermission {
		${primaryKey}: ${primaryKeyType}
		permission: Permission,
		role: Role
		successMessage: String
		successMessageType: String
		statusCode: String
		statusCodeNumber: Int
	}
	${getListByPaginationAndFiltersSchema("RolePermission")}
	input RolePermissionInput {
		${primaryKey}: ${primaryKeyType}
		permission: ${primaryKeyType}
		role: ${primaryKeyType}
	}
`;