let {upperCase} = require("lodash");

export default function (configuration: object, cb: Function) {
	console.log(configuration)
	let keys = Object.keys(configuration);
	keys.forEach((key,index) => {
		let value = configuration[key];
		process.env[upperCase(key)] = value;
	});
	cb();
}