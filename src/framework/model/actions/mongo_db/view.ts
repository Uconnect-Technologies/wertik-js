export default async function (model: any, args: any, requestedFields: any) {
	console.log("view mongo", requestedFields);
	const {_id} = args;
	console.log(Object.keys(requestedFields).join(" "))
	let response = await model.findOne({ _id: _id }, Object.keys(requestedFields).join(" "));
	console.log(response);
	return response;
}