import {get} from "lodash";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
import {types,typeValues} from "./filterTypes.ts";

export default async function (filters) {
	let f = {};
	filters.forEach((item) => {
		if (!f[item.column]) {
			f[item.column] = {}
		}
		f[item.column][typeValues[item.operator]] = item.value;
	});
	return f;
}