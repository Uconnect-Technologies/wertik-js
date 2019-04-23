import {get} from "lodash";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

export default async function (filters) {
	console.log(Op);
	return filters;
}