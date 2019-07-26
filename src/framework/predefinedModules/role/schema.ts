import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import primaryKey, { primaryKeyType } from "./../../../framework/helpers/primaryKey"

export default `
	type Role {
		${primaryKey}: ${primaryKeyType}
		name: String
		permissions: [RolePermissionList]
		created_by: User
	}

	${getListByPaginationAndFiltersSchema("Role")}

	input RoleInput {
		_id: String
		id: Int
		name: String
	}
	
`;