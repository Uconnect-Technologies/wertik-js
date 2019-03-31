import Joi from "joi";
const {DIALECT} = process.env;

let id = (MONGO_DB == "MONGO_DB") ? "_id" : "id";

export function loadRules(rules) {
	
}

export default async function (rules) {
	return Joi.object().keys({
	  ...loadRules(rules)
	})
}