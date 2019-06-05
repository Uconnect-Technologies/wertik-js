export default async function (model: any,id: any) {
  let object = await model.findByPk(id);
  return object;
}