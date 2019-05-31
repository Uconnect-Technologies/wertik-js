
import getIdName from "./../helpers/getIdName.js";

export default async function (model,instance,dbField,multiple=false) {
	if (multiple) {
		return await model.paginate({});
	}else {
		return await model.findOne({[getIdName]: instance[dbField]});
	}
}