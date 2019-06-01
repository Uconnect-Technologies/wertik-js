import {get} from "lodash";
import getMongoDBSchemaType from "./getMongoDBSchemaType.ts"

const restrictColumns = [
    "errors","successMessage","successMessageType","statusCode","statusCodeNumber","created_at","id","updated_at",
];

export default function (mongoose,schemas) {
	let tables = Object.keys(schemas);
	let object = {};
	tables.forEach((table) => {
		let tableColumnsArray = schemas[table];
		let tableColumns = {};
		tableColumnsArray.forEach((tableColumn) => {
			let tableColumnName = get(tableColumn,'name.value');
			if (restrictColumns.indexOf(tableColumn) == -1) {
				let type = "";
	      let kind = get(tableColumn,'type.kind');
	      if (kind == "NonNullType") {
	        type = get(tableColumn,'type.type.name.value','');
	      }else {
	        type = get(tableColumn,'type.name.value','');
	      }
	      if (type && typeof table != "{}") {
					type = getMongoDBSchemaType(type);
					tableColumns[tableColumnName] = type;
	      }
      }
		});
		object[table] = tableColumns;
	});	
	return object;
}