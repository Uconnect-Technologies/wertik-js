export default function (model,args) {
	console.log(args);
	return model.findOne(args);
}