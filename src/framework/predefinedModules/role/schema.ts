import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema";
import primaryKey, { primaryKeyType } from "./../../../framework/helpers/primaryKey";

export default `
	type Role {
		${primaryKey}: ${primaryKeyType}
		name: String
		hasFullRights: Boolean
		defaultPermissions: String
		created_by: User
		permissions: RolePermissionList
	}

	${getListByPaginationAndFiltersSchema("Role")}

	input RoleInput {
		_id: String
		id: Int
		name: String
	}
	
`;
