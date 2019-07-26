export default async function (model: any, args: any, requestedFields: any) {
	const {_id} = args;
	let response = await model.findOne({ _id: _id }, Object.keys(requestedFields).join(" "));
	return response;
}