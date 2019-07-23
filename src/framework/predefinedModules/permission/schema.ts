import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import getIdName from "./../../../framework/helpers/getIdName"
import { getIdType } from "./../../../framework/helpers/getIdName"

export default `
	type Permission {
		${getIdName}: ${getIdType}
		action: String
		successMessage: String
		successMessageType: String
		created_by: User
		createdAt: String
		updatedAt: String
	}
	${getListByPaginationAndFiltersSchema("Permission")}
	input PermissionInput {
		${getIdName}: ${getIdType}
		action: String
	}
`;