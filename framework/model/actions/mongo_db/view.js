export default async function (model,args) {
	const {_id} = args;
	let response = await model.findOne({_id: _id});
	return response;
}