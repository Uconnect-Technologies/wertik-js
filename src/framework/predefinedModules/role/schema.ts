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
		createdAt: String
		updatedAt: String
	}

	${getListByPaginationAndFiltersSchema("Role")}

	input RoleInput {
		_id: String
		id: Int
		name: String
	}
	
`;