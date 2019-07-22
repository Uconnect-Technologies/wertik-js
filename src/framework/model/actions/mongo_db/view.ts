export default async function (model: any, args: any, requestedFields: any) {
	console.log("view mongo", requestedFields);
	const {_id} = args;
	let response = await model.findOne({_id: _id},requestedFields.join(" "));
	console.log(response);
	return response;
}