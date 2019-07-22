import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import getIdName from "./../../../framework/helpers/getIdName"
import {getIdType} from "./../../../framework/helpers/getIdName"

export default `
	type Role {
		${getIdName}: ${getIdType}
		name: String
		successMessage: String
		successMessageType: String
		permissions: [RolePermissionList]
		created_by: User
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