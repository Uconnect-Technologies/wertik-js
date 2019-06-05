export default async function (model: any,args: any) {
	const {_id} = args;
	let response = await model.findOne({_id: _id});
	return response;
}