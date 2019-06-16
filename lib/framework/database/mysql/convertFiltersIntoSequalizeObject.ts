let {get} = require('lodash')
let Sequelize = require('sequelize')

const Op = Sequelize.Op;
import {types,typeValues} from "./filterTypes";

export default async function (filters: any) {
	let f: any = {};
	filters.forEach((item: any) => {
		if (!f[item.column]) {
			f[item.column] = {}
		}
		/* tslint:disable-next-line */
		// f[item.column][typeValues[item.operator]] = item.value;
	});
	return f;
}