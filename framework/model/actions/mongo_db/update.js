export default async function (model,args) {
	await model.updateOne({_id: args._id}, {$set: args})
	let response = await model.findOne({_id: args._id});
	return response;
}