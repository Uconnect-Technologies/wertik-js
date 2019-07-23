import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
import getIdName from "./../../../framework/helpers/getIdName"
import { getIdType } from "./../../../framework/helpers/getIdName"

export default `
	type Profile {
		${getIdName}: ${getIdType}
		user: User
		description: String
		successMessage: String
		successMessageType: String
		created_by: User
		createdAt: String
		updatedAt: String
	}
	${getListByPaginationAndFiltersSchema("Profile")}
	input ProfileInput {
		${getIdName}: ${getIdType}
		user: ${getIdType}
		description: String
	}
`;