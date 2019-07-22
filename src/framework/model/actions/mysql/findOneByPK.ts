import {get} from "lodash";
export default async function (model: any,id: any,requestedFields: any) {
  let hasRequestedAllFields = get(requestedFields,'length',0) == 0;
  let object = {};
  if (hasRequestedAllFields) {
    object = await model.findByPk(id);
  }else {
    object = await model.findOne({
      where: {
        id: id,
      },
      attributes: requestedFields
    })
  }
  return object;
}