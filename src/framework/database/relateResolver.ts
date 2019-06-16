import getIdName from "./../helpers/getIdName";

export default async function (model: any,instance: any,dbField: any,multiple: any =false) {
	if (multiple) {
		return await model.paginate({});
	}else {
		return await model.findOne({[getIdName]: instance[dbField]});
	}
}