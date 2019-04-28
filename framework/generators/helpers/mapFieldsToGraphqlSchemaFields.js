import {has} from "lodash";
import fieldTypes from "./fieldTypes.js";

export default function (data) {
	let string = "";
	let split = data.split(" ");
	let addedColumns = [];
	split.forEach((data) => {
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