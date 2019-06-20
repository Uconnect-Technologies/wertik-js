export default function (configuration: object, cb: Function) {
	let keys = Object.keys(configuration);
	keys.forEach((key,index) => {
		let value = configuration[key];
		process.env[key] = value;
	});
	cb();
}