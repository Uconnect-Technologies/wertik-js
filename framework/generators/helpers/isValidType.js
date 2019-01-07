import {SequelizeTypesArray} from "./../../helpers/tableField.js";
export default function (name) {
	return SequelizeTypesArray.indexOf(name.toUpperCase()) > -1;
}