export default async function (configuration: object) {
	return new Promise(function (resolve,reject) {
		let keys = Object.keys(configuration);
		keys.forEach((key,index) => {
			let value = configuration[key];
			process.env[key] = value;
			let isCompleted = index == keys.length -1;
			if (isCompleted) {
				resolve();
			}
		});
	})
	// cb();
}