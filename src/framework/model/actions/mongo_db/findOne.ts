export default function (model: any,args: any,requestedFields: any) {
	return model.findOne(args, requestedFields);
}