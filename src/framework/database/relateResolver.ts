import primaryKey from "./../helpers/primaryKey";

export default async function(obj: any) {
  let { model, relateWith, type, relationName } = obj;
  if (type == "multiple") {
    let filters = [{ column: relationName, value: model[primaryKey], operator: "=" }];
    return await relateWith.paginate({ filters: filters });
  } else {
    return await relateWith.findOne({ [primaryKey]: model[relationName] });
  }
}
