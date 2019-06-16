export default async function (model: any,args: any) {
	await model.deleteOne({_id: args._id});
}