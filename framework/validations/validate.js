import getErrors from "./getErrors.js";
let Validator = require('validatorjs');

export default async function (schema,args) {
	let validate = new Validator(args,schema);
	if (validate.passes()) {
		return {success: true}
	}else {
		return {success: false, errors: validate.errors.all()}
	}
}