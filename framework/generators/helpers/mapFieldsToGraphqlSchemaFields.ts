import {has} from "lodash";
import allFieldTypes from "./fieldTypes";
let fieldTypes: any = allFieldTypes;

export default function (data: any) {
	let string = "";
	let split = data.split(" ");
	let addedColumns: any = [];
	split.forEach((data: any) => {
		let splitColon = data.split(":");
		let [columnName,columnType] = splitColon;
		let hasProperty = has(fieldTypes,columnType);
		if (addedColumns.indexOf(columnName) > -1) {
			return;
		}
		if (hasProperty) {
			addedColumns.push(splitColon[0]);
			string = string + `${columnName}: ${fieldTypes[columnType]}
			`;
		}else {
			console.log(`${splitColon[1]} is not a type, Skipping, Please add it manually.`);
		}
	})
	return string
}