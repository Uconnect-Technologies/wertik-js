import primaryKey from "./../helpers/primaryKey";

export default async function(model: any, instance: any, dbField: any, multiple: any = false, obj: any) {
  if (multiple) {
    return await model.paginate({});
  } else {
    return await model.findOne({ [primaryKey]: instance[dbField] });
  }
}
