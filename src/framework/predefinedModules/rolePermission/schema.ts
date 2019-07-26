import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import primaryKey, { primaryKeyType } from "./../../../framework/helpers/primaryKey"

export default `
	type RolePermission {
		${primaryKey}: ${primaryKeyType}
		name: String
		permission: Permission,
		role: Role
	}
	${getListByPaginationAndFiltersSchema("RolePermission")}
	input RolePermissionInput {
		${primaryKey}: ${primaryKeyType}
		permission: ${primaryKeyType}
		role: ${primaryKeyType}
	}
`;