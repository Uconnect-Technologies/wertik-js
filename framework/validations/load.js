import Joi from "joi";
const {DIALECT} = process.env;

let id = (DIALECT == "MONGO_DB") ? "_id" : "id";

export function loadRules(rules) {
	rules.rules.forEach((item,index) => {
		if (typeof Joi[item] === "function") {
		}
	});
	return {};
}

export default async function (rules) {
	// return Joi.object().keys({
	  // ...loadRules(rules)
	// })
	loadRules(rules);
}