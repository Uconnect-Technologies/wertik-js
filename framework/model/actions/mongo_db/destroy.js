export default async function (model,args) {
	await model.deleteOne({_id: args._id});
}