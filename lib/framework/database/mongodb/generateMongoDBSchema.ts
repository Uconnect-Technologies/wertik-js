let {get} = require("lodash");
import getMongoDBSchemaType from "./getMongoDBSchemaType"

const restrictColumns = [
    "errors","successMessage","successMessageType","statusCode","statusCodeNumber","created_at","id","updated_at",
];

export default function (mongoose: any,schemas: any) {
	let tables = Object.keys(schemas);
	let object: any = {};
	tables.forEach((table: any) => {
		let tableColumnsArray = schemas[table];
		let tableColumns: any = {};
		tableColumnsArray.forEach((tableColumn: any) => {
			let tableColumnName = get(tableColumn,'name.value');
			if (restrictColumns.indexOf(tableColumn) == -1) {
				let type: any = "";
	      let kind = get(tableColumn,'type.kind');
	      if (kind == "NonNullType") {
	        type = get(tableColumn,'type.type.name.value','');
	      }else {
	        type = get(tableColumn,'type.name.value','');
	      }
	      if (type) {
					type = getMongoDBSchemaType(type);
					tableColumns[tableColumnName] = type;
	      }
      }
		});
		object[table] = tableColumns;
	});	
	return object;
}