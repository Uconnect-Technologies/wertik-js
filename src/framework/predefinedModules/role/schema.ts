import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema";
import primaryKey, { primaryKeyType } from "./../../../framework/helpers/primaryKey";

export default `
	type Role {
		${primaryKey}: ${primaryKeyType}
		name: String
		created_by: User
		permissions: RolePermissionList
		created_at: String
		updated_at: String
	}

	${getListByPaginationAndFiltersSchema("Role")}

	input RoleInput {
		_id: String
		id: Int
		name: String
	}
	
`;
