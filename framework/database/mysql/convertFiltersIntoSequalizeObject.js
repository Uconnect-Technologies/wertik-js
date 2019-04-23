import {get} from "lodash";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
import {types} from "./filterTypes.js";

export default async function (filters) {
	console.log(types);
	return filters;
}