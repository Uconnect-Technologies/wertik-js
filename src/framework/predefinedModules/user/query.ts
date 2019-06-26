import dynamic from "./../../../framework/dynamic/index";
import getIdName from "./../../helpers/getIdName"

export default `
	${dynamic.queries.generateQueriesSchema("User")}
	listUserPermissions(id: Int,_id: String): [Permission]
`;
